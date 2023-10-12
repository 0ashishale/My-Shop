import React from "react";

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  FaFacebookSquare,
  FaWhatsappSquare,
  FaPhoneAlt,
  FaWindowClose,
} from "react-icons/fa";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import PersonIcon from "@mui/icons-material/Person";

import { ImMenu } from "react-icons/im";
import axios from "axios";
import { useAlert } from "react-alert";
import { loadUser, logout } from "../../redux/action/userAction";
import UserOptions from "./UserOptions";
import { Avatar } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Loader from "../Loader/Loader";
import { getAllProducts } from "../../redux/action/productAction";

function Navbar() {
  const navigate = useNavigate();
  const [navbar, setNavbar] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('')
  const [category, setCategory] = useState('')
  const [priceOrder, setPriceOrder] = useState('')

  const { user, loading } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);
  // const [user, setUser] = useState(null);

  const dispatch = useDispatch();

  const handleOpen = () => setOpen(!open);

  const changeBg = () => {
    if (window.scrollY > 450) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  window.addEventListener("scroll", changeBg);


  const handleSearch = (e)=>{
    e.preventDefault()
    dispatch(getAllProducts(searchQuery, category))
  }
  const handleSearchCategory = (category)=>{
    
    setCategory(category)
    dispatch(getAllProducts(searchQuery, category))
  }
 

const categories = [
  'Decoration',
  'Gift',
  'T-shirt',
  'Jersey'
]
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <>
          <Loader />
        </>
      ) : (
        <div>
          {/* "fixed z-10 top-0  w-full  bg-blue-100 flex items-center p-1 justify-around drop-shadow-xl  hover:drop-shadow-2xl h-14 w-100 " */}
          <div
            className={`${navbar ? " fixed" : "relative"}
         duration-1000 transition-all z-10 w-full  top-0 bg-gray-900 text-white flex  items-center justify-around`}
          >
            <div className="flex flex-row justify-between items-center w-[90%] m-auto ">
              <div className=" font-semibold flex ">
                <Link to="/">
                  <img className=" w-30 h-16" src="/logo.png" alt="logo" />
                </Link>
              </div>
              <div
                className={`nav-links duration-500   md:bg-transparent    md:w-full flex justify-around items-center }`}
              >
                <div className="text-gray-700  flex gap-3  items-center">
                  <div className="bg-white h-10 flex items-center rounded">
                    <form action="" onSubmit={handleSearch}>

                    <input
                      type="text"
                      placeholder="Search In My Shop"
                      className="md:w-56 w-44 outline-none px-2"
                      onChange={(e)=>setSearchQuery(e.target.value)}
                    />
                    <button type="submit" className="bg-green-300 h-8 bg-opacity-75 hover:bg-green-700 px-2 mr-1 hover:text-white transition-all duration-300 rounded">
                      <SearchSharpIcon />
                    </button>
                    </form>
                  </div>
                  <div>
                    <select
                      name=""
                      id=""
                      className="outline-none p-1 rounded hover:bg-green-600 hover:text-white cursor-pointer transition-all duration-300"
                      onClick={(e)=>handleSearchCategory(e.target.value)}
                    >
                      <option value=''>Categories</option>
                      {categories.map((item, i)=>(
                        <option value={item}>{item}</option>
                      ))}
                      

                    </select>
                  </div>
                </div>

                <div className="md:flex hidden items-center gap-2 cursor-pointer hover:text-green-600 transition-all duration-300">
                  {!loading && user && user ? (
                    <>
                      <Link to="/account" className="flex items-center gap-2">
                        {user.avatar?.url ? (
                          <Avatar src={user.avatar.url} />
                        ) : (
                          <Avatar src="Profile.png" />
                        )}
                        Hello, {user?.name}
                      </Link>
                    </>
                  ) : (
                    <>
                      <PersonIcon />
                      <Link to="/auth/login" className="hover:text-gray-200">
                        Login
                      </Link>{" "}
                      |{" "}
                      <Link to="/auth/signup" className="hover:text-gray-200">
                        SignUp
                      </Link>
                    </>
                  )}
                </div>

                <div className="cursor-pointer md:block hidden hover:text-green-600 transition-all duration-300">
                  <div>
                    <Link to={`/cart`} className="flex items-center">
                      <ShoppingCartIcon />
                      <div className={` ${user ? 'flex': 'hidden'} relative bottom-3 right-2 bg-green-500 rounded-full w-4 h-4  items-center justify-center`}>
                       {user && <span className="text-sm font-semibold">{cartItems?.length}</span>}
                        
                      </div>
                    </Link>
                  </div>
                </div>
              </div>

              {/* <div
            onClick={handleOpen}
            name="menu"
            className="text-3xl cursor-pointer fixed right-2 top-2 md:hidden block z-30"
          >
            {open ? <FaWindowClose /> : <ImMenu />}
          </div> */}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
