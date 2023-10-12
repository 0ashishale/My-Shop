import React, { useState } from "react";
import StepperSteps from "./StepperSteps";
import { Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import CallIcon from "@mui/icons-material/Call";
import AddLocationAltSharpIcon from "@mui/icons-material/AddLocationAltSharp";
import ApartmentSharpIcon from "@mui/icons-material/ApartmentSharp";
import HomeSharpIcon from "@mui/icons-material/HomeSharp";
import AdsClickIcon from "@mui/icons-material/AdsClick";
import {useAlert} from 'react-alert'
import {useDispatch, useSelector} from 'react-redux'
import { saveShippingInfo } from "../../redux/action/cartAction";
import {useNavigate} from 'react-router-dom'

const Shipping = () => {

const {shippingInfo} = useSelector((state)=>state.cart)
  const alert= useAlert()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [formData, setFormData]=useState({
    name : shippingInfo?.name ,
    number : shippingInfo?.number,
    district : shippingInfo?.district,
    city : shippingInfo?.city,
    area : shippingInfo?.area,
    address : shippingInfo?.address

  })
  const [numberError, setNumberError] = useState(false)

  const {name, number, district, city, area, address} = formData;

  const handleChange= (e)=>{
        const {name, value} = e.target;
        setFormData({
          ...formData,
          [name] : value
        })

        
  }

  const handleShippingDetails = (e) => {
    e.preventDefault()

    if(number.length !== 10){
      setNumberError(true)
        return alert.error(`Number must be 10 digits`)
    }
    console.log(formData);
    dispatch(saveShippingInfo(formData))
    navigate('/confirm/order')
    

  };
  return (
    <div>
      <StepperSteps activeStep={0} />
      <div className=" mt-5">
        <h2 className="border-b-[2px] p-2 w-40 mx-auto text-center">
          Delivery Address
        </h2>

        <form
          onSubmit={handleShippingDetails}
          className="w-96 mx-auto mt-5 border-2 p-5"
        >
          <div className="flex flex-col gap-1 rounded-sm mb-2">
            <h2 className="flex gap-1 items-center font-thin ">
              <PersonIcon /> Full Name *
            </h2>
            <input
              className="outline-none border-2 py-1 px-2"
              type="text"
              placeholder="Input full name"
              name="name"
              value={name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col gap-1 rounded-sm mb-2">
            <h2 className="flex gap-1 items-center font-thin ">
              <CallIcon /> Mobile Number *
            </h2>
            <input
              className="outline-none border-2 py-1 px-2"
              type="number"
              placeholder="Input mobile number"
              name="number"
              value={number}
              onChange={handleChange}
              required
            />
            {numberError && <span className="text-[12px] text-red font-thin">Number must be 10 digits *</span>}
            <span></span>
          </div>
          <div className="flex flex-col gap-1 rounded-sm mb-2">
            <h2 className="flex gap-1 items-center font-thin ">
              <AddLocationAltSharpIcon /> District *
            </h2>
            <input
              className="outline-none border-2 py-1 px-2"
              type="text"
              placeholder="Input district"
              name="district"
              value={district}
              onChange={handleChange}
               required
            />
          </div>
          <div className="flex flex-col gap-1 rounded-sm mb-2">
            <h2 className="flex gap-1 items-center font-thin ">
              <ApartmentSharpIcon /> City *
            </h2>
            <input
              className="outline-none border-2 py-1 px-2"
              type="text"
              placeholder="Input city"
              name="city"
              value={city}
              onChange={handleChange}
               required
            />
          </div>
          <div className="flex flex-col gap-1 rounded-sm mb-2">
            <h2 className="flex gap-1 items-center font-thin ">
              <AdsClickIcon /> Area *
            </h2>
            <input
              className="outline-none border-2 py-1 px-2"
              type="text"
              placeholder="Input area"
              name="area"
              value={area}
              onChange={handleChange} 
              required
            />
          </div>
          <div className="flex flex-col gap-1 rounded-sm mb-2">
            <h2 className="flex gap-1 items-center font-thin ">
              <HomeSharpIcon />Full Address *
            </h2>
            <input
              className="outline-none border-2 py-1 px-2"
              type="text"
              placeholder="Eg. house no. /street /area "
               name="address"
              value={address}
              onChange={handleChange}
             required
            />
          </div>
          <button
            type="submit"
            className="text-center text-white rounded-sm bg-orange-700 py-2 w-full mt-5 hover:bg-orange-800 transition-all duration-300"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default Shipping;
