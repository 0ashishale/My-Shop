const mongoose = require('mongoose')


const otpSchema = new mongoose.Schema({
    email : {type : String, unique : true},
    otp : String,
    createdAt : {type : Date, default : Date.now()},
    expiredAt : Date
})

module.exports = mongoose.model("OTP", otpSchema)