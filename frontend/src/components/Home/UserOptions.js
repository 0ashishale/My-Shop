import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import ListAltIcon from '@mui/icons-material/ListAlt';import { FaListAlt, FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/action/userAction';




export default function BasicSpeedDial({user}) {
const navigate = useNavigate();
const alert = useAlert()
const dispatch= useDispatch()
// const {user} = useSelector((state)=>state.user)

    const actions = [
        { icon: < PersonIcon/>, name: 'Profile', func : account },
        { icon: <ListAltIcon />, name: 'Orders' , func : orders},
        { icon: <ShoppingCartIcon />, name: 'Cart',func : cart },
        { icon: <LogoutIcon />, name: 'Logout' , func : loggout},
      ];

    if(user?.role==='admin'){
        actions.unshift({
            icon : <DashboardIcon />, name : 'Dashboard', func : dashboard
        })
    }

    function dashboard(){
        navigate('/admin/dashboard')
    }
    function orders(){
        navigate('/orders')
    }
    function account(){
        navigate('/account')
    }
    function cart(){
        navigate('/cart')
      

    }
    function loggout(){
        navigate('/auth/login')
        dispatch(logout())
        alert.success("Logout Successfully");
        
    }
  return (
    <div className='z-50 fixed'>

    <Box sx={{ height: 320, transform: 'translateZ(0px)' }} className='fixed right-0'>
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        sx={{ position: 'absolute', top: 16, right: 16, zIndex : 100 }}
        icon={
            <img src={'Profile.png'} />
        }
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
    </div>
  );
}