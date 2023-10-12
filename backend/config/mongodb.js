const mongoose = require("mongoose"); 
const dotenv = require("dotenv");
const MongoClient = require('mongodb').MongoClient



dotenv.config();

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

const Connection = () => {
  const MONGOOSE_URI = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.gk9sdgs.mongodb.net/?retryWrites=true&w=majority`
  mongoose.connect(MONGOOSE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  mongoose.connect(MONGOOSE_URI, {
    useNewUrlParser : true,
    useUnifiedTopology : true,
  })

  mongoose.connection.on("connected", () => {
    console.log("Database Connected Successfully");
  });

  mongoose.connection.on("disconnected", () => {
    console.log("Database Disconnected");
  });

  mongoose.connection.on("error", () => {
    console.log(`Error while connecting with database`);
  });
};



// const Connection = () => {
//   // To connect with your mongoDB database 

// // Connecting to database 
// mongoose.connect('mongodb://localhost:27017/MyShop', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }).then(()=>console.log('Database connected')).catch((error)=>console.log(error));


// };



module.exports = Connection;
