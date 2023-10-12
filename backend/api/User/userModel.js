const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Username is Required"],
      unique: true,
    },

    number: {
      type: Number,
      minLength: [10, `Phone Number must be 10 Digits`],
      maxLength: [10, `Phone Number must be 10 Digits`],
    },

    email: {
      type: String,
      required: false,
      unique: true,
    },

    password: {
      type: String,
      select: false,
      minLength: [8, `Password should at least 8 characters`],
      maxLength: [100, `Password cannot exceed 100 characters`],
    },

    provider: {
      providerName: String,
      userId: String,
    },

    avatar: {
      public_id: {
        type: String,
        default : null,
        required: false,
      },
      url: {
        type: String,
        required: false,
        default : null
      },
    },

    role: {
      type: String,
      required: true,
      default: "user",
    },
    token :{
        type : String
    },
    verified : {
      type : Boolean,
      default : false
    },

    resetPasswordToken: String,
    resetTokenExpires: Date,
  },
  { timestamps: true }
);

UserSchema.pre('save', async function(next){
  if(!this.isModified('password')){
          next();
  }
  if(!this.password){
    return next(new Error(`Password is required`))
  }
  this.password = await bcrypt.hash(this.password, 10)
})


UserSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

UserSchema.methods.getJWTToken = function(){
    return jwt.sign({id:this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    })

}

module.exports = mongoose.model("User", UserSchema);
