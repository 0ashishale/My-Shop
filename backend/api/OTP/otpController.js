
const Errorhandler = require('../../utils/errorHandler')
const OTP = require('./otpModel')
const generateOtp = require('../../utils/generateOtp')
const sendEmail = require('../../utils/sendEmail')
const bcrypt = require('bcrypt')
const User = require('../User/userModel')



const sendOtp = async (email, mailOptions)=>{
    try {
        // const {email } = req.body

        if(!email){
            throw new Errorhandler(`Email is required.`)
        }

        //delete old record
        await OTP.deleteOne({email});

        //generate pin
        const otp = await generateOtp();
        

        //send email
        //save otp in database
        const hashedOtp = await bcrypt.hash(otp, 10)
        const newOtp = await OTP.create({email, otp : hashedOtp, expiredAt : Date.now() + process.env.OTP_EXPIRE * 60* 60*1000})
        await sendEmail(mailOptions, otp)
        
        return newOtp;
    } catch (error) {
        throw new Errorhandler(`Error in sendOtp . ${error.message}`, 500)
    }
}

//verify otp 

const verifyOTP = async (email, otp)=>{
    try {

        if(!email && !otp){
            throw new Errorhandler(`Both fields are required ikm.`, 401);
        }

        //ensure otp record is exist or not
        const matchedOTP = await OTP.findOne({email})
        if(!matchedOTP){
            throw new Errorhandler(`No otp records found`)
        }

        const {expiredAt} = matchedOTP


        if(expiredAt < Date.now()){
            await OTP.deleteOne({email})
            throw new Errorhandler(`OTP is expired`)
        }

        //verify otp

        const match = await bcrypt.compare(otp, matchedOTP.otp )

        if(!match){
            throw new Errorhandler(`OTP code is not matched`, 401)
        }
        return match
        // res.status(200).json({
        //     valid : true
        // })

    } catch (error) {
        throw new Errorhandler(`verifyOtp : ${error.message}`)
    }
}

//delete otp
const deleteOTP = async({email})=>{
    try {
        
        await OTP.deleteOne({email})
        
    } catch (error) {
        throw new Errorhandler(`Err : ${error.message}`)
    }
}

//request to verification email otp

exports.sendEmailVerificationOTP = async (req, res, next)=>{
    try {
        const {email} = req.body;

        if(!email){
            return next(new Errorhandler(`Email is required`, 401));
        } 

        const existingUser = await User.findOne({email})
        if(!existingUser){
            return next(new Errorhandler(`Could not found provided email`, 401))
        }

        const mailOptions = {
            from : process.env.SMTP_USER,
            to : email,
            subject : `My Shop email verifiation`,
            message : `Verify your email with the code below`
        }
   
       const newOtp = await sendOtp(email,mailOptions )
       

        res.status(200).json({
            success : true,
            message : `Email send to ${email}`,
            newOtp
        })
    } catch (error) {
        return next(new Errorhandler(`Error email otp : ${error.message}`, 500))
    }
}

exports.verifyEmail = async (req, res, next)=>{
    try {
        const {email, otp} = req.body;
        
        if(!(email && otp)){
            return next(new Errorhandler(`Email and otp both are required.`, 401))
        }

        const isVerifiedOTP = await verifyOTP(email, otp)
       

        if(!isVerifiedOTP){
            return next(new Errorhandler(`OTP is not verified. Please Check your OTP`, 401))
        }
       const user = await User.findOne({email})
       if(!user){
        return next(new Errorhandler(`User not found`, 404))
       }
      user.verified = true
       await user.save();

       await OTP.deleteOne({email})
        res.status(200).json({
            success : true,
            verified : true ,
            user
        })
    } catch (error) {
        return next(new Errorhandler(`VerifyEmail : ${error.message}`))
    }
}


//reset password
exports.resetPassword = async (req, res, next)=>{
    try {
      const {email, otp, password} = req.body;
      console.log(req.body);
  
      if(!email || !otp || !password){
          return next(new Errorhandler(`Email, password and otp code are required.`, 401))
      }
    
      
      const isVerifiedOTP = await verifyOTP(email, otp)

      if(!isVerifiedOTP){
        return next(new Errorhandler(`Otp cannot be verified. Please check again`))
      }
      const user = await User.findOne({email : email}).select("+password")
  
      if(!user){
        return next(new Errorhandler(`User not found`, 404))
      }

      user.password = password;

      await user.save()

      res.status(200).json({
        success : true,
        user
      })
      
      
    } catch (error) {
      return next(new Errorhandler(`Error in resetPassword, ${error.message}`, 500))
    }
  }