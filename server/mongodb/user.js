const mongoose = require('mongoose');
require('dotenv').config()

// Improved database connection with better error handling
const connectDB = async () => {
    try {
        if (!process.env.DB_URL) {
            throw new Error('DB_URL environment variable is not set');
        }
        
        await mongoose.connect(process.env.DB_URL);
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection error:", error.message);
        process.exit(1); // Exit if database connection fails
    }
};

// Connect to database
connectDB();

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