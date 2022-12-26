import { Action } from "@remix-run/router"
import { ActionTypes } from "../constants/action-types"

export const getAllProducts = (payload) => {
    return {
        type: ActionTypes.GET_ALL_PRODUCT,
        payload: payload
    }
}

export const addCart = (payload) => {
    return {
        type: ActionTypes.ADD_CART,
        payload: payload
    }
}

export const deleteCart = (payload) => {
    return {
        type: ActionTypes.DELETE_CART,
        payload: payload
    }
}

export const plusQuantity = (payload) => {
    return {
        type: ActionTypes.PLUS_QUANTITY,
        payload: payload
    }
}

export const minusQuantity = (payload) => {
    return {
        type: ActionTypes.MINUS_QUANTITY,
        payload: payload
    }
}

export const loggedStatus = (payload) => {

    if (payload === 'login') {
        return {
            type: ActionTypes.LOGGED_IN_CHECK,
        }
    }
    if (payload === 'logout') {
        return {
            type: ActionTypes.LOGGED_OUT_CHECK,
        }
    }

}

export const logoutReset = () => {
    return {
        type: ActionTypes.LOG_OUT_RESET,
    }
}


