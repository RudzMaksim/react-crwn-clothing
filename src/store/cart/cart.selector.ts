import { createSelector } from "reselect";
import { CheckoutProduct } from "../../interfaces/product";
import { RootState } from "../store";

export const isCartOpenSelector = (state: RootState) => state.cart.isCartOpen

export const cartItemsSelector = (state: RootState): CheckoutProduct[] => state.cart.cartItems

export const cartCountSelector = createSelector(
    [cartItemsSelector],
    (cartItems: CheckoutProduct[]) => cartItems.reduce((total, currentElem) => total + currentElem.quantity, 0)
)

export const cartTotalSelector = createSelector(
    [cartItemsSelector],
    (cartItems: CheckoutProduct[]) => cartItems.reduce((total, currentValue) => total + (currentValue.quantity * currentValue.price), 0)
)
