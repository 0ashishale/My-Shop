import { ALL_USERS_FAIL, ALL_USERS_REQUEST, ALL_USERS_SUCCESS, CLEAR_ERRORS, DELETE_USER_FAIL, DELETE_USER_REQUEST, DELETE_USER_RESET, DELETE_USER_SUCCESS, UPDATE_USER_FAIL, UPDATE_USER_REQUEST, UPDATE_USER_RESET, UPDATE_USER_SUCCESS } from "../constants/adminContants";
import { UPDATE_PASSWORD_FAIL, UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD_RESET, UPDATE_PASSWORD_SUCCESS, UPDATE_PROFILE_FAIL, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_RESET, UPDATE_PROFILE_SUCCESS } from "../constants/userConstants";



export const allUsersReducer = (state = {users : []}, action)=>{
    switch(action.type){
        case ALL_USERS_REQUEST:
            return {
                ...state,
                loading : true,
            }
        case ALL_USERS_SUCCESS:
            return {
                loading : false,
                users : action.payload
            }
        case ALL_USERS_FAIL:
            return {
                ...state,
                loading : false,
                error : action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error : null,
            }
        default:
            return state;
    }
}

//profile reducer update/delete

export const profileReducer = (state = {} , action)=>{
    switch(action.type){
        case DELETE_USER_REQUEST:
            case UPDATE_USER_REQUEST:
                case UPDATE_PROFILE_REQUEST:
                case UPDATE_PASSWORD_REQUEST:
            return {
                ...state,
                loading : true
            }
        case DELETE_USER_SUCCESS:
            return {
                ...state,
                loading : false,
                isDeleted : action.payload
            }
  
        case UPDATE_USER_SUCCESS:
            case UPDATE_PROFILE_SUCCESS:
                case UPDATE_PASSWORD_SUCCESS:
            return {
                ...state,
                loading : false,
                isUpdated : action.payload
            }
        case DELETE_USER_FAIL:
            return {
                ...state,
                loading : false,
                error : action.payload,
                isDeleted : false
            }
        case UPDATE_USER_FAIL:
            case UPDATE_PROFILE_FAIL:
                case UPDATE_PASSWORD_FAIL:
            return {
                ...state,
                loading : false,
                error : action.payload,
                isUpdated : false
            }
        case DELETE_USER_RESET:
            return {
                ...state,
                isDeleted : false
            }
        case UPDATE_USER_RESET:
            case UPDATE_PROFILE_RESET:
                case UPDATE_PASSWORD_RESET:
            return {
                ...state,
                isUpdated : false
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



