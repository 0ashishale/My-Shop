import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartCard from "./CartCard";
import { addToCart, removeFromCart } from "../../redux/action/cartAction";
import { Link } from "react-router-dom";
import { Pagination } from "@mui/material";
import { useAlert } from "react-alert";

const Cart = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const alert = useAlert()

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const lastIndex = currentPage * itemsPerPage;
  const firtsIndex = lastIndex - itemsPerPage;

  const displayItems = cartItems.slice(firtsIndex, lastIndex);

  

  const deleteCartItem = (id) => {
    dispatch(removeFromCart(id))
    alert.success(`Item removed from cart.`)
    
  };

  const handleDecrement = (id, quantity) => {
    const newQty = quantity - 1;
    if (quantity < 1) {
      return;
    }

    dispatch(addToCart(id, newQty));
  };

  const handleIncrement = (id, quantity, stock) => {
    const newQty = quantity + 1;

    if (quantity > stock) {
      return;
    }

    dispatch(addToCart(id, newQty));
  };

 

  return (
    <div>
      <div className="cartPage mt-3 min-h-[70vh]">
        <div className="cartHeader bg-orange-500 md:w-[90%] mx-auto text-white grid grid-cols-4 gap-4 font-roboto px-2 py-1">
          <p className="col-span-2">Product</p>
          <p className="col-span-1">Quantity</p>
          <p className="col-span-1 flex justify-end pr-[2vmax]">Subtotal</p>
        </div>

        {displayItems &&
          displayItems.map((item) => (
            <div className="cartHeader  md:w-[90%] mx-auto  grid grid-cols-4 gap-4  px-2 py-1">
              <div className="col-span-2">
                <CartCard item={item} deleteCartItem={deleteCartItem} />
              </div>
              <div className="col-span-1 flex items-center font-thin">
                <button
                  onClick={() => handleDecrement(item.productId, item.quantity)}
                  className={`bg-green-400 text-white rounded py-1 px-2 hover:bg-green-600 transition-all duration-300`}
                >
                  -
                </button>
                <input
                  type="number"
                  value={item.quantity}
                  className="w-8 text-center"
                  readOnly
                />
                <button
                  onClick={() =>
                    handleIncrement(item.productId, item.quantity, item.stock)
                  }
                  className="bg-green-400 text-white py-1 px-2 rounded hover:bg-green-600 transition-all duration-300"
                >
                  +
                </button>
              </div>
              <div className="col-span-1 flex items-center justify-end pr-[2vmax] font-thin ">
                <span>Rs. {item.price * item.quantity}</span> 
              </div>
            </div>
          ))}
      

        <div className="md:grid md:grid-cols-3 md:w-[90%] w-full mx-auto mt-[4vmax]">
          <div className="col-span-2 ">
          <Pagination
            count={Math.ceil(cartItems.length / itemsPerPage)}
            page={currentPage}
            onChange={(e, page) => setCurrentPage(page)}
          />
          </div>
          <div className="col-sapn-1 border-t-2  md:mt-0 mt-3 justify-end border-orange-500 pt-[1vmax] mx-[2vmax] ">
            <div className="flex justify-between">
              <p className="font-semibold">Gross Total</p>
              <p>{`Rs. ${cartItems.reduce(
                (acc, item) => acc + item.quantity * item.price,
                0
              )}`}</p>
            </div>

            <div className="mt-[2vmax] flex justify-end">
              <button className="bg-orange-500 hover:bg-orange-600 rounded ml-2 w-[15vmax] py-2  text-white ">
                <Link to={`/shipping`}>Check Out</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
