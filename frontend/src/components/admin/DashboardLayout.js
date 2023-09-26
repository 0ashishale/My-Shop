import React from "react";
import Sidebar from "./Sidebar";
import { Typography } from "@mui/material";

import Navbar from "../Home/Navbar";
import { Link } from "react-router-dom";

import {Line , Doughnut } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
  } from 'chart.js';
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

const DashboardLayout = ({children}) => {


  const doughnutState = {
    labels : ["Out of Stock", 'InStock'],
      datasets :[
        {
            backgroundColor: ["#00A6B4", "#6800B4"],
            hoverBackgroundColor: ["#4B5000", "#35014F"],
            data: [10, 2],
          },
    ]
 
  };

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, 999999],
      },
    ],
  }
  return (
    <div>
      <div className="grid grid-cols-6 grid-flow-col w-[100vw] max-w-[100%]  ">
        <Sidebar className="col-span-1" />
        <div className="col-span-5 bg-gray-200 w-full p-6 z-1">
        {children}
          {/* <div className="container flex  flex-col justify-center  gap-5">
            <Typography className="md:text-2xl text-center p-3 !font-bold ">
              Dashboard
            </Typography>
            <div className="total amount bg-blue-950 p-3">
              <h1 className="text-center text-white">Total Amount</h1>
              <h1 className="text-center text-white">Rs. 999999999</h1>
            </div>

            <div className="grid grid-cols-2">
              <div className="col-spa-1 flex flex-col justify-center items-center gap-7">

        

            <div>
              <Doughnut data={doughnutState} />
            </div>

              </div>

              <div className="col-span-1">
                      <Line data={lineState} className="!h-96" />
              </div>
            </div>
            <div className="circle_container flex gap-12 mx-auto mt-12 ">
              <Link to={"/admin/products"}>
                <div className="bg-gray-800 h-32 w-32 rounded-full flex flex-col items-center justify-center text-center text-white text-xl gap-3">
                  <h1>Products</h1>
                  <p className="text-2xl">50</p>
                </div>
              </Link>
              <Link to={"/admin/products"}>
                <div className="bg-gray-800 h-32 w-32 rounded-full flex flex-col items-center justify-center text-center text-white text-xl gap-3">
                  <h1>Products</h1>
                  <p className="text-2xl">50</p>
                </div>
              </Link>
              <Link to={"/admin/products"}>
                <div className="bg-gray-800 h-32 w-32 rounded-full flex flex-col items-center justify-center text-center text-white text-xl gap-3">
                  <h1>Products</h1>
                  <p className="text-2xl">50</p>
                </div>
              </Link>
            </div>
          </div> */}
        </div>
        
      </div>
    </div>
  );
};

export default DashboardLayout;
