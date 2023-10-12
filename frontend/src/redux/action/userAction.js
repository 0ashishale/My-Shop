import axios from "axios";

import {
  LOAD_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER_FAIL,
  LOGOUT_USER_REQUEST,
  LOGOUT_USER_SUCCESS,
  REGISTER_USER_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  LIKED_PRODUCTS_REQUEST,
  LIKED_PRODUCTS_FAIL,
  LIKED_PRODUCTS_SUCCESS,
  LIKE_REQUEST,
  LIKE_SUCCESS,
  LIKE_FAIL,
  GENERATE_OTP_REQUEST,
  GENERATE_OTP_SUCCESS,
  GENERATE_OTP_FAIL,
  VERIFY_OTP_REQUEST,
  VERIFY_OTP_SUCCESS,
  VERIFY_OTP_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL
} from "../constants/userConstants";

export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post("/api/register", { userData }, config);

    dispatch({
      type: REGISTER_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_USER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/login",
      { email, password },
      config
    );
    console.log(data);

    dispatch({
      type: LOGIN_USER_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
   
    dispatch({
      type: LOGIN_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

//load logged in user details

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });

    const { data } = await axios.get("/api/auth/user");
    
    dispatch({
      type: LOAD_USER_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    
    dispatch({
      type: LOAD_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

//LOGOUT USER

export const logout = () => async (dispatch) => {
  try {
    dispatch({ type: LOGOUT_USER_REQUEST });

    const { data } = await axios.get("/api/auth/logout");

    dispatch({
      type: LOGOUT_USER_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: LOGOUT_USER_FAIL,
      payload: error.response.message,
    });
  }
};

//update user profile

export const updateProfile = (id, userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PROFILE_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.put(
      `/api/user/update-profile/${id}`,
      userData,
      config
    );

    dispatch({
      type: UPDATE_PROFILE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAIL,
      payload: error.response.data.message,
    });
  }
};

//UPDATE PASSWORD

export const updateUserPassword = (oldPassword, newPassword)=> async (dispatch)=>{
  
    try {
        dispatch({type : UPDATE_PASSWORD_REQUEST})

        const config = {
            headers :{ "Content-Type":"application/json"}
        }

        const {data} = await axios.put(`/api/update-password`, {oldPassword, newPassword}, config);

        dispatch({
            type : UPDATE_PASSWORD_SUCCESS,
            payload : data.success
        })
    } catch (error) {
        console.log(error);
        dispatch({
            type : UPDATE_PASSWORD_FAIL,
            payload : error.response.data.message
        })
    }
}


//GET LIKED PRODUCTS
export const getLikedProducts = () => async (dispatch) => {
  try {
    dispatch({ type: LIKED_PRODUCTS_REQUEST });

    const { data } = await axios.get("/api/liked-products");

    dispatch({
      type: LIKED_PRODUCTS_SUCCESS,
      payload: data.likedProducts,
    });
  } catch (error) {
    dispatch({
      type: LIKED_PRODUCTS_FAIL,
      payload: error.response.data.message,
    });
  }
};

//like request

export const likeProduct =(productId) => async(dispatch)=>{
  try {
    dispatch({
      type : LIKE_REQUEST
    })

    const config = {headers : {"Content-Type": "application/json"}}

    const {data} = await axios.post('/api/like', {productId}, config)

    dispatch({
      type : LIKE_SUCCESS,
      payload : data.liked
    })
  } catch (error) {
    console.log(error);
    dispatch({
      type : LIKE_FAIL,
      payload : error.response.data.message
    })
  }
}


//GENERATE OTP 

export const generateOtp = (email)=>async (dispatch)=>{
  try {
    dispatch({type : GENERATE_OTP_REQUEST})
    const config = {headers : {"Content-Type": "application/json"}}
    const {data} = await axios.post('/api/email-verification', {email}, config)

    dispatch({
      type : GENERATE_OTP_SUCCESS,
      payload : data.success
    })
  } catch (error) {
    dispatch({
      type  : GENERATE_OTP_FAIL,
      error : error.response.data.message
    })
  }
}

//verify otp

export const verifyOtp = (email, otp)=> async (dispatch)=>{
  try {
    dispatch({
      type : VERIFY_OTP_REQUEST
    })
    const config = {headers : {"Content-Type": "application/json"}}
    const {data} = await axios.post('/api/verify', {email, otp}, config)
    dispatch({
      type : VERIFY_OTP_SUCCESS,
      payload : data.success
    })
  } catch (error) {
    dispatch({
      type : VERIFY_OTP_FAIL,
      payload : error.response.data.message
    })
  }
}

export const resetPassword = (email, password, otp) => async(dispatch)=>{
  try {
    dispatch({type : RESET_PASSWORD_REQUEST})

    const config = {headers : {"Content-Type": "application/json"}}
    const {data} = await axios.post('/api/reset-password', {email, password, otp}, config)
    dispatch({
      type : RESET_PASSWORD_SUCCESS,
      payload : data.success
    })
  } catch (error) {
    console.log(error);
    dispatch({
      type : RESET_PASSWORD_FAIL,
      payload : error.response.data.message
    })
  }
}