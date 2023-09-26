import axios from "axios";
import { ALL_USERS_FAIL, ALL_USERS_REQUEST, ALL_USERS_SUCCESS, DELETE_USER_FAIL, DELETE_USER_REQUEST, DELETE_USER_SUCCESS, UPDATE_USER_FAIL, UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS } from "../constants/adminContants"
import { DataGrid } from '@mui/x-data-grid';
import { UPDATE_PRODUCT_FAIL, UPDATE_PRODUCT_SUCCESS } from "../constants/productConstants";



export const getAllUsers = ()=> async(dispatch)=>{
    try {
        dispatch({type : ALL_USERS_REQUEST});

        const {data} = await axios.get('/api/admin/allusers')

        dispatch({
            type : ALL_USERS_SUCCESS,
            payload : data.allUsers
        })
    } catch (error) {
        console.log(error);

        dispatch({
            type : ALL_USERS_FAIL,
            payload : error.response.data.message
        })
    }
}

//DELETE USER --ADMIN

export const deleteUser = (id) => async (dispatch) =>{
    try {
        dispatch({type : DELETE_USER_REQUEST})

        const {data} = await axios.delete(`/api/admin/user/${id}`)

        dispatch({
            type : DELETE_USER_SUCCESS,
            payload : data.success
        })

    } catch (error) {
        console.log(error);
        dispatch({
            type : DELETE_USER_FAIL,
            payload : error.response.data.message
        })
    }
}

//update user role

export const updateUser = (id, role) => async (dispatch)=>{
    
    try {
        dispatch({type : UPDATE_USER_REQUEST});
    
        
        const {data} = await axios.put(`/api/admin/user/${id}`, {role})

        dispatch({
            type : UPDATE_USER_SUCCESS,
            payload : data.success
        })
    } catch (error) {
        console.log(error);

        dispatch({
            type : UPDATE_USER_FAIL,
            payload : error.response.data.message
        })
    }
}


//UPDATE PRODUCT --ADMIN

export const updateProduct = (id, productData) => async(dispatch)=>{
        try {
            dispatch({type : UPDATE_USER_REQUEST});

            const config = {
                headers : {
                    "Content-Type" : "application/json"
                }
            }

            const {data} = await axios.put(`/api/update-product/${id}`, productData, config);

            dispatch({
                type : UPDATE_PRODUCT_SUCCESS,
                payload : data.success
            })
        } catch (error) {
            dispatch({
                type : UPDATE_PRODUCT_FAIL,
                payload : error.response.data.message
            })
        }
}

