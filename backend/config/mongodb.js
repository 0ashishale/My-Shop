const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

const Connection = () => {
  // const MONGOOSE_URI = `mongodb://localhost:27017/My`;
  const MONGOOSE_URI = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.gk9sdgs.mongodb.net/?retryWrites=true&w=majority`
  mongoose.connect(MONGOOSE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

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


module.exports = Connection;
