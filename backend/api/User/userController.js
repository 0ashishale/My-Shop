// const expres = require("express");

// const User = require("./userModel");
// const ErrorHandler = require("../../utils/errorHandler");
// const cloudinary = require("cloudinary");
// const sendToken = require("../../utils/sendToken");

// //register new user
// exports.createNewUser = async (req, res, next) => {
//   try {
//     const { name, email, password, number } = req.body;

//     const user = await User.findOne({ email: email });
//     if (user) {
//       return res.status(401).json({
//         success: false,
//         message: `Email is Already in used`,
//       });
//     }
//     const newUser = await User.create({
//       name,
//       number,
//       email,
//       password,
//       avatar: {
//         public_id: "sampleid",
//         url: "sample url",
//       },
//     });

//     if(newUser){
//       sendToken(newUser, res, 200);
//     }

//     // //for avater image
//     // const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
//     //   folder: "My Shop/Products",
//     //   width: 150,
//     //   crop: "scale",
//     // });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       success: false,
//       error: error.message,
//     });
//   }
// };

// exports.loginUser = async (req, res, next) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return next(new ErrorHandler("Email and Password both required."));
//     }
//     const user = await User.findOne({ email }).select("+password");

//     if (!user) {
//       return next(new ErrorHandler(`Invalid email or password.`, 401));
//     }

//     const isPasswordMatched = await user.comparePassword(password);

//     if (!isPasswordMatched) {
//       return res.status(401).json({
//         success: false,
//         message: `Invalid Email or Password. Please Check again and try again.`,
//       });
//     }

//    sendToken(user, res, 200)
//   } catch (error) {

//   }
// };

// exports.logOut = async (req, res, next) => {
//   try {
//     res.cookie("token", null, {
//       expires: new Date(Date.now()),
//       httpOnly: true,
//     });

//     req.logout();

//     res.redirect("/");
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

const Errorhandler = require("../../utils/errorHandler");
const User = require("./userModel");
const bcrypt = require("bcrypt");

const cloudinary = require("cloudinary");

exports.register = async (req, res, next) => {
  try {
    const { name, email, number, password } = req.body.userData;

    if (!name || !email || !number || !password) {
      return next(new Errorhandler("All fields are requied", 401));
    }

    const user = await User.findOne({ email: email }).select("+password");

    if (user) {
      return next(
        new Errorhandler("Email is already in use. Please login", 401)
      );
    }

    
    const newUser = await User.create({
      name,
      email,
      number,
      password,
    });

    res.status(201).json({
      succes: true,
      user: newUser,
    });
  } catch (error) {
    return next(
      new Errorhandler(`Error in register user ${error.message}`, 500)
    );
  }
};

//Admin --GET ALL USERS
exports.getAllUsers = async (req, res, next) => {
  try {
    if (req.isAuthenticated()) {
      const allUsers = await User.find();

      return res.status(200).json({
        succes: true,
        allUsers,
      });
    } else {
      res.status(401).json({
        succes: false,
        message: "Login to access this resource",
      });
    }
  } catch (error) {
    return next(new Errorhandler(`Error in get users: ${error} `, 500));
  }
};

//update user role
exports.updateUser = async (req, res, next) => {
  const { id } = req.params;
  const { role } = req.body;

  if (!role) {
    return next(new Errorhandler(`Role is required`, 401));
  }

  const user = await User.findById(id);

  if (!user) {
    return next(new Errorhandler(`User not found with id ${id}`, 404));
  }

  // Update the user's role
  user.role = role;

  try {
    await user.save(); // Save the updated user

    res.status(200).json({
      success: true,
      message: `User role updated successfully`,
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

//delete user

exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return next(
        new Errorhandler(`User not found with id ${req.params.id}`, 401)
      );
    }
    res
      .status(200)
      .json({ success: true, message: `User deleted successfully` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

//update profile
exports.updateUserProfile = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return next(new Errorhandler(`User not found`, 404));
    }

    if (req.body.avatar != "") {
      if (user.avatar.public_id) {
        await cloudinary.v2.uploader.destroy(user.avatar.public_id);
      }
      const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "Users",
      });

      user.avatar = {
        public_id: result.public_id,
        url: result.url,
      };

      await user.save({
        new: true,
        runValidators: true,
        useFindandModify: false,
      });
    }

    res.status(201).json({
      success: true,
      message: `User Updated.`,
    
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

//change password
exports.updatePassword = async (req, res, next) => {
  if(!req.body.newPassword || !req.body.oldPassword){
    return next(new Errorhandler(`Old and new both password are required`, 400))
  }
  try {
    const user = await User.findById(req.user.id).select("+password");

    if (!user) {
      return next(new Errorhandler(`User not found.`, 404));
    }

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if (!isPasswordMatched) {
      return next(
        new Errorhandler(`Password does not matched. Please try again.`, 401)
      );
    }

    user.password = req.body.newPassword;

    await user.save();

    res.status(200).json({
      success: true,
      message: `Password Updated Successfully.`,
    });
  } catch (error) {
    next(new Errorhandler(`${error.message}`, 500));
  }
};


