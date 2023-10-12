const Errorhandler = require('../utils/errorHandler');
const ErrorHandler = require('../utils/errorHandler')

module.exports = (err, req, res, next) =>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message || `Internal server error`

    if(err.name === 'CastError'){
      const  error = new ErrorHandler(`Resource not found. Invalid: ${err.path}`, 400);
    }

    if(err.code === 11000){
      const  error = new ErrorHandler(`Duplicate key error.`, 400)
    }

    if(err.name === 'JsonWebTokenError'){
      const  error = new ErrorHandler(`Json web token is invalid.`, 400)
    }

    if(err.name === 'TokenExpireError'){
     const   error = new ErrorHandler(`Json web token is expired`, 400)
    }

    res.status(err.statusCode).json({
        success : false,
        message : err.message
    })
    // return next(new Errorhandler(err.message, err.statusCode))
}