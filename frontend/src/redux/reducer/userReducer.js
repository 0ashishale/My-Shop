
const {
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  CLEAR_ERRORS,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOGOUT_USER_REQUEST,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAIL,
  REGISTER_USER_FAIL,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_REQUEST,
  LIKED_PRODUCTS_FAIL,
  LIKED_PRODUCTS_REQUEST,
  LIKED_PRODUCTS_SUCCESS,
  LIKE_REQUEST,
  LIKE_SUCCESS,
  LIKE_FAIL,
  VERIFY_OTP_REQUEST,
  GENERATE_OTP_REQUEST,
  GENERATE_OTP_SUCCESS,
  VERIFY_OTP_SUCCESS,
  GENERATE_OTP_FAIL,
  VERIFY_OTP_FAIL,
  VERIFY_OTP_RESET,
  GENERATE_OTP_RESET,
  REGISTER_USER_RESET,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_RESET,
} = require("../constants/userConstants");

export const userReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case LOGIN_USER_REQUEST:
    case LOAD_USER_REQUEST:
    case LOGOUT_USER_REQUEST:
    case REGISTER_USER_REQUEST:
      return {
        loading: true,
        user: {},
        isAuthenticated: false,
      };
    case LOGIN_USER_SUCCESS:
    case LOAD_USER_SUCCESS:
   
      return {
        loading: false,
        user: action.payload,
        isAuthenticated: true,
      };
      case REGISTER_USER_SUCCESS:
        return {
          loading : false,
          success : true,
        }

    case LOGOUT_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        success: action.payload,
      };
    case LOGIN_USER_FAIL:
    case LOAD_USER_FAIL:
    case REGISTER_USER_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
      case REGISTER_USER_RESET:{
        return {
          loading : false,
          success : false
        }
      }
    case LOGOUT_USER_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

//UPDATE PROFILE REDUCER


//get liked products of user
export const likedProductsReducer = (state = { products : []}, action)=>{
  switch(action.type){
    case LIKED_PRODUCTS_REQUEST:
      return {
        loading : true,
        products : []
      }
    case LIKED_PRODUCTS_SUCCESS:
      return {
      
        loading : false,
        products : action.payload
      }
    case LIKED_PRODUCTS_FAIL:
      return {
        
        loading : false,
        error : action.payload
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        error : null
      }
    default:
      return state
  }
}

export const likeReducer = (state = {}, action)=>{
  switch(action.type){
    case LIKE_REQUEST:
      return {
        loading : true,
        
      }
      case LIKE_SUCCESS:
        return {
          loading : false,
          isLiked : action.payload
        }
      case LIKE_FAIL:
        return {
          ...state,
          loading : false,
          error : action.payload
        }
      case CLEAR_ERRORS:
        return {
            ...state,
            error : null
        }
      default:
        return state;
  }
}
//otp reducer
export const otpReducer = (state = {}, action)=>{
  switch(action.type){
    case VERIFY_OTP_REQUEST:
      case GENERATE_OTP_REQUEST:
        case RESET_PASSWORD_REQUEST:
        return {
          loading : true,
          isVerified : false,
          isGenerated : false,
        }
      case GENERATE_OTP_SUCCESS:
        return {
          loading : false,
          isGenerated : action.payload
        }
      case VERIFY_OTP_SUCCESS:
        case RESET_PASSWORD_SUCCESS:
        return {
          loading : false,
          isVerified : action.payload
        }
      case GENERATE_OTP_FAIL:
        return {
          loading : false,
          isGenerated : false
        }
      case VERIFY_OTP_FAIL:
        case RESET_PASSWORD_FAIL:
        return {
          loading : false,
          isVerified : false,
          error : action.payload
        }
      case VERIFY_OTP_RESET:
        case RESET_PASSWORD_RESET:
        return {
            isVerified : false
        }
      case GENERATE_OTP_RESET:
        return {
            isGenerated : false
        }
      case CLEAR_ERRORS:
        return {
          ...state,
          error : null
        }
      default:
        return state
  }
}