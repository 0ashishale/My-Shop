const {  sendEmailVerificationOTP, verifyEmail, resetPassword } = require('./otpController')


const router = require('express').Router()


// router.post('/otp', sendOtp)
router.post('/verify', verifyEmail)
router.post('/email-verification', sendEmailVerificationOTP )
router.post('/reset-password', resetPassword)

module.exports = router