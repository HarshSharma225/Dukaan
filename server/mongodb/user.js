const mongoose = require('mongoose');
const mongodb = mongoose.connect('mongodb://localhost:27017/ecommerce')
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
                required: true
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
    }
});

const  User = mongoose.model("users",UserSchema);
const  Product = mongoose.model("products",productSchema);
module.exports = {User,Product};