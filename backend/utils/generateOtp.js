const Errorhandler = require("./errorHandler")

const generateOtp = async ()=>{
    try {
        return (otp = `${Math.floor(1000 + Math.random() * 9000)}`)
    } catch (error) {
        throw new Errorhandler(`Error in generating otp. ${error.message} `)
    }
}

module.exports = generateOtp