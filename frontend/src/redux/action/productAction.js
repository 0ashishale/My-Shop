



//create product

import axios from "axios"
const { CREATE_PRODUCT_REQUEST, CREATE_PRODUCT_SUCCESS, CREATE_PRODUCT_FAIL, ALL_PRODUCTS_FAIL, ALL_PRODUCTS_REQUEST, ALL_PRODUCTS_SUCCESS, ADMIN_PRODUCTS_REQUEST, ADMIN_PRODUCTS_SUCCESS, ADMIN_PRODUCTS_FAIL, DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, DELETE_PRODUCT_FAIL, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, DELETE_IMAGE_REQUEST, DELETE_IMAGE_SUCCESS, DELETE_IMAGE_FAIL } = require("../constants/productConstants")

export const createProduct = (productData)=>async(dispatch)=>{
    try {
        dispatch({type : CREATE_PRODUCT_REQUEST})

        const config = {headers : {
            "Content-Type" : 'application/json'
          }}
    

        const {data} = await axios.post('/api/create-product', productData, config)
        console.log(data)

        dispatch({
            type : CREATE_PRODUCT_SUCCESS,
            payload : data.success
        })
    } catch (error) {
        dispatch({
            type : CREATE_PRODUCT_FAIL,
            payload : error.message
        })
    }
}

//GET ALL PRODUCTS 

export const getAllProducts = () => async(dispatch)=>{
    try {
        dispatch({
            type : ALL_PRODUCTS_REQUEST
        })

        const {data} = await axios.get('/api/all-productse')

        dispatch({
            type : ALL_PRODUCTS_SUCCESS,
            payload : data.products
        })
    } catch (error) {
        dispatch({
            type : ALL_PRODUCTS_FAIL,
            payload : error.response.data.message
        })
    }
}
//ADMIN GET ALL PRODUCTS
export const getAdminProducts = () => async(dispatch)=>{
    try {
        dispatch({
            type : ADMIN_PRODUCTS_REQUEST
        })

        const {data} = await axios.get('/api/all-products')

        dispatch({
            type : ADMIN_PRODUCTS_SUCCESS,
            payload : data.products
        })
    } catch (error) {
       
        dispatch({
            type : ADMIN_PRODUCTS_FAIL,
            payload : error.response.data.message
        })
    }

}

//GET PRODUCT DETAILS
export const getProductDetails = (id) => async(dispatch)=>{
    try {
        dispatch({type : PRODUCT_DETAILS_REQUEST})

        const {data} = await axios.get(`/api/product/${id}`)

        dispatch({
            type : PRODUCT_DETAILS_SUCCESS,
            payload : data.product
        })
    } catch (error) {
        
        dispatch({
            type : PRODUCT_DETAILS_FAIL,
            payload : error.response.data.message
        })
    }
}


//DELETE  PRODUCT ADMIN
export const deleteProduct = (id) => async(dispatch)=>{
    try {
        dispatch({
            type : DELETE_PRODUCT_REQUEST
        })

        const {data} = await axios.delete(`/api/product/${id}`)

        dispatch({
            type : DELETE_PRODUCT_SUCCESS,
            payload : data.success
        })
    } catch (error) {
        dispatch({
            type : DELETE_PRODUCT_FAIL,
            payload : error.message
        })
    }
}


//delete image
// export const deleteImage = (productId, imageId, publicId) => async (dispatch) => {
//     try {
//       dispatch({ type: DELETE_IMAGE_REQUEST });
      
//       // Send the publicId as part of the request body
//       const { data } = await axios.delete(`/api/product/${productId}/image/${imageId}/${publicId}`, {
//         // Include publicId in the request body
//       });
  
//       dispatch({
//         type: DELETE_IMAGE_SUCCESS,
//         payload: data.success,
//       });
//     } catch (error) {
//       dispatch({
//         type: DELETE_IMAGE_FAIL,
//         payload: error.response.data.message,
//       });
//     }
//   };
  
  export const deleteImage = (productId, imageId, publicId) => async (dispatch) => {

    try {
      dispatch({ type: DELETE_IMAGE_REQUEST });

      // Send the publicId as part of the request body
      const { data } = await axios.delete(`/api/product/${productId}/image/${imageId}`);
  
      dispatch({
        type: DELETE_IMAGE_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
        console.log(error);
      dispatch({
        type: DELETE_IMAGE_FAIL,
        payload: error.response.data.message,
      });
    }
  };
