import { ActionTypes } from "../../constants/action-types";

const initialState = {
    loginStatus: false,
    logoutStatus: true
}

export const logStatusReducer = (state = initialState, action) =>{

    switch (action.type) {
        case ActionTypes.LOGGED_IN_CHECK:
            
            return {...state, loginStatus:true, logoutStatus:false}
    
        case ActionTypes.LOGGED_OUT_CHECK:
            
            return {...state, loginStatus:false, logoutStatus:true}

        default:
            return state
    }
    
}
