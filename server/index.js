const express = require("express");
const bcrypt = require('bcryptjs');
const cookie = require("cookie-parser");
const jwt = require("jsonwebtoken");
const {User,Product} = require("./mongodb/user");
const cookieParser = require("cookie-parser");
const cors = require("cors")
const productlist = require("./productList.json")  
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv")

dotenv.config();

const secretkey = process.env.JWT_SECRET;

const app = express()
const port = process.env.PORT || 5000;

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.use(cors({
    origin: true, 
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,Authorization');
    next();
});

app.use(express.json());
app.use(cookieParser());

app.get("/",(req,res)=>{
    res.json({message: "Radhe Radhe"});
})

app.get("/health", async (req, res) => {
    try {
        const dbStatus = mongoose.connection.readyState === 1 ? "connected" : "disconnected";
        
        const productCount = await Product.countDocuments();
        
        res.status(200).json({
            status: "healthy",
            database: dbStatus,
            productCount: productCount,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({
            status: "unhealthy",
            error: error.message,
            timestamp: new Date().toISOString()
        });
    }
});

//User --------------------------------------------------------------------------------------------------------

app.post("/user/signup",async (req,res)=>{
    const {name,email,password} = req.body;
    console.log(name,email,password)
    
    if(!email||!name||!password) {
        console.log("Enter name, email and password")
        return res.status(400).json({message: "Please provide name, email and password"})
    }

    try {
        const existingUser = await User.findOne({email})
        console.log(existingUser)
        
        if(existingUser) {
            return res.status(400).json({message:`User with email ${email} already exists`})
        }
        
        const hash = await bcrypt.hash(password,8);
        const newUser = new User({name,email,password:hash});
        await newUser.save();

        return res.status(201).json({message: `User ${name} registered successfully`})
        
    } catch (error) {
        console.log(`error in server/index.js signup route :: ${error}`)
        return res.status(500).json({message: "Internal server error during registration"})
    }   
})
app.post("/user/login",async(req,res)=>{
    const {email,password} = req.body;
    if(!email) console.log("Enter email");
    if(!password) console.log("Enter password");

    else{
        try {
            const user = await User.findOne({email})
            if(!user) res.status(400).json(`Invalid email`)
            else{
                const checkpassword = await bcrypt.compare(password,user.password)
                if(!checkpassword) res.status(400).json(`Invalid password`)

                else{
                    const payload = {
                        name: user.name,
                        email: user.email
                    }
                    const token = await jwt.sign({user:payload},secretkey);
                    console.log(token)
                    res.cookie("user",token,{
                        maxAge: 24*60*60*1000,
                        secure: false 
                    });
                    console.log("cookie set.")
                    console.log(user)
                    res.status(200).json({message:"user found",user:user})
                }
                
            }
        } catch (error) {
            console.log(`error in server/index.js:line:66 :: ${error}`)
        }
    }
})

//Products ------------------------------------------------------

app.get("/products",async (req,res)=>{
    try {
        const items = await Product.find();
        res.status(200).json(items);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ 
            message: "Internal server error", 
            error: error.message 
        });
    }
})
app.get("/product/:id",async (req,res)=>{
    const id = req.params.id;
    console.log(id)
    const product = await Product.findById(id)
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
})
app.get("/getCartItems/:id",async (req,res)=>{
    const userid = req.params.id;
    const user = await User.findById(userid);
    if(!user) return res.status(404).json({message: "User not found"})

    const cartlist = user.cart;
    if(!cartlist || cartlist.length === 0) return res.json([]);

    const items = await Promise.all(cartlist.map(async (item) => {
        const product = await Product.findById(item.product_id);
        return {
            _id: item._id,
            quantity: item.quantity,
            image_url: item.image_url,
            product: product ? {
                _id: product._id,
                name: product.name,
                price: product.price,
                image_url: product.image_url 
            } : null
        };
    }));
    console.log("index.js",items)
    res.status(200).json(items);


})
app.post("/user/:id/cart", async (req, res) => {
    const userId = req.params.id;
    const { product_id, image_url, quantity } = req.body;

    try {
        const user = await User.findById(userId);

        if (!user) return res.status(404).json({ message: "User not found" });

        const existingItem = user.cart.find(item => item.product_id.toString() === product_id);

        if (existingItem) {
            // Update quantity
            existingItem.quantity += quantity; 
        } else {
            // Add new item
            user.cart.push({ product_id, image_url, quantity });
        }

        await user.save();
        console.log(user)
        res.json({ message: "Cart updated", cart: user.cart });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

app.post("/product/register",async(req,res)=>{
    const proDetails = req.body;
    
    try{
        const pro = new Product(proDetails)
        await pro.save();

        res.status(200).send("Product registered successfully")
    }catch(error){
        console.log(`error in server/index.js:line:54 :: ${error}`)
        res.status(500).json({ message: "Error registering product", error: error.message });
    }
})

// Endpoint to populate database with sample products
app.post("/populate-products", async (req, res) => {
    try {
        // Check if products already exist
        const existingProducts = await Product.find();
        if (existingProducts.length > 0) {
            return res.status(200).json({ 
                message: "Products already exist in database", 
                count: existingProducts.length 
            });
        }

        // Import sample products from JSON file
        const sampleProducts = require('./productList.json');
        
        // Add random image URLs to products
        const imageFiles = [
            'ahmadreza-rezaie-GsVSvlbjL3U-unsplash.jpg',
            'bruno-van-der-kraan-VRERJ5Mjp4c-unsplash.jpg',
            'daniel-hay-O703kpzIsQI-unsplash.jpg',
            'daniel-korpai-hbTKIbuMmBI-unsplash.jpg',
            'domino-studio-p2WUEFGrAdA-unsplash.jpg',
            'fabian-heimann-4R_WEmhx8og-unsplash.jpg',
            'ricky-kharawala-Yka2yhGJwjc-unsplash.jpg',
            'robert-torres-uXMctv7UCu8-unsplash.jpg',
            'shreesha-bhat-lz6z9GZu8hk-unsplash.jpg',
            'yash-parashar-LWPPpkn6NEQ-unsplash.jpg'
        ];

        const productsWithImages = sampleProducts.map(product => ({
            ...product,
            image_url: `/assets/productImages/${imageFiles[Math.floor(Math.random() * imageFiles.length)]}`
        }));

        // Insert all products
        await Product.insertMany(productsWithImages);
        
        res.status(200).json({ 
            message: "Database populated with sample products", 
            count: productsWithImages.length 
        });
    } catch (error) {
        console.error("Error populating products:", error);
        res.status(500).json({ 
            message: "Error populating products", 
            error: error.message 
        });
    }
});
app.post("/cart/increase", async (req, res) => {
    const { userId, productId } = req.body;
    try {
        const user = await User.findById(userId);
        const item = user.cart.find(i => i.product_id.toString() === productId);
        if (item) {
            item.quantity += 1;
            await user.save();
            return res.json({ success: true, cart: user.cart });
        }
        res.status(404).json({ success: false, message: "Item not found" });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error" });
    }
});
app.post("/cart/decrease", async (req, res) => {
    const { userId, productId } = req.body;
    try {
        const user = await User.findById(userId);
        const item = user.cart.find(i => i.product_id.toString() === productId);
        if (item && item.quantity > 1) {
            item.quantity -= 1;
            await user.save();
            return res.json({ success: true, cart: user.cart });
        }
        res.status(404).json({ success: false, message: "Item not found or quantity is 1" });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error" });
    }
});

// // const images = import.meta.glob("/src/assets/productImages/*.{jpg,jpeg,png}", { eager: true });
// const imagesDir = path.join(__dirname, "assets", "productImages");
// const imageList = fs.readdirSync(imagesDir)
//   .filter(file => /\.(jpg|jpeg|png)$/i.test(file))
//   .map(file => path.join("assets", "productImages", file)); // relative path for storage

//     // const imageList = Object.values(images).map(img => img.default);

// const randomImage = () => {
//         if (imageList.length === 0) return null;
//         const idx = Math.floor(Math.random() * imageList.length);
//         return imageList[idx];
// };

// app.post("/addimageurl", async (req, res) => {
//     try {
//         // Get all products
//         const products = await Product.find();

//         // Update each product with a random image_url
//         const updates = await Promise.all(products.map(async (product) => {
//             const image_url = randomImage();
//             product.image_url = image_url;
//             await product.save();
//             return { _id: product._id, image_url };
//         }));

//         res.status(200).json({ message: "Image URLs added to all products", updates });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Server error" });
//     }
// });

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"../../client/market/dist")));

    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname,"../../client/market/dist/index.html"));
    })
}


app.listen(port,()=> console.log(`server listing on port ${port}`))