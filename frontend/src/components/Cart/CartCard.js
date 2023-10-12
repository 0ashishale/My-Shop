import React from 'react'

const CartCard = ({item, deleteCartItem}) => {
  return (
    <div className='flex gap-3'>
        <img src={item.image} alt={item.name} className='h-20 w-20' />
        <div className='text-sm font-thin'>
           <p className='font-semibold'>{item.name}</p>
           {/* <p className='flex gap-3'>Price: Rs.{item.price}  {item.size && <p>Size: {item.size}</p>}</p> */}
           
           <button onClick={()=>deleteCartItem(item.productId)} className='text-red-600 hover:text-red-700'>Remove</button>
           
         </div>
    </div>
  )
}

export default CartCard