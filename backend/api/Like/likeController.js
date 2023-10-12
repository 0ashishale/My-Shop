const Like = require('./LikeModel')
const User = require('../User/userModel')
const Product = require('../Product/productModel')
const Errorhandler = require('../../utils/errorHandler')

//create like --post
exports.createLike = async (req, res, next) =>{
    const {productId} = req.body
    const id = req.user._id
    if(!productId){
        return next(new Errorhandler(`Product id is required`, 400))
    }
    try {
        const product = await Product.findById(productId);

        

        if(!product){
            return next(new Errorhandler(`Product not found`, 404))
        }

        const isLiked = await Like.findOne({user : id, product : productId})

        if(isLiked){
            await Like.findByIdAndDelete(isLiked._id)
            product.likes--;
            await product.save()
          
            return   res.status(200).json({
                success : true, 
                liked : false
            })
        }

        const newLike = new Like({user : id, product : productId})
        await newLike.save()
        
        product.likes++;
        await product.save()
        res.status(201).json({
            success : true,
            liked : true
        })
       


    } catch (error) {
        return next(new Errorhandler(`Error in crete like: ${error.message}`, 500))
    }
}

//get liked status
exports.getLikeProducts = async (req, res, next)=>{
    const id = req.user._id;
    

    try {
        
        const likedProducts = await Like.find({user : id})


        if(!likedProducts){
            return next(new Errorhandler(`No Liked Products.`, 404))
        }


            res.status(200).json({
                success : true,
                likedProducts
            })
      
    } catch (error) {
        return next(new Errorhandler(`Error in like status: ${error.message}`, 500))
    }
}