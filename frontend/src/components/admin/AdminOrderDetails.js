import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Dialog, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  createOrder,
  getOrderDetails,
  updateOrderStatus,
} from "../../redux/action/orderAction";
import { useAlert } from "react-alert";
import {
  CLEAR_ERRORS,
  CREATE_ORDER_RESET,
  UPDATE_STATUS_RESET,
} from "../../redux/constants/orderConstants";

const AdminOrderDetails = () => {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { order } = useSelector((state) => state.orderDetails);
  const {} = useSelector((state) => state.cart);
  const { error, loading, isUpdated } = useSelector((state) => state.order);


  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo")) || "";
  const shippingInfo = order?.shippingInfo;
  const cartItems = order?.orderItems;

  const address = `${shippingInfo?.address} , ${shippingInfo?.district}, ${shippingInfo?.city}, ${shippingInfo?.area}`;

  const subTotal = cartItems?.reduce(
    (acc, item) => (acc = acc + item.price * item.quantity),
    0
  );

  const shippingFee = order?.shippingFee;

  const total = order?.totalPrice;
  const created = new Date(order?.createdAt);
  const onlyDate = `${created.getFullYear()}- ${created.getMonth()} - ${created.getDate()} `;
  const time = created.getTime();



  
  const handleUpdate = (e) => {
    e.preventDefault();
    const myForm = new FormData()
    myForm.set('status', status)
    myForm.set('paymentStatus', paymentStatus)
    
    dispatch(updateOrderStatus(id, myForm));
  };





  
  useEffect(() => {
    dispatch(getOrderDetails(id));
    if (error) {
      alert.error(error);
      dispatch({ type: CLEAR_ERRORS });
    }
    if (isUpdated) {
      alert.success(`Status Updated`);
      dispatch({type : UPDATE_STATUS_RESET})
      navigate(`/admin/orders`)
    }
  }, [dispatch, alert, error, isUpdated]);
  return (
    <div className="min-h-[50vh] w-[90%] md:text-base text-sm mx-auto">
      <Typography className="border-b-2 border-black w-fit pt-5">
        Update Status
      </Typography>
      <div className="flex pt-5 gap-5 text-center">
        <div className="border-2 flex gap-2">
          <select
            name=""
            id=""
            required
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">Order Status</option>
            {order?.orderStatus === "Processing" && (
              <option value="Shipped">Shipped</option>
            )}

            {order?.orderStatus === "Shipped" && (
              <option value="Delivered">Delivered</option>
            )}
          </select>
          <div className="border-2 flex gap-2">
          {order?.orderStatus === false && <b>efa</b>}
          <select
            id=""
            required
            onChange={(e) => setPaymentStatus(e.target.value)}
          >
            <option value="">Payment Status</option>
            {order?.paymentStatus === "false" && (
              <option value="true">Paid</option>
            )}
            {order?.paymentStatus === "true" && (
              <option value="false">Cancle Paid</option>
            )}
          </select>
        </div>
          <Button
            disabled={loading ? true : false}
            onClick={handleUpdate}
          >
            Update
          </Button>
        </div>
        
      </div>
      <div className="md:grid grid-cols-4 mt-5">
        <div className="col-span-3  flex flex-col gap-10 border-r-2">
          <div>
            <Typography className="border-b-2 w-fit">
              Shipping Details:
            </Typography>

            <div className="md:ml-5 mt-2 md:text-base text-sm flex flex-col gap-2">
              <div className="flex gap-5">
                <p className="">Name:</p>
                <span className="font-semibold">{shippingInfo?.name}</span>
              </div>
              <div className="flex gap-5">
                <p>Ph. Number:</p>
                <span className="font-semibold">{shippingInfo?.number}</span>
              </div>
              <div className="flex gap-5">
                <p>Address:</p>
                <span className="font-semibold">{address}</span>
              </div>
            </div>
          </div>
          <div className="mt-10 ">
            <Typography className="border-b-2 font-semibold w-fit ">
              Your Cart Items:
            </Typography>

            <div className="mt-5 md:ml-5 overflow-y-auto">
              <div className="grid grid-cols-6 mb-5 text-sm ">
                <p className=" col-span-1 underline">Product</p>
                <p className="col-span-2 underline">Name</p>
                <p className="col-span-1 underline">Quantity</p>
                <p className="col-span-2 underline">Price</p>
              </div>
              {cartItems &&
                cartItems.map((item) => (
                  <div className="grid grid-cols-6 items-center text-sm mb-3 border-b-2">
                    <img
                      src={item.image}
                      alt=""
                      className="col-span-1 h-16 w-16"
                    />
                    <p className="col-span-2 font-semibold ">{item.name}</p>
                    <p className="col-span-1 ">Qty: {item.quantity}</p>
                    <div className="col-span-2 font-semibold flex items-center gap-1">
                      <p>
                        {item.quantity} X Rs. {item.price} =
                      </p>
                      <p className="text-base">
                        Rs. {item.quantity * item.price}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
            <div className="md:grid grid-cols-6">
              <div className="col-span-4 md:block hidden"></div>
              <div className="col-span-2 border-t-2 flex gap-5 md:justify-start justify-end text-orange-600">
                <Typography>Subtotal </Typography>
                <b className="">Rs. {subTotal && subTotal}</b>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-1 flex flex-col justify-center gap-5">
          <Typography
            className="border-b-2 font-semibold text-lg text-center"
            variant="h5"
          >
            Order Summery:
          </Typography>
          <div className="px-5 flex flex-col gap-2">
            <div className="flex justify-between ">
              <Typography>Subtotal ({cartItems?.length} items) </Typography>
              <p>Rs. {subTotal}</p>
            </div>
            <div className="flex justify-between ">
              <Typography>Shipping Fee</Typography>
              <p>Rs. {shippingFee}</p>
            </div>
            <div className="flex justify-between font-semibold text-orange-600 mt-5 py-2 border-t-2 border-black ">
              <Typography>Total </Typography>
              <p>Rs. {total}</p>
            </div>
            {/* <button onClick={handleClickOpen} className="bg-orange-500 py-1 rounded text-white md:text-base text-sm hover:bg-orange-600">Place Order</button> */}
            <div>
              <div className="flex justify-between font-semibold mt-5 py-2 border-t-2 border-black ">
                <Typography>Order Status: </Typography>
                <p>{order?.orderStatus}</p>
              </div>
              <div className="flex justify-between ">
                <Typography>Payment Status:</Typography>
                <p className="font-semibold">
                  {order?.paymentStatus === "true" ? "Paid." : "Not Paid."}
                </p>
              </div>
              <div className="flex py-2 justify-between border-b-2">
                <Typography>Ordered Date:</Typography>
                <p className="font-semibold">{onlyDate}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrderDetails;
