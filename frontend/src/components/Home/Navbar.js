import React from "react";

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import {
  FaFacebookSquare,
  FaWhatsappSquare,
  FaPhoneAlt,
  FaWindowClose,
} from "react-icons/fa";
import { ImMenu } from "react-icons/im";
import axios from "axios";
import {useAlert} from 'react-alert'
import { loadUser, logout } from "../../redux/action/userAction";
import UserOptions from './UserOptions'

function Navbar() {
  const navigate = useNavigate();
  const [navbar, setNavbar] = useState(false);
  const [open, setOpen] = useState(false);

  // const [user, setUser] = useState(null);

  const dispatch = useDispatch()
const alert = useAlert()
  const { error, isAuthenticated : success, user} = useSelector((state)=>state.user)
console.log(user);
  const fetchUser = async () => {
    try {
 
      const res = dispatch(loadUser())
    
    } catch (error) {
      console.log(error);
    }
  };
useEffect(()=>{
  fetchUser();
}, [])
  useEffect(() => {
   
    if(error){
      alert.error(error)
    }
    // if(success){
    //   alert.success("Load User successfully.")
    // }

  }, [alert, error, dispatch, success]);

  const handleOpen = () => setOpen(!open);

  const changeBg = () => {
    if (window.scrollY >= 56) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  window.addEventListener("scroll", changeBg);

  const logoutSubmit = async() =>{
    try {
      dispatch(logout())
     } catch (error) {
       console.error('Error during logout:', error);
     }

 
  
  };

  return (
    <div>
      {/* "fixed z-10 top-0  w-full  bg-blue-100 flex items-center p-1 justify-around drop-shadow-xl  hover:drop-shadow-2xl h-14 w-100 " */}
      <div
        className={`${
          navbar ? "md:bg-opacity-60, text-slate-800  " : "md:bg-opacity-0"
        } duration-1000  fixed z-10 top-0  w-full md:bg-slate-300 flex  items-center p-1 justify-around drop-shadow-xl  hover:drop-shadow-2xl h-14  `}
      >
        <div className="flex flex-row justify-around w-full ">
          <div className=" font-semibold flex ">
            <img
              className=" w-30 h-16 md:cursor-pointer absolute z-30 md:top-0 top-0 left-0"
              src="/logo.png"
              alt="logo"
            />
          </div>
          <div
            className={`nav-links duration-500 md:static absolute   bg-white   md:bg-transparent md:min-h-fit  min-h-[55vh] left-0  top-[-100%] md:w-full w-screen flex justify-center items-center px-5 ${
              open ? "top-50" : "top-[-490px]"
            }`}
          >
            <ul className="    flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-8">
              <Link to="/" className="hover:text-slate-600">
                Home
              </Link>
              <Link to="/About" className="  hover:text-slate-600 ">
                About Us
              </Link>
              <Link to="/Services" className="  hover:text-slate-600">
                Services
              </Link>
              <Link to="/Blog" className="  hover:text-slate-600">
                Blog
              </Link>
              <Link to="/Contactus" className="  hover:text-slate-600">
                Contact Us
              </Link>

              {user && user ? (
                <>
                  <Link to="/profile" className="">
                    {user.name}
                  </Link>
                  <button
                    className="hover:text-slate-600"
                    onClick={logoutSubmit}
                  >
                    Log Out
                  </button>
                </>
              ) : (
                <Link to="/auth/login" className="hover:text-slate-600">
                  <button>Login</button>
                </Link>
              )}
            </ul>
          </div>

          <div className=" md:flex flex-row items-center hidden gap-6">
            <a className=" hover:text-slate-600 " href="">
              {" "}
              <FaFacebookSquare />{" "}
            </a>
            <a className=" hover:text-slate-600 " href="">
              {" "}
              <FaWhatsappSquare />{" "}
            </a>
            <a className=" hover:text-slate-600 flex items-center " href="">
              <FaPhoneAlt />{" "}
              <p className="ml-2">
                <a href="tel://+9779824586999">+9779824586999</a>{" "}
              </p>
            </a>
       
        
           
          </div>
          {/* <UserOptions/> */}
          <div
            onClick={handleOpen}
            name="menu"
            className="text-3xl cursor-pointer fixed right-2 top-2 md:hidden block z-30"
          >
            {open ? <FaWindowClose /> : <ImMenu />}
          </div>
         
        </div>
      </div>
    </div>
  );
}

export default Navbar;
