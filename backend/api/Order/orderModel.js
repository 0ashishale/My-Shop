const mongoose = require('mongoose')

const orderScheme = new mongoose.Schema({
    user : {
        type : mongoose.Schema.ObjectId,
        ref : "User",
        required : true
    },
    shippingInfo :{
        name : {
            type : String,
            required : [true, 'Customer Name is required.']
        },
        number : {
            type : Number,
            required : [true, `Customer number is required.`]
        },
        district: {
            type : String,
            required : [true, `District is required`]
        },
        city : {
            type : String,
            required : true
        },
        area :{
            type : String,
            required : true
        },
        address : {
            type :String,
            required : true
        }
    },
    orderItems : [{
        productId : {
                type : mongoose.Schema.ObjectId,
                ref : "Product",
                required : true
        },
        name : {
            type : String,
            required : [true, `Product Name is required.`]
        },
        price : {
            type : Number,
            required : true
        },
        image : {
            type : String,
            required : true
        },
        quantity : {
            type : Number,
            required : true
        }
    }],
    itemsPrice : {
            type : Number,
            required : true
    },
    shippingFee : {
        type : Number,
        required : true
    },
    totalPrice : {
        type : Number,
        required : true
    },
    orderStatus : {
        type : String,
        default : 'Processing'
    },
    deliveredAt : {
        type : Date,  
    },
    paymentStatus : {
        type : String,
        default : false
    },
    paidAt :{
        type : Date,
    }

 
}, {timestamps : true})

module.exports = mongoose.model('Order', orderScheme)