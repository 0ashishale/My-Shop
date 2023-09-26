import {createStore,applyMiddleware, combineReducers  } from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension'

import {userReducer} from './redux/reducer/userReducer'
import { allUsersReducer, profileReducer } from './redux/reducer/adminReducer';
import { adminProductReducer, productDetailsReducer, productsReducer } from './redux/reducer/productReducer';


const reducer = combineReducers({
   user : userReducer,
   users : allUsersReducer,
   profile : profileReducer,
   product : adminProductReducer,
   products : productsReducer,
   productDetails : productDetailsReducer,
});

let initialState = {

}

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store