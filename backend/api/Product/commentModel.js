const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.ObjectId,
        ref : "User"
    },
    product : {
        type : mongoose.Schema.ObjectId,
        ref : "Produt"
    },
    question : {
        type : String
    },
    

})