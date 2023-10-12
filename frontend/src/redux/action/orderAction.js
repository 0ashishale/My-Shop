import axios from 'axios'
import {
    ALL_ORDERS_FAIL,
    ALL_ORDERS_REQUEST,
    ALL_ORDERS_SUCCESS,
    CREARE_ORDER_FAIL,
    CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, DELETE_ORDER_FAIL, DELETE_ORDER_REQUEST, DELETE_ORDER_SUCCESS, MY_ORDERS_FAIL, MY_ORDERS_REQUEST, MY_ORDERS_SUCCESS, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, UPDATE_STATUS_FAIL, UPDATE_STATUS_REQUEST, UPDATE_STATUS_SUCCESS
} from '../constants/orderConstants'


//create new order
export const createOrder = (order) => async(dispatch)=>{
    try {
        dispatch({type : CREATE_ORDER_REQUEST})
       const config = {
        headers : {
            "Content-Type" : "application/json"
        }
       } 

        const {data} = await axios.post('/api/create-order', order, config)

        dispatch({
            type : CREATE_ORDER_SUCCESS,
            payload : data.order

        })
    } catch (error) {
        dispatch({
            type : CREARE_ORDER_FAIL,
            payload : error.response.data.message
        })
    }
}

//get my orders

export const getMyOrders = ()=>async (dispatch)=>{
    try {
        dispatch({
            type : MY_ORDERS_REQUEST
        })

        const {data} = await axios.get('/api/my-order');

        dispatch({
            type : MY_ORDERS_SUCCESS,
            payload : data.order
        })
    } catch (error) {
        dispatch({
            type : MY_ORDERS_FAIL,
            payload : error.response.data.message
        })
    }
} 

//get all orders

export const getAllOrders = ()=> async (dispatch)=>{
    try {
        dispatch({type: ALL_ORDERS_REQUEST})

        const {data} = await axios.get('/api/all-orders')

        dispatch({
            type : ALL_ORDERS_SUCCESS,
            payload : data.orders
        })
    } catch (error) {
        dispatch({
            type : ALL_ORDERS_FAIL,
            payload : error.response.data.message
        })
    }
}

//DELETE ORDER BY ID
export const deleteOrder = (id)=>async (dispatch)=>{
    try {
        dispatch({type : DELETE_ORDER_REQUEST})
        const {data} = await axios.delete(`/api/order/${id}`)
        dispatch({
            type : DELETE_ORDER_SUCCESS,
            payload : data.success
        })
    } catch (error) {
        dispatch({
            type : DELETE_ORDER_FAIL,
            payload : error.response.data.message
        })
    }
}

//GET ORDER DETAILS

export const getOrderDetails = (id) =>async (dispatch)=>{
    try {
       
        dispatch({type : ORDER_DETAILS_REQUEST})

        const {data} = await axios.get(`/api/order/${id}`);

        dispatch({
            type  : ORDER_DETAILS_SUCCESS,
            payload : data.order
        })
        
    } catch (error) {
            dispatch({
                type : ORDER_DETAILS_SUCCESS,
                error : error.response.data.message
            })
    }
}

//update status
 export const updateOrderStatus = (id , statusData)=>async (dispatch)=>{
    try {
        dispatch({type : UPDATE_STATUS_REQUEST})

        const config = {
            headers : {
                "Content-Type" : "application/json"
            }
        }
        const {data} = await axios.put(`/api/order/${id}`, statusData, config)

        dispatch({
            type : UPDATE_STATUS_SUCCESS,
            payload : data.success
        })
        
    } catch (error) {
        dispatch({
            type : UPDATE_STATUS_FAIL,
            payload : error.response.data.message
        })
    }
}