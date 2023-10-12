import {
  ALL_ORDERS_FAIL,
  ALL_ORDERS_REQUEST,
  ALL_ORDERS_SUCCESS,
  CLEAR_ERRORS,
  CREARE_ORDER_FAIL,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_RESET,
  CREATE_ORDER_SUCCESS,
  DELETE_ORDER_FAIL,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_RESET,
  DELETE_ORDER_SUCCESS,
  MY_ORDERS_FAIL,
  MY_ORDERS_REQUEST,
  MY_ORDERS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  UPDATE_STATUS_FAIL,
  UPDATE_STATUS_REQUEST,
  UPDATE_STATUS_RESET,
  UPDATE_STATUS_SUCCESS,
} from "../constants/orderConstants";

export const orderReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
      return {
        loading: true,
        isCreated: false,
      };      
    case CREATE_ORDER_SUCCESS:
      return {
        loading: false,
        order: action.payload,
        isCreated: true,
      };
    case CREARE_ORDER_FAIL:
      return {
        loading: false,
        isCreated: false,
        error: action.payload,
      };
    case CREATE_ORDER_RESET:
      return {
        isCreated: false,
      };
    case DELETE_ORDER_REQUEST:
      return {
        loading: true,
        isDeleted: false,
      };
    case DELETE_ORDER_SUCCESS:
      return {
        loading: false,
        isDeleted: true,
      };
    case DELETE_ORDER_FAIL:
      return {
        loading: false,
        isDeleted: false,
        error: action.payload,
      };
    case DELETE_ORDER_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case UPDATE_STATUS_REQUEST:
      return {
        loading : true,
        
      }
    case UPDATE_STATUS_SUCCESS:
      return {
        loading : false,
        isUpdated : action.payload
      }
    case UPDATE_STATUS_FAIL:
      return {
        loading : false,
        error : action.payload,
        isUpdated : false
      }
    case UPDATE_STATUS_RESET:
      return {
        loading : false,
        isUpdated : false
      }

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

//all order reducer
export const allOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ALL_ORDERS_REQUEST:
      return {
        loading: true,
        orders: [],
      };
    case ALL_ORDERS_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };
    case ALL_ORDERS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        error: null,
      };
    default:
      return state;
  }
};

//myorderReducer

export const myOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case MY_ORDERS_REQUEST:
      return {
        loading: true,
        orders: [],
      };
    case MY_ORDERS_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };
    case MY_ORDERS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        error: null,
      };
    default:
      return state;
  }
};

export const orderDetailsReducer = (state = { order: [] }, action) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return {
        loading: true,
        order: [],
      };
    case ORDER_DETAILS_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      };
    case ORDER_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        error: null,
      };
    default:
      return state;
  }
};
