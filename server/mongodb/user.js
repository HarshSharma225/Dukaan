const mongoose = require('mongoose');
require('dotenv').config()
const mongodb = mongoose.connect(process.env.DB_URL)
                        .then(()=>console.log("database connected"))
                        .catch((err)=>console.log(err))

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