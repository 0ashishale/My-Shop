const Errorhandler = require("../../utils/errorHandler");
const Product = require("./productModel");
const cloudinary = require("cloudinary");

//create product

exports.createProduct = async (req, res, next) => {
  let images = [];
  try {
    if (typeof req.body.images === "string") {
      images.push(req.body.images);
    } else {
      images = req.body.images;
    }

    const imagesLinks = [];
    for (let index = 0; index < images.length; index++) {
      const result = await cloudinary.v2.uploader.upload(images[index], {
        folder: "My Shop/Products",
      });
      imagesLinks.push({
        public_id: result.public_id,
        url: result.url,
      });
    }

    req.body.user = req.user.id;
    req.body.images = imagesLinks;

    const product = await Product.create(req.body);

    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    return next(new Errorhandler(`Error on product creation, ${error}`, 500));
  }
};

//get all products
exports.getAllProducts = async (req, res, next) => {
  try {
    const searchQuery = (req.query.searchQuery || "").trim();
    const category = (req.query.category || "").trim();
  

    const page = parseInt(req.query.page || 1);
    const limit = parseInt(req.query.limit || 10);

    const skip = (page - 1) * limit;
    let sortOrder = "";
    if (req.query.sortOrder) {
      sortOrder = req.query.sortOrder === "desc" ? -1 : 1;
    }
    const products = await Product.find({
      name: { $regex: searchQuery, $options: "i" },
      category: { $regex: category, $options: "i" },
    })
      .sort({ price: sortOrder })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    return next(new Errorhandler(`Error:`, error));
  }
};

//delete products
exports.deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return next(new Errorhandler(`Product not found`, 401));
    }
    //deleting images from cloudnary

    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    res.status(200).json({
      success: true,
      message: "Product deleted succeessfully",
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      error: error.message,
    });
  }
};

//get product details

exports.getProductDetails = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return next(new Errorhandler(`Product not found`, 404));
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    return next(
      new Errorhandler(`Error in getproduct details : ${error}`, 500)
    );
  }
};

//update products

exports.updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return next(new Errorhandler(`Product not found`, 404));
    }

    //image part is important

    let images = [];

    if (typeof req.body.images === "string") {
      images.push(req.body.images);
    } else {
      images = req.body.images;
    }

    //for cloudinary images

    if (images != undefined) {
      //destroying cloudinary images by getting public_id from product model
      for (let i = 0; i < product.images.length; i++) {
        await cloudinary.v2.uploader.destroy(product.images[i].public_id);
      }

      const imagesLinks = [];
      //now upload the new images to cloudinary and get images public_id
      for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
          folder: "My Shop/Products",
        });

        //now get images public_id and url from cloudinary and save to our database

        imagesLinks.push({
          public_id: result.public_id,
          url: result.url,
        });
      }
      req.body.images = imagesLinks;
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(201).json({
      success: true,
      message: `product updated.`,
      updatedProduct,
    });
  } catch (error) {
    return next(new Errorhandler(`Error in update : ${error}`, 500));
  }
};

exports.deleteProductImage = async (req, res, next) => {
  const { productId, imageId } = req.params;
  try {
    const product = await Product.findById(productId);

    if (!product) {
      // Handle the case where the product is not found
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const imageIndex = product.images.findIndex(
      (image) => image._id.toString() === imageId
    );

    if (imageIndex === -1) {
      // Handle the case where the image is not found in the product
      return res.status(404).json({
        success: false,
        message: "Image not found",
      });
    }
    const publicIdToDelete = product.images[imageIndex].public_id;

    await cloudinary.v2.uploader.destroy(publicIdToDelete);
    // Remove the image from the product's images array
    product.images.splice(imageIndex, 1);

    // Save the updated product
    await product.save({
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    res.status(200).json({
      success: true,
      message: `Image deleted.`,
    });
  } catch (error) {
    // Handle any errors that occur during the deletion process
    console.error("Error deleting image:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

//get featured products

exports.getFeaturedProducts = async (req, res, next) => {
  try {
    const featuredProducts = await Product.find({ featured: true });
    res.status(200).json({
      success: true,
      featuredProducts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

//create review and update if user already reviewed --put

exports.createProductReview = async (req, res, next) => {
  try {
    const { rating, comment, productId, images } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
      return next(new Errorhandler(`Product not found`, 404));
    }

    //reviewImage part
    let reviewImage = [];

    if (typeof images === "string") {
      reviewImage.push(images);
    } else {
      reviewImage = images;
    }
    let imagesLinks = [];

    //for cloudinary
    if (images != undefined) {
      //destroying if old images
      // for (let i = 0; i < product.reviews.images.length; i++) {
      //     await cloudinary.v2.uploader.destroy(product.reviews.images[i].public_id)

      // }

      //uploading images to cloudinary and save links in database
      for (let i = 0; i < reviewImage.length; i++) {
        const result = await cloudinary.v2.uploader.upload(reviewImage[i], {
          folder: "My Shop/Products/Reviews",
        });
        imagesLinks.push({
          public_id: result.public_id,
          url: result.url,
        });
      }
    }

    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
      images: imagesLinks,
    };

    //for review
    const isReviewed = product.reviews.find(
      (rev) => rev.user.toString() === req.user._id.toString()
    );

    if (isReviewed) {
      product.reviews.forEach((rev) => {
        if (rev.user.toString() === req.user._id.toString()) {
          (rev.rating = rating),
            (rev.comment = comment),
            (rev.images = imagesLinks);
        }
      });
    } else {
      product.reviews.push(review);
      product.numOfReviews = product.reviews.length;
    }

    //for rating

    let avg = 0;

    product.ratings = product.reviews.forEach((rev) => {
      avg += rev.rating;
    });

    product.ratings = avg / product.numOfReviews;

    await product.save({ validateBeforeSave: false });

    res.status(201).json({
      success: true,
      message: `Review created successfully.`,
    });
  } catch (error) {
    return next(
      new Errorhandler(`Error in create review: ${error}, 500`)
    );
  }
};


//get all product reviews
exports.getAllReviews = async (req, res, next)=>{
  try {
    const {productId} = req.params;

    const product = await Product.find
  } catch (error) {
    
  }
}

exports.likeProduct = async (req, res, next)=>{
  try {
    const {productId} = req.body

    const product = await Product.findById(productId)
    if(!product){
      return next(new Errorhandler(`Product not found.`)
      )
    }

    const isLiked = await Product.find({"likes.user" : req.user._id})

    if(isLiked){
      $pull : {
        likes : {user : req.user._id}
      }
      res.status(200).json({
        success : true,
        liked : false
      })
    }else{
      product.likes.push(req.user._id)
      res.status(200).json({
        success : true,
        liked : true
      })
    }

    
  } catch (error) {
    return next(new Errorhandler(`Error in likeProduct : ${error.message}`, ))
  }
}

exports.toggleLike = async (req, res) => {
  try {
    const productId = req.body.productId;
    const userId = req.user._id; // Assuming you have user authentication in place

    // Find the product by ID
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if the user already liked the product
    const likedIndex = product.likes.findIndex((like) => like.user.equals(userId));

    if (likedIndex === -1) {
      // If not liked, add the user to the "likes" array
      product.likes.push({ user: userId });
       res.status(200).json({ liked: true });

    } else {
      // If already liked, remove the user from the "likes" array
      product.likes.splice(likedIndex, 1);
       res.status(200).json({ liked: false });

    }

    // Update the number of likes
    // product.numOfLikes = product.likes.length;

    await product.save();

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//question and answer

exports.createQuestion = async (req,res, next)=>{
  try {
    
const {id, question } = req.body
    

    const  product = await Product.findById(id)
    if(!product){
      return next(new Errorhandler(`Product not found`, 404))
    }
const quest = {
  user : req.user._id,
  name : req.user.name,
  question : question,
  
}
    product.questionAnswer.push(quest)
    await product.save()

    res.status(201).json({
      success : true,
      product
    })

  } catch (error) {
    return next(new Errorhandler(`Error in question Error : ${error.message}`, 500))
  }
}

exports.createAnswer = async (req, res, next) => {
  try {
    const { questionId , answer} = req.body;
    const product = await Product.findOne({ 'questionAnswer._id': questionId });

    if (!product) {
      return next(new Errorhandler(`Product not found`, 404));
    }
  
    // Find the question in the array and add the answer to it
    const questionIndex = product.questionAnswer.findIndex(
      (qa) => qa._id.toString() === questionId.toString()
    );

    if (questionIndex === -1) {
      return next(new Errorhandler(`Question not found`, 404));
    }

    product.questionAnswer[questionIndex].answer = req.body.answer;

    await product.save({
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    return next(new Errorhandler(`Error in answer Error : ${error.message}`, 500));
  }
};

//delete question answer
exports.deleteQuestionAns = async (req, res, next)=>{
  try {
    const {id} = req.params
    console.log(id);

    const product = await Product.findOne({'questionAnswer._id' : id})

    if(!product){
      return next(new Errorhandler(`Question not found`, 404))
    }

    const findIndex = product.questionAnswer.findIndex((qa)=>qa._id.toString() === id.toString())

    if(findIndex === -1){
      return next(new Errorhandler(`Question not found`, 404))
    }

    product.questionAnswer = product.questionAnswer.filter((item)=>item._id.toString() !== id.toString())

    await product.save({runValidators:true})
    res.status(200).json({
      success : true,
      product : product.questionAnswer
    })
  } catch (error) {
    return next(new Errorhandler(`Error in delete questionA. Error : ${error.message}`, 500))
  }
}
