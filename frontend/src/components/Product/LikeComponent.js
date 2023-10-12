// import React, {useEffect, useState} from "react";
// import { useDispatch, useSelector } from "react-redux";
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import {  getLikedProducts, likeProduct } from "../../redux/action/userAction";
// import { getProductDetails } from "../../redux/action/productAction";


// const LikeComponent = ({product}) => {

//     const {products, loading} = useSelector((state)=>state.likedProducts)
//     const {isLiked} = useSelector((state)=>state.like)
//     const [like, setLike] = useState(false)
//     const dispatch = useDispatch()

//     const likeHandler =()=>{
//         dispatch(likeProduct(product._id))
//     }
//     useEffect(() => {
//         if (!loading ) {
//           for (let i = 0; i < products?.length; i++) {
//             if (products[i].product === product._id) {
//               setLike(true);
//               break;
//             }
//           }
//         }
      

//       }, [loading, product, products]);

    
//   return (
//     <div>
//       <button className="cursor-pointer text-sm" onClick={likeHandler}>
//         {like ? (
//           <FavoriteIcon fontSize="small" className="text-red-600"/>
//         ) : (
//           <FavoriteBorderIcon fontSize="small"  />
//         )}{" "}
//         {product?.likes} Like
//       </button>
//     </div>
//   );
// };


// export default LikeComponent;

import React from 'react'

const LikeComponent = () => {
  return (
    <div>LikeComponent</div>
  )
}

export default LikeComponent
