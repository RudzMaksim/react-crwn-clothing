import { createSelector } from "reselect";

export const isCartOpenSelector = (state) => state.cart.isCartOpen

export const cartItemsSelector = (state) => state.cart.cartItems

export const cartCountSelector = createSelector(
    [cartItemsSelector],
    (cartItems) => cartItems.reduce((total, currentElem) => total + currentElem.quantity, 0)
)

export const cartTotalSelector = createSelector(
    [cartItemsSelector],
    (cartItems) => cartItems.reduce((total, currentValue) => total + (currentValue.quantity * currentValue.price), 0)
)
