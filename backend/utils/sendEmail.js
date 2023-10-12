const nodemailer = require('nodemailer')
const Errorhandler = require('./errorHandler')


let transporter = nodemailer.createTransport({
    host : process.env.SMTP_HOST,
    auth : {
        user : process.env.SMTP_USER,
        pass : process.env.SMTP_PASS
    }
})

const sendEmail = async(mailOptions, otp)=>{

        try {
            const mailOption = {
                from : process.env.SMTP_USER,
                to : mailOptions.to,
                subject : mailOptions.subject,
                html : `<p>${mailOptions.message} </p> <p style="color:tomato;font-size:25px;letter-spacing:2px"><b>${otp}</b></p>
                        <p>This OTP code is expires in 20 minutes`
            }
            await transporter.sendMail(mailOption)
            return
        } catch (error) {
            throw new Errorhandler(`Error in sendEmail. ${error.message} `, 500)
        }
}

module.exports = sendEmail