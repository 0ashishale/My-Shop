import React from 'react'
import CheckCircleOutlineSharpIcon from '@mui/icons-material/CheckCircleOutlineSharp';
import { Typography } from '@mui/material';
import { Link} from 'react-router-dom';


const OrderSuccess = () => {

  return (
    <div className='flex flex-col gap-2 h-[70vh] justify-center items-center'>
            <CheckCircleOutlineSharpIcon  className='text-green-600' fontSize='large'/>
            <Typography>Your order has been placed successfully.</Typography>
            <Typography fontSize='small'>Thank you for shopping in My Shop.</Typography>
            <Typography fontSize='small'>Please Review This Product.</Typography>
            <Link to={`/orders`}>
            <button className='bg-gray-800 text-white w-52 rounded py-1 hover:bg-black'>View Order</button>
            </Link>
    </div>
  )
}

export default OrderSuccess