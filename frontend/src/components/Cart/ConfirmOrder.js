import React, { useEffect, useState } from "react";
import StepperSteps from "./StepperSteps";
import { useSelector, useDispatch } from "react-redux";
import { Button, Dialog, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { createOrder } from "../../redux/action/orderAction";
import { useAlert } from "react-alert";
import { CLEAR_ERRORS, CREATE_ORDER_RESET } from "../../redux/constants/orderConstants";

const ConfirmOrder = () => {
const [open, setOpen] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const alert = useAlert()
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const {isCreated, error, loading} = useSelector((state)=>state.order)
  const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo')) || ''
 

  const address = `${shippingInfo?.address} , ${shippingInfo?.district}, ${shippingInfo?.city}, ${shippingInfo?.area}`;

const  subTotal = cartItems?.reduce(
    (acc, item) => (acc = acc + item.price * item.quantity),
    0
  );

  const shippingFee = 100;

  const total = subTotal + shippingFee;

  const order = {
    shippingInfo,
    orderItems : cartItems,
    itemsPrice : orderInfo.subTotal,
    shippingFee : orderInfo.shippingFee,
    totalPrice : orderInfo.total
    
  }
  const handlePlaceOrder = ()=>{

    const data = {
        subTotal,
        shippingFee,
        total
    }
    dispatch(createOrder(order))
    sessionStorage.setItem("orderInfo", JSON.stringify(data))
    
   
  }

  const handleClickOpen = ()=>{
    setOpen(true)
  }

  const handleClose = ()=>{
    setOpen(false)
  }

  useEffect(()=>{
    if(error){
        alert.error(error)
        dispatch({type : CLEAR_ERRORS})
    }
    if(isCreated){
        alert.success(`Your is placed Successfully.`)
        dispatch({type : CREATE_ORDER_RESET})
        navigate('/order/success')
    }
}, [error, alert, isCreated])
  return (
    <div className="min-h-[50vh] w-[90%] md:text-base text-sm mx-auto">
      <StepperSteps activeStep={1} />

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
            <button onClick={handleClickOpen} className="bg-orange-500 py-1 rounded text-white md:text-base text-sm hover:bg-orange-600">Place Order</button>

          </div>


        </div>
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Payment on delivery ?
        </DialogTitle>
        <DialogTitle className="underline text-orange-600">Total: Rs.{total}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You can use Online payment or Cash payment on delivery.
          </DialogContentText>
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancle order</Button>
          <Button onClick={handlePlaceOrder} autoFocus disabled= {loading ? true : false}>
            Confirm Order
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ConfirmOrder;
