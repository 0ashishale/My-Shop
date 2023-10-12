const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name required"],
    },
    description: {
      type: String,
      required: [true, "description required"],
    },
    price: {
      type: Number,
      required: [true, `price required`],
    },
    ratings: {
      type: Number,
      default: 0,
    },
    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    category: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
      default: 1,
    },

    questionAnswer: [
      {
        user: {
          type: mongoose.Schema.ObjectId,
          ref: "User",
        },
        name : {
            type : String
        },
        question: {
          type: String,
          maxlength: [50, `Question cannot excessed 50 character`],
       
        },
        answer: {
          type: String,
          maxlength: [50, `Question cannot excessed 50 character`],
        },
        createdAt: {
          type: Date,
          default: Date.now(),
        },
      },
    ],

    reviews: [
      {
        user: {
          type: mongoose.Schema.ObjectId,
          reequired: true,
          ref: "User",
        },
        name: {
          type: String,
        },
        rating: {
          type: Number,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
        images: [
          {
            public_id: {
              type: String,
            },
            url: {
              type: String,
            },
          },
        ],
      },
    ],
    numOfReviews: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    size: {
      type: Boolean,
      default: false,
    },
    likes: [
      {
        user: {
          type: mongoose.Schema.ObjectId,
          ref: "User", // Reference the User model
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
