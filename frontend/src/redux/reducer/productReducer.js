import {
  ADMIN_PRODUCTS_FAIL,
  ADMIN_PRODUCTS_REQUEST,
  ADMIN_PRODUCTS_SUCCESS,
  ALL_PRODUCTS_FAIL,
  ALL_PRODUCTS_REQUEST,
  ALL_PRODUCTS_SUCCESS,
  CLEAR_ERRORS,
  CREATE_ANSWER_FAIL,
  CREATE_ANSWER_REQUEST,
  CREATE_ANSWER_RESET,
  CREATE_ANSWER_SUCCESS,
  CREATE_PRODUCT_FAIL,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_RESET,
  CREATE_PRODUCT_REVIEW_FAIL,
  CREATE_PRODUCT_REVIEW_REQUEST,
  CREATE_PRODUCT_REVIEW_RESET,
  CREATE_PRODUCT_REVIEW_SUCCESS,
  CREATE_PRODUCT_SUCCESS,
  CREATE_QUESTION_FAIL,
  CREATE_QUESTION_REQUEST,
  CREATE_QUESTION_RESET,
  CREATE_QUESTION_SUCCESS,
  DELETE_ANSWER_FAIL,
  DELETE_ANSWER_REQUEST,
  DELETE_ANSWER_RESET,
  DELETE_ANSWER_SUCCESS,
  DELETE_IMAGE_FAIL,
  DELETE_IMAGE_REQUEST,
  DELETE_IMAGE_RESET,
  DELETE_IMAGE_SUCCESS,
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_RESET,
  DELETE_PRODUCT_SUCCESS,
  FEATURE_PRODUCTS_FAIL,
  FEATURE_PRODUCTS_REQUEST,
  FEATURE_PRODUCTS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_RESET,
  UPDATE_PRODUCT_SUCCESS,
} from "../constants/productConstants";

export const adminProductReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_PRODUCT_REQUEST:
    case DELETE_PRODUCT_REQUEST:
    case UPDATE_PRODUCT_REQUEST:
    case DELETE_IMAGE_REQUEST:
    case CREATE_PRODUCT_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_PRODUCT_SUCCESS:
    case CREATE_PRODUCT_REVIEW_SUCCESS:
      return {
        loading: false,
        isCreated: action.payload,
      };
    case CREATE_PRODUCT_FAIL:
    case CREATE_PRODUCT_REVIEW_FAIL:
      return {
        loading: false,
        error: action.payload,
        isCreated: false,
      };
    case CREATE_PRODUCT_RESET:
    case CREATE_PRODUCT_REVIEW_RESET:
      return {
        ...state,
        isCreated: false,
      };
    case DELETE_PRODUCT_SUCCESS:
    case DELETE_IMAGE_SUCCESS:
      return {
        loading: false,
        isDeleted: action.payload,
      };
    case DELETE_PRODUCT_FAIL:
    case DELETE_IMAGE_FAIL:
      return {
        loading: false,
        error: action.payload,
        isDeleted: false,
      };
    case DELETE_IMAGE_RESET:
    case DELETE_PRODUCT_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case UPDATE_PRODUCT_SUCCESS:
      return {
        loading: false,
        isUpdated: action.payload,
      };
    case UPDATE_PRODUCT_FAIL:
      return {
        loading: false,
        error: action.payload,
        isUpdated: false,
      };
    case UPDATE_PRODUCT_RESET:
      return {
        ...state,
        isUpdated: false,
      };
    case CLEAR_ERRORS:
      return {
        error: null,
        ...state,
      };
    default:
      return state;
  }
};

export const productsReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case ALL_PRODUCTS_REQUEST:
    case ADMIN_PRODUCTS_REQUEST:
      return {
        loading: true,
        products: [],
      };
    case ADMIN_PRODUCTS_SUCCESS:
    case ALL_PRODUCTS_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };
    case ADMIN_PRODUCTS_FAIL:
    case ALL_PRODUCTS_FAIL:
      return {
        loading: false,
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

export const featuredProductsReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case FEATURE_PRODUCTS_REQUEST:
      return {
        loading: true,
        products: [],
      };
    case FEATURE_PRODUCTS_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };
    case FEATURE_PRODUCTS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state
  }
};

export const productDetailsReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PRODUCT_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        product: action.payload,
      };
    case PRODUCT_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        error: null,
        ...state,
      };
    default:
      return state;
  }
};

//question/answer

export const questionAnswerReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_QUESTION_REQUEST:
    case CREATE_ANSWER_REQUEST:
    case DELETE_ANSWER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_QUESTION_SUCCESS:
    case CREATE_ANSWER_SUCCESS:
      return {
        loading: false,
        isCreated: action.payload,
      };
    case DELETE_ANSWER_SUCCESS:
      return {
        loading: false,
        isDeleted: action.payload,
      };
    case DELETE_ANSWER_FAIL:
      return {
        loading: false,
        isDeleted: false,
        error: action.payload,
      };
    case DELETE_ANSWER_RESET:
      return {
        loading: false,
        isDeleted: false,
      };
    case CREATE_QUESTION_RESET:
    case CREATE_ANSWER_RESET:
      return {
        ...state,
        isCreated: false,
      };
    case CREATE_QUESTION_FAIL:
    case CREATE_ANSWER_FAIL:
      return {
        loading: false,
        error: action.payload,
        isCreated: false,
      };
    case CLEAR_ERRORS:
      return {
        error: null,
        ...state,
      };
    default:
      return state;
  }
};
