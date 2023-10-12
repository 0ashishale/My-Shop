const Order = require("./orderModel");
const Product = require("../Product/productModel");
const User = require("../User/userModel");
const Errorhandler = require("../../utils/errorHandler");

//create order
exports.createNewOrder = async (req, res, next) => {
  const { shippingInfo, orderItems, itemsPrice, shippingFee, totalPrice } =
    req.body;

  try {
    const order = await Order.create({
      shippingInfo,
      orderItems,
      itemsPrice,
      shippingFee,
      totalPrice,
      user: req.user._id,
    });

    orderItems.forEach(async (item)=>{
    const product =  await Product.findById(item.productId)

    product.stock = product.stock - item.quantity;
    await product.save()

    })

    res.status(201).json({
      success: true,
      order,
    });
  } catch (error) {
    return next(
      new Errorhandler(`Error in create Order: ${error.message}`, 500)
    );
  }
};

//get my order
exports.myOrders = async (req, res, next) => {
  try {
    const order = await Order.find({ user: req.user._id });

    if (!order) {
      return next(
        new Errorhandler(`Order not found with this user id: ${req.user._id}`)
      );
    }
    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    return next(
      new Errorhandler(`Error in myOrder. Error : ${error.message}`, 500)
    );
  }
};

//get all orders - admin
exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find();

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    return next(
      new Errorhandler(`Error in getAllOrders. ${error.message}`, 500)
    );
  }
};

//get order details
exports.getOrderDetails = async (req, res, next) => {
  try {
    if (!req.params.id) {
      return next(new Errorhandler(`Id is required`, 400));
    }
    const order = await Order.findById(req.params.id);

    if (!order) {
      return next(new Errorhandler(`Order not found.`, 404));
    }
    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    return next(
      new Errorhandler(
        `Error in get order details. Error : ${error.message}`,
        500
      )
    );
  }
};

//delete order
exports.deleteOrder = async (req, res, next) => {
  try {
    const { id } = req.params;

    const order = await Order.findByIdAndDelete(id);

    if (!order) {
      return next(new Errorhandler(`Order not found`, 404));
    }
    res.status(200).json({
      success: true,
      message: `Order Deleted Successfully`,
    });
  } catch (error) {
    return next(
      new Errorhandler(`Error in delete order: ${error.message}`, 500)
    );
  }
};

//update order status and payment status
exports.updateStatus = async (req, res, next) => {
  try {

    const {id} = req.params;
    const {status, paymentStatus}  = req.body;
    
    
    const order = await Order.findById(id)
    if(!order){
        return next(new Errorhandler(`Order not found`, 404))
    }

    if(status !== '' ){
        order.orderStatus = status
    }
    if(paymentStatus !== ''){
        order.paymentStatus = paymentStatus
    }

   const orderUp =  await order.save()
    res.status(200).json({
        success : true,
        orderUp
    })

  } catch (error) {
    return next(new Errorhandler(`Error in update status Error : ${error.message}`, 500))
  }
};
