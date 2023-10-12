import React, { useEffect } from "react";
import Card from "../Product/Card";
import { Link } from "react-router-dom";
import ProductCard from "../Product/ProductCard";
import {useDispatch, useSelector} from 'react-redux'
import { getAdminProducts, getFeaturedProducts } from "../../redux/action/productAction";
import { getLikedProducts } from "../../redux/action/userAction";

function Home() {
const dispatch = useDispatch();

const {products, error} = useSelector((state)=>state.products)
const {products : featuredProducts} = useSelector(state=>state.featured)

useEffect(()=>{
  dispatch(getAdminProducts())
  dispatch(getFeaturedProducts())
  dispatch(getLikedProducts())

}, [])



  return (
    <div className="bg-gray-100 py-8 shadow-xl">
      <div className="ml-10 mt-10 mb-10">
        <h1 className="mb-4  text-xl underline [text-shadow:0px_4px_4px_#00000040] ">
          Featured Products:
        </h1>

        <a
          href=""
          className=" bg-blue-100 px-3 py-2 rounded hover:bg-blue-300 duration-100"
        >
          View All &#8594;{" "}
        </a>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-6 ">
      {featuredProducts && featuredProducts.map((product, key)=>(
        <ProductCard product={product} key={product._id} />
      ))}
      </div>
      <div className="ml-10 mt-10 mb-10">
        <h1 className="mb-4  text-xl underline [text-shadow:0px_4px_4px_#00000040] ">
          All Products:
        </h1>

        <a
          href=""
          className=" bg-blue-100 px-3 py-2 rounded hover:bg-blue-300 duration-100"
        >
          View All &#8594;{" "}
        </a>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-6 ">
      {products && products.map((product, key)=>(
        <ProductCard product={product} key={product._id} />
      ))}
      </div>

    </div>
  );
}

export default Home;
