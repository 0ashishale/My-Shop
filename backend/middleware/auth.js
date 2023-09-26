const Errorhandler = require("../utils/errorHandler");
const jwt = require("jsonwebtoken");
const User = require("../api/User/userModel");


exports.isAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }

    return res.status(401).json({
        message : `Please login to access this resource`
    })
};

exports.authorizedRole = (...roles) => {
  try {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return next(new Errorhandler(`Not Authorized to use this resource.`));
      }

      next();
    };
  } catch (error) {
    return next(new Errorhandler(`Error in authorized role`, 500));
  }
};
