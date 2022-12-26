import { cartReducers } from "./cartReducers/cartReducers";
import { logStatusReducer } from "./logStatusReducer/logStausReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    cartProducts: cartReducers,
    logStatus: logStatusReducer
})
export default rootReducer;