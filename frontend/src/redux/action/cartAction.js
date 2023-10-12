import axios from "axios"
import { ADD_TO_CART, REMOVE_FROM_CART, SAVE_SHIPPING_INFO } from "../constants/cartConstants"



export const addToCart = (productId, quantity, size) =>async (dispatch, getState)=>{
    try {
        const {data} = await axios.get(`/api/product/${productId}`)
        console.log(data);
        dispatch({
            type : ADD_TO_CART,
            payload : {
                productId : data.product._id,
                name : data.product.name,
                image : data.product.images[0].url,
                stock : data.product.stock,
                price : data.product.price,
                quantity,
                size,

            }
        })
        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
    } catch (error) {
        console.log(error);
    }

}

export const removeFromCart = (productId) =>(dispatch, getState)=>{
    try {
        dispatch({
            type : REMOVE_FROM_CART,
            payload : productId
            
        })

        localStorage.getItem('cartItems', JSON.stringify(getState().cart.cartItems))
    } catch (error) {
        console.log(error);
    }
}


export const saveShippingInfo = (data)=>(dispatch)=>{
    try {
        dispatch({
            type : SAVE_SHIPPING_INFO,
            payload : data
        })
        localStorage.setItem('shippingInfo', JSON.stringify(data))
    } catch (error) {
        console.log(error);
    }
}