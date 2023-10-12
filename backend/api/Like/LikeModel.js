const mongoose = require('mongoose')
const User = require('../User/userModel')
const Product = require('../Product/productModel')

const likeScheme = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    product : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Product",
        required : true
    }
}, {timestamps : true})

module.exports = mongoose.model('Like', likeScheme)