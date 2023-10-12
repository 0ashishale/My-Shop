import React from 'react'
import { Avatar } from '@mui/material'
import {Rating} from '@mui/material'
import PersonIcon from '@mui/icons-material/Person';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const ReviewCard = ({review}) => {
  return (
    <div className='border px-2 pb-4 pt-2'>
        <div>

        <Rating value={review.rating} size='small'/>
        <div className='flex flex-col gap-2'>
        <span className='text-gray-700 text-sm'><PersonIcon/> by {review.name}</span>

        <p className='ml-3  '>{review.comment}</p>

        <div>
          {review && review?.images.map((image)=>(
            <img src={image.url} alt="" className='h-20' />
          ))}
        </div>
    
        </div>
        {/* <button className='m-3 text-gray-700 text-sm'><FavoriteBorderIcon /> Like</button> */}
        </div>
        {/* <span className='text-sm text-gray-700'>2month ago</span> */}
    </div>
  )
}

export default ReviewCard