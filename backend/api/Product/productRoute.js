const {
  createProduct,
  getAllProducts,
  deleteProduct,
  updateProduct,
  getProductDetails,
  deleteImage,
  deleteProductImage,
  getFeaturedProducts,
  createProductReview,
  likeProduct,
  toggleLike,
  createQuestion,
  createAnswer,
  deleteQuestionAns,
} = require("./productController");

const router = require("express").Router();

const { authorizedRole, isAuthenticated } = require("../../middleware/auth");

router.post("/create-product", isAuthenticated, createProduct);
router.get("/all-products", getAllProducts);
router
  .delete(
    "/product/:id",
    isAuthenticated,
    authorizedRole("admin"),
    deleteProduct
  )
  router.get('/product/:id', getProductDetails);
router.put("/update-product/:id", updateProduct);
router.delete('/product/:productId/image/:imageId', deleteProductImage);
router.delete('/product/:productId/image/:imageId', deleteProduct);
router.get('/featured/products', getFeaturedProducts)
router.put('/product/like',isAuthenticated, toggleLike)

//review
router.put('/review', isAuthenticated, createProductReview)


//question
router.put('/product/question',isAuthenticated, createQuestion)
router.put('/product/answer',  createAnswer)
router.delete('/product/question/:id', deleteQuestionAns)

module.exports = router;
