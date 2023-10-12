import React from 'react'
import ErrorOutlineSharpIcon from '@mui/icons-material/ErrorOutlineSharp';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';



const PageNotFound = () => {
  return (
    <div className='flex flex-col justify-center gap-5 items-center h-[70vh]'>
        <div className='flex flex-col items-center'>

<ErrorOutlineSharpIcon fontSize='large' className='text-red-500'/>


<Typography>!Opps. Page Not Found</Typography>
        </div>

<button className='bg-black text-white py-1 px-2 rounded hover:bg-gray-800'><Link to={'/'}>Home</Link></button>
    </div>
  )
}

export default PageNotFound