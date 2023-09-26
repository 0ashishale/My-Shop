const {
  createProduct,
  getAllProducts,
  deleteProduct,
  updateProduct,
  getProductDetails,
  deleteImage,
  deleteProductImage,
  getFeaturedProducts,
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
router.get('/featured/product', getFeaturedProducts)

module.exports = router;
