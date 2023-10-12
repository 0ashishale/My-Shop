import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import { Typography } from "@mui/material";

import Navbar from "../Home/Navbar";
import { Link } from "react-router-dom";

import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import DashboardLayout from "./DashboardLayout";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../redux/action/adminAction";
import { getAdminProducts } from "../../redux/action/productAction";
import { getAllOrders } from "../../redux/action/orderAction";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = ({ children }) => {

  const {users} = useSelector((state)=>state.users)
  const {products} = useSelector((state)=>state.products)
  const {orders} = useSelector(state=>state.allOrders)
const dispatch = useDispatch()

let outOfStock = 0
products?.forEach((item)=>{
  if(item.stock === 0){
    outOfStock = outOfStock + 1
  }
})
  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, products.length - outOfStock],
      },
    ],
  };

  let totalAmount = 0;
  orders?.forEach((item)=>{
    totalAmount += item.totalPrice
  })



  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, totalAmount],
      },
    ],
  };

  useEffect(()=>{
      dispatch(getAllUsers())
      dispatch(getAdminProducts())
      dispatch(getAllOrders())
  }, [])
  return (
    <DashboardLayout>
      <div className="container flex  flex-col justify-center  gap-5">
        <Typography className="md:text-2xl text-center p-3 !font-bold ">
          Dashboard
        </Typography>
        <div className="total amount bg-blue-950 p-3">
          <h1 className="text-center text-white">Total Amount</h1>
          <h1 className="text-center text-white">Rs. {totalAmount}</h1>
        </div>

        <div className="grid grid-cols-5">
          <div className="col-span-2 flex flex-col justify-center items-center gap-7">
            <div>
              <Doughnut data={doughnutState} />
            </div>
          </div>

          <div className="col-span-3">
            <Line data={lineState} className="!h-96" />
          </div>
        </div>
        <div className="circle_container flex gap-12 mx-auto mt-12 ">
          <Link to={"/admin/products"}>
            <div className="bg-gray-800 h-32 w-32 rounded-full flex flex-col items-center justify-center text-center text-white text-xl gap-3">
              <h1>Users</h1>
              <p className="text-2xl">{users?.length}</p>
            </div>
          </Link>
          <Link to={"/admin/products"}>
            <div className="bg-gray-800 h-32 w-32 rounded-full flex flex-col items-center justify-center text-center text-white text-xl gap-3">
              <h1>Products</h1>
              <p className="text-2xl">{products?.length}</p>
            </div>
          </Link>
          <Link to={"/admin/products"}>
            <div className="bg-gray-800 h-32 w-32 rounded-full flex flex-col items-center justify-center text-center text-white text-xl gap-3">
              <h1>Orders</h1>
              <p className="text-2xl">{orders?.length}</p>
            </div>
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
