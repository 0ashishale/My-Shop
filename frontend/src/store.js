import {createStore,applyMiddleware, combineReducers  } from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension'

import {likeReducer, likedProductsReducer, otpReducer, userReducer} from './redux/reducer/userReducer'
import { allUsersReducer, profileReducer } from './redux/reducer/adminReducer';
import { adminProductReducer, featuredProductsReducer, productDetailsReducer, productsReducer, questionAnswerReducer } from './redux/reducer/productReducer';
import { cartReducer } from './redux/reducer/cartReducer';
import { allOrdersReducer, myOrdersReducer, orderDetailsReducer, orderReducer } from './redux/reducer/orderReducer';


const reducer = combineReducers({
   user : userReducer,
   users : allUsersReducer,
   profile : profileReducer,
   product : adminProductReducer,
   products : productsReducer,
   productDetails : productDetailsReducer,
   likedProducts : likedProductsReducer,
   like : likeReducer,
   cart : cartReducer,
   order : orderReducer,
   myOrder : myOrdersReducer,
   allOrders : allOrdersReducer,
   orderDetails : orderDetailsReducer,
   questionA : questionAnswerReducer,
   featured : featuredProductsReducer,
   otp : otpReducer,
});

let initialState = {
        cart : {
            cartItems : localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
            shippingInfo : localStorage.getItem('shippingInfo') ? JSON.parse(localStorage.getItem('shippingInfo')) : {},
        },
   
}

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store