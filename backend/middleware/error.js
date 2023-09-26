const ErrorHandler = require('../utils/errorHandler')

module.exports = (err, req, res, next) =>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message || `Internal server error`

    if(err.name === 'CastError'){
      const  err = new ErrorHandler(`Resource not found. Invalid: ${err.path}`, 400);
    }

    if(err.code === 11000){
      const  err = new ErrorHandler(`Duplicate ${Object.keys(err.key)} Entered.`, 400)
    }

    if(err.name === 'JsonWebTokenError'){
      const  err = new ErrorHandler(`Json web token is invalid.`, 400)
    }

    if(err.name === 'TokenExpireError'){
     const   err = new ErrorHandler(`Json web token is expired`, 400)
    }

    res.status(err.statusCode).json({
        success : false,
        message : err.message
    })
}