const mongoose = require('mongoose')



const productSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, 'name required'],

    },
    description : {
        type : String,
        required : [true, 'description required']
    },
    price : {
        type : Number,
        required : [true, `price required`]
    },
    ratings : {
        type : Number,
        default : 0
    },
    images : [
        {
        public_id : {
            type : String,
            required : true,
        },
        url : {
            type : String,
            required : true
        }
   }],
   category : {
    type : String,
    required : true
   },
   stock : {
    type : Number,
    required : true,
    default : 1
   },

   reviews : [
    {
            user : {
                type : mongoose.Schema.ObjectId,
                reequired  : true,
                ref : "User"
            },
            rating : {
                type : Number,
                required : true
            },
            comment : {
                type : String,
                required : true
            }
        }
   ],
   numOfReviews : {
    type : Number,
    default : 0
    
   },
   user : {
    type : mongoose.Schema.ObjectId,
    ref : "User",
    required : true
   },
   featured : {
    type : Boolean,
    default : false
   },
   size : {
    type : String
   }
   
}, {timestamps : true})

module.exports = mongoose.model("Product", productSchema)