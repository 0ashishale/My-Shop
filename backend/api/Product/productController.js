const Errorhandler = require('../../utils/errorHandler');
const Product = require('./productModel')
const cloudinary = require('cloudinary')


//create product

exports.createProduct  = async (req, res, next)=>{

    let images = [];
    try {
   

        if(typeof req.body.images === 'string'){
            images.push(req.body.images)
        }else{
            images = req.body.images
        }

        const imagesLinks = []
        for (let index = 0; index < images.length; index++) {
            const result = await cloudinary.v2.uploader.upload(images[index], {
                folder : "Products"
            })
            imagesLinks.push({
                public_id : result.public_id,
                url : result.url
            })
            
        }

        req.body.user = req.user.id;
        req.body.images = imagesLinks;
        
     const product = await Product.create(req.body)

        res.status(201).json({
            success :true,
            product
        })
    } catch (error) {
       
        return next(new Errorhandler(`Error on product creation, ${error}`, 500))
    }
}

//get all products 
exports.getAllProducts = async (req,res, next)=>{
    try {
        const products = await Product.find()

        res.status(200).json({
            success : true,
            products
        })
    } catch (error) {
        return next(new Errorhandler(`Error:`, error))
    }
}

//delete products
exports.deleteProduct= async (req, res,  next)=>{
    try {
        
        const {id} = req.params;
    
        const product = await Product.findByIdAndDelete(id)
        if(!product){
            return next(new Errorhandler(`Product not found`, 401))
        }
        //deleting images from cloudnary
      
        for (let i = 0; i < product.images.length; i++) {
          await cloudinary.v2.uploader.destroy(product.images[i].public_id)
        }
      
        res.status(200).json({
            success : true,
            message  : "Product deleted succeessfully"
        })
    } catch (error) {
        res.status(401).json({
            success : false,
            error : error.message
        })
    }


}


//get product details

exports.getProductDetails = async(req, res, next)=>{
    try {
        const {id} = req.params;

        const product = await Product.findById(id)

        if(!product){
            return next(new Errorhandler(`Product not found`, 404))
        }

        res.status(200).json({
            success : true,
            product
        })


    } catch (error) {
        return next(new Errorhandler(`Error in getproduct details : ${error}`, 500))
    }
}


//update products

exports.updateProduct = async (req, res, next) =>{
    try {
        const {id} = req.params;
       
        const product = await Product.findById(id)

        if(!product){
            return next(new Errorhandler(`Product not found`, 404));
        }

        //image part is important

        let images = [];

        if(typeof req.body.images === 'string'){
            images.push(req.body.images)
        }else{
            images = req.body.images
        }


        //for cloudinary images

        if(images != undefined){

            //destroying cloudinary images by getting public_id from product model
            for (let i = 0; i < product.images.length; i++) {
                if(product.images[i]._id.toString() === imageId){
                    await cloudinary.v2.uploader.destroy(product.images[i].public_id)
                }
            }

            const imagesLinks = []
            //now upload the new images to cloudinary and get images public_id 
            for (let i = 0; i < images.length; i++) {
                const result = await cloudinary.v2.uploader.upload(images[i], {folder : 'Products'});

                //now get images public_id and url from cloudinary and save to our database
             
                imagesLinks.push({
                    public_id : result.public_id,
                    url : result.url
                })
            }
            req.body.images = imagesLinks
            
        }

        const updatedProduct = await Product.findByIdAndUpdate(id , req.body)

            res.status(201).json({
                success : true,
                message : `product updated.`,
                updatedProduct

                        })
        
    } catch (error) {
      return next(new Errorhandler(`Error in update : ${error}`, 500))
    }
}


exports.deleteProductImage = async (req, res, next) => {
    const { productId, imageId } = req.params;
    try {
        const product = await Product.findById(productId);
    
        if (!product) {
          // Handle the case where the product is not found
          return res.status(404).json({
            success : false,
            message : "Product not found"
          })
        }
    
    
        const imageIndex = product.images.findIndex((image) => image._id.toString() === imageId);
      
        if (imageIndex === -1) {
          // Handle the case where the image is not found in the product
          return res.status(404).json({
            success : false,
            message : "Image not found"
          });
        }
        const publicIdToDelete = product.images[imageIndex].public_id;

        await cloudinary.v2.uploader.destroy(publicIdToDelete)
        // Remove the image from the product's images array
        product.images.splice(imageIndex, 1);
    
        // Save the updated product
        await product.save({
            new: true,
            runValidators: true,
            useFindAndModify: false,
        });
    res.status(200).json({
        success : true,
        message : `Image deleted.`
    })
      } catch (error) {
        // Handle any errors that occur during the deletion process
        console.error('Error deleting image:', error);
         res.status(500).json({ success: false, message: 'Internal server error' });
      }


  };


  //get featured products

  exports.getFeaturedProducts = async(req, res,  next)=>{
    try {
      const featuredProducts = await Product.find({featured : true})
        res.status(200).json({
            success : true,
           featuredProducts
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success : false,
           error: error.message
        })
    }
  }