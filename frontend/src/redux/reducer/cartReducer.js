import { ADD_TO_CART, REMOVE_FROM_CART, SAVE_SHIPPING_INFO } from "../constants/cartConstants";



export const cartReducer = (state = {cartItems : [], shippingInfo : {}}, action)=>{
    switch(action.type){
        case ADD_TO_CART:
            const product = action.payload;

            const isExists = state.cartItems.find((i)=>i.productId === product.productId)

            if(isExists){
                return {
                    ...state,
                    cartItems : state.cartItems.map((i)=>(
                        i.productId === isExists.productId ? product : i
                    ))
                }
            }else{
                return {
                    ...state,
                    cartItems : [...state.cartItems, product]
                }
            }
        
        case REMOVE_FROM_CART:
            return {
                ...state,
                cartItems : state.cartItems.filter((i)=>i.productId !== action.payload)
            }
        case SAVE_SHIPPING_INFO:
            return {
                ...state,
                shippingInfo : action.payload

            }
        default:
            return state;
    }
}