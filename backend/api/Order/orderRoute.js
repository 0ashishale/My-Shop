const router = require("express").Router();
const { isAuthenticated, authorizedRole } = require("../../middleware/auth");
const {
  createNewOrder,
  myOrders,
  getAllOrders,
  deleteOrder,
  getOrderDetails,
  updateStatus,
} = require("./orderController");

router.post("/create-order", isAuthenticated, createNewOrder);
router.get("/my-order", isAuthenticated, myOrders);
router.get("/all-orders", getAllOrders); //isadmin
// router.delete(
//   "/order/:id",
//   isAuthenticated,
//   authorizedRole("admin"),
//   deleteOrder
// );
// router.get('/order/:id',isAuthenticated, getOrderDetails);
router.route('/order/:id')
.delete(
    isAuthenticated,
    authorizedRole("admin"),
    deleteOrder
  )
  .get(isAuthenticated, getOrderDetails)
  .put(updateStatus)
module.exports = router;
