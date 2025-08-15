const mongoose = require('mongoose');
<<<<<<< HEAD
require("dotenv").config();
const mongodb = mongoose.connect(process.env.MONGO_URI)
                        .then(()=>console.log("database connected"))
                        .catch((err)=>console.log(err))
=======
require('dotenv').config()

// Improved database connection with better error handling
const connectDB = async () => {
    try {
        if (!process.env.DB_URL) {
            throw new Error('DB_URL environment variable is not set');
        }
        
        // Validate connection string format
        const dbUrl = process.env.DB_URL.trim();
        if (!dbUrl.startsWith('mongodb://') && !dbUrl.startsWith('mongodb+srv://')) {
            throw new Error('Invalid MongoDB connection string. Must start with "mongodb://" or "mongodb+srv://"');
        }
        
        await mongoose.connect(dbUrl);
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection error:", error.message);
        
        // Provide helpful debugging information
        if (error.message.includes('Invalid scheme')) {
            console.error("🔧 FIX: Your DB_URL should look like:");
            console.error("   mongodb+srv://username:password@cluster.mongodb.net/database");
            console.error("   or");
            console.error("   mongodb://username:password@localhost:27017/database");
        }
        
        if (error.message.includes('not set')) {
            console.error("🔧 FIX: Set DB_URL environment variable in your Render dashboard");
        }
        
        process.exit(1); // Exit if database connection fails
    }
};

// Connect to database
connectDB();
>>>>>>> c4a44c4a3f30699930123a4c1c37880eab50fc5e

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    cart: [
        {
            product_id: {
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'Product',
                required: true
            },
            image_url: {
                type: String,
            },
            quantity: {
                type: Number,
                // required: true,
                default: 1
            }
        }
    ]
});
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number
    },
    image_url: {
        type: String
    }
});

const  User = mongoose.model("users",UserSchema);
const  Product = mongoose.model("products",productSchema);
module.exports = {User,Product};