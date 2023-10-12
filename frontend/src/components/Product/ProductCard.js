import React, { useEffect, useState } from "react";
import { Rating } from "@mui/material";
import { Link } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {  useSelector } from "react-redux";

const ProductCard = ({ product }) => {

  const options = {
    value: product?.ratings,
    precision: 0.5,
    readOnly: true,
  };

 
  return (
    <div className="p-2 bg-[#EEEBE8] w-48 rounded">
      <div className="flex flex-col">
        <Link to={`/product/${product._id}`}>
          <img
            src={product?.images[0].url}
            alt={product?.name}
            className="rounded h-40 mx-auto"
          />
          <div className="flex flex-col mt-2">
            <p className="text-sm tracking-wide">{product?.name}</p>
            <span className="text-[#502E8B] text-base font-semibold">
              Rs.{product?.price}
            </span>
            {/* <span className='text-gray-500 line-through tracking-widest text-sm'>Rs.700</span> */}
            <div className="flex items-center gap-2">
              <Rating {...options} size="small" />{" "}
              <span className="text-sm text-gray-500">
                ({product?.numOfReviews} reviews)
              </span>
            </div>
          </div>
          <div>
            
           
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
