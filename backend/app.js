const express = require('express');
const cloudinary = require('cloudinary')
// const cookieSession = require('cookie-session');
const expressSession = require("express-session")
const passport = require('passport')


const app = express()
const dotenv = require('dotenv');

dotenv.config({path : './config/config.env'})


 require('./config/passportSetup')

//this is extermly important for get values from url or read the arguments send by the frontend which is  in json format
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false, limit: '10mb' }));




//database connection
const connection = require('./config/mongodb')
connection();

//cloudinary confif
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  })
  

const cors = require('cors');
// Use the CORS middleware to allow requests from your React frontend's domain
const corsOptions = {
    origin: ' http://localhost:3000', // Replace with your frontend's URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Include if you need to support cookies or sessions
    optionsSuccessStatus: 204, // Some legacy browsers (IE11) choke on 204
  };
app.use(cors())
/* ================ Creating Cookie Key and link with Passport JS: Start ================  */



app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(expressSession({
    name: 'token',
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false
}));


// app.use(require('express-session')({ secret: process.env.SESSION_SECRET_KEY, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


//auth route
const authRoute = require('./api/User/authRoute')
app.use('/api', authRoute)

//user routes
const userRoute = require('./api/User/userRoute');
app.use('/api', userRoute)

//product route
const productRoute = require('./api/Product/productRoute')
app.use('/api', productRoute)


//errormiddleware
const errormiddleware = require('./middleware/error')
app.use(errormiddleware)  

const port = process.env.PORT || 5000

const server = app.listen(port, (req, res)=>{
    console.log(`Server is running on port: ${port}`)

})

//Unhandeled Promise Rejection Error Handler

process.on('unhandledRejection', (err)=>{
    console.log(`Error : ${err.message}`);
    console.log(`Shutting down the server due to unhandeled promise rejection`);

    server.close(()=>{
        process.exit(1);
    })
})