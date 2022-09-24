import { CART_ACTION_TYPES } from "./cart.action";

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: []
}

export const cartReducer = (state = INITIAL_STATE, action) => {
    const {type, payload} = action

    switch (type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload
            }
        case CART_ACTION_TYPES.SET_CART_OPEN:
            return {
                ...state,
                isCartOpen: !state.isCartOpen
            }
        default:
            return state
    }
}