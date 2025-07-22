const express = require("express");
const bcrypt = require('bcryptjs');
const cookie = require("cookie-parser");
const jwt = require("jsonwebtoken");
const {User,Product} = require("./mongodb/user");
const cookieParser = require("cookie-parser");
const cors = require("cors")
const productlist = require("./productList.json")

const secretkey = "radharani";

const app = express()
const port = 5000;

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.get("/",(req,res)=>{
    res.json({message: "Radhe Radhe"});
})

//User --------------------------------------------------------------------------------------------------------

app.post("/user/signup",async (req,res)=>{
    const {name,email,password} = req.body;
    console.log(name,email,password)
    if(!email||!name||!password) console.log("Enter name, email and password")

    else{
        try {
            const hash = await bcrypt.hash(password,8);

            const newUser = new User({name,email,password:hash});
            await newUser.save();

            res.status(201).json({message: `user ${name} registered successfully`})
        } catch (error) {
            console.log(`error in server/index.js:line:30 :: ${error}`)
        }
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
    const items = await Product.find();
    res.status(200).json(items);
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
                image_url: product.image_url // or whatever your field is
            } : null
        };
    }));
    console.log("index.js",items)
    res.status(200).json(items);


    // const items = await cartlist.json()
    // res.status(200).json(items);
    // // cartlist.map((item)=>{
    // //     console.log(item);
    // //     res.status(200).json(item);
    // // })
})
app.post("/user/:id/cart", async (req, res) => {
    const userId = req.params.id;
    const { product_id, image_url, quantity } = req.body;

    try {
        const user = await User.findById(userId);

        if (!user) return res.status(404).json({ message: "User not found" });

        // Check if product already exists in cart
        const existingItem = user.cart.find(item => item.product_id.toString() === product_id);

        if (existingItem) {
            // Update quantity
            existingItem.quantity += quantity; // or set = quantity if you want to overwrite
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
    }
})



app.listen(port,()=> console.log(`server listing on port ${port}`))