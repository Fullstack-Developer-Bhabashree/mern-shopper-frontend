import storage from "redux-persist/lib/storage";
import { ActionTypes } from "../../constants/action-types";

const initialState = {
    numberCart: 0,
    Carts: [],
    products: []
}

export const cartReducers = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.GET_ALL_PRODUCT:

            return { ...state, products: payload }

        case ActionTypes.GET_NUMBER_CART:

            return { ...state }

        case ActionTypes.ADD_CART:

            if (state.numberCart === 0) {
                let cart = {
                    id: payload.id,
                    quantity: 1,
                    title: payload.title,
                    image: payload.image,
                    category: payload.category,
                    price: payload.price,
                    rating: payload.rating
                }
                state.Carts.push(cart);
            } else {
                let existing = false;
                state.Carts.map((item, index) => {
                    if (item.id === payload.id) {
                        existing = true;
                        state.Carts[index].quantity++;
                    }
                })
                if (!existing) {
                    let newCart = {
                        id: payload.id,
                        quantity: 1,
                        title: payload.title,
                        image: payload.image,
                        category: payload.category,
                        price: payload.price,
                        rating: payload.rating
                    }
                    state.Carts.push(newCart);
                }
            }

            return { ...state, numberCart: state.numberCart + 1 }

        case ActionTypes.DELETE_CART:

            let selected_item_quantity = state.Carts[payload].quantity

            return {
                ...state,
                numberCart: state.numberCart - selected_item_quantity,
                Carts: state.Carts.filter((item) => {
                    return item.id !== state.Carts[payload].id
                })
            }

        case ActionTypes.PLUS_QUANTITY:

            state.numberCart++
            state.Carts[payload].quantity++

            return {
                ...state
            }

        case ActionTypes.MINUS_QUANTITY:

            if (state.Carts[payload].quantity > 1) {
                state.numberCart--;
                state.Carts[payload].quantity--;
            }

            return {
                ...state
            }

        case ActionTypes.LOG_OUT_RESET:

            localStorage.clear()
            storage.removeItem('persist:root')
            return{
                ...state, Carts:[], numberCart:0
            }
        default:
            return state;
    }
}