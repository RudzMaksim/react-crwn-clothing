import { toggleCart, updateCartItems } from "./cart.action";
import { CheckoutProduct } from "../../interfaces/product";
import { AnyAction } from "redux";

type CartState = {
    isCartOpen: boolean,
    cartItems: CheckoutProduct[]
}

const INITIAL_STATE: CartState = {
    isCartOpen: false,
    cartItems: []
}

export const cartReducer = (state = INITIAL_STATE, action: AnyAction) => {
    if (toggleCart.match(action)) {
        return {...state, isCartOpen: !state.isCartOpen}
    }

    if (updateCartItems.match(action)) {
        return {...state, cartItems: action.payload};
    }

    return state;
}