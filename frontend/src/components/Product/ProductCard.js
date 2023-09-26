import React from 'react'
import { Rating } from '@mui/material';

const product = {
    name : 'product',
    url : 'https://np-live-21.slatic.net/kf/S0f0c6c006f364fed9911723609f6e9f85.jpg_300x0q75.webp'
}
const ProductCard = () => {
  return (
    <div className='p-2 bg-[#EEEBE8] w-48 rounded'>
        <div className='flex flex-col gap-4'>
                    <img src={product.url} alt={product.name}  className='rounded'/>
                    <div className='flex flex-col'>
                        <p className='text-sm tracking-wide'>addidas best product yello color</p>
                        <span className='text-[#502E8B] text-base font-semibold'>Rs. 500</span>
                        <span className='text-gray-500 line-through tracking-widest text-sm'>Rs.700</span>
                        <div className='flex items-center gap-2'>

                        <Rating value={4} size='small'/> <span className='text-sm text-gray-500'>(No rating)</span>
                        </div>
                    </div>


        </div>
    </div>
  )
}

export default ProductCard