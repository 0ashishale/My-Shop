import React, { useState } from "react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LogoutIcon from "@mui/icons-material/Logout";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { FaListAlt, FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/action/userAction";
import { Avatar } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";

export default function BasicSpeedDial({ user }) {
  const navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const [open, setOpen] = useState(false)

  const actions = [
    { icon: <PersonIcon />, name: "Profile", func: account },
    { icon: <ListAltIcon />, name: "Orders", func: orders },
    {
      icon: (
        <ShoppingCartIcon
          style={{ color: cartItems.length > 1 ? "orange" : "unset" }}
        />
      ),
      name: `Cart (${cartItems.length})`,
      func: cart,
    },
    { icon: <LogoutIcon />, name: "Logout", func: loggout },
  ];

  if (user?.role === "admin") {
    actions.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  function dashboard() {
    navigate("/admin/dashboard");
  }
  function orders() {
    navigate("/orders");
  }
  function account() {
    navigate("/account");
  }
  function cart() {
    navigate("/cart");
  }
  function loggout() {
    navigate("/auth/login");
    dispatch(logout());
    alert.success("Logout Successfully");
  }

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });

  const handleStart = (e) => {
    e.preventDefault(); // Prevent default behavior of touch events
    setIsDragging(true);
    const touch = e.touches[0] || e.changedTouches[0];
    setStartPosition({ x: touch.clientX, y: touch.clientY });
  };

  const handleMove = (e) => {
    if (isDragging) {
      e.preventDefault(); // Prevent default behavior of touch events
      const touch = e.touches[0] || e.changedTouches[0];
      const deltaX = touch.clientX - startPosition.x;
      const deltaY = touch.clientY - startPosition.y;
      setPosition({ x: position.x + deltaX, y: position.y + deltaY });
      setStartPosition({ x: touch.clientX, y: touch.clientY });
    }
  };

  const handleEnd = () => {
    setIsDragging(false);
  };

  

  return (
    <div className="z-50 ">
     <Backdrop  open={open} style={{ zIndex : '10'}}/>

      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={()=>setOpen(false)}
        onOpen={()=>setOpen(true)}
        open={open}
        icon = {
          <img 
          src={user?.avatar?.url ? user.avatar.url : `Profile.png`}
          className='w-[56px] h-[56px] rounded-full' 
          alt='Profile'
          
          ></img>
      }
        direction="down"
        style={{zIndex : '30'}}
        className="fixed  right-[3vmax] top-[3vmax]"
      >
        {actions.map((action, i) => (
          <SpeedDialAction
            key={i}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.func}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
          />
        ))}
      </SpeedDial>

      {/* <div
      className={`z-50 bg-blue-500 text-white text-center leading-24 absolute top-10 cursor-grab ${
        isDragging ? 'cursor-grabbing' : ''
      }`}
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
      onMouseDown={handleStart}
      onMouseMove={handleMove}
      onMouseUp={handleEnd}
      onTouchStart={handleStart}
      onTouchMove={handleMove}
      onTouchEnd={handleEnd}
    >
       <Box sx={{ height: 320, transform: 'translateZ(0px)' }} className='absolute z-40 right-0 md:top-5'>
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        sx={{ position: 'absolute', top: 16, right: 16, zIndex : 100, objectFit: 'cover' }}
        icon=
          {user.avatar?.url ? (
            <Avatar src={user.avatar.url} />
          ) : (
            <Avatar src="Profile.png" /> 
          )}
          
            // <img src={user?.avatar ? user.avatar.url : 'Profile.png'} className='rounded-full' />
        
        direction='down'

        
        
      >
        {actions.map((action, i) => (
          <SpeedDialAction
            key={i}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.func}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
          />
        ))}
      </SpeedDial>
    </Box>
    </div> */}
    </div>
  );
}
