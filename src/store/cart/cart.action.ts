import { ActionWithPayload, createAction, withMatcher } from "../../utils/reducer/reducer.util";
import { CheckoutProduct, Product } from "../../interfaces/product";
import { Action } from "redux";

export enum CART_ACTION_TYPES {
    SET_CART_ITEMS = "cart/SET_CART_ITEMS",
    SET_CART_OPEN = "cart/SET_CART_OPEN"
}

export type SetCartOpenAction = Action<CART_ACTION_TYPES.SET_CART_OPEN>;

export type SetCartItemsAction = ActionWithPayload<CART_ACTION_TYPES.SET_CART_ITEMS, CheckoutProduct[]>

export const toggleCart = withMatcher((): SetCartOpenAction => createAction(CART_ACTION_TYPES.SET_CART_OPEN));

export const updateCartItems = withMatcher((newCartItems: CheckoutProduct[]): SetCartItemsAction => createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems));

export const addItemToCart = (cartItems: CheckoutProduct[], cartItem: Product) => {
    return updateCartItems(addCartItem(cartItems, cartItem))
}

export const removeItemFromCart = (cartItems: CheckoutProduct[], cartItem: CheckoutProduct) => {
    return updateCartItems(removeCartItem(cartItems, cartItem));
}

export const clearItemFromCart = (cartItems: CheckoutProduct[], cartItem: CheckoutProduct) => {
    return updateCartItems(clearCartItem(cartItems, cartItem))
}

const addCartItem = (cartItems: CheckoutProduct[], productToAdd: Product) => {
    const updatedCartItems = cartItems.slice();
    const existingCartItem = updatedCartItems.find(item => item.id === productToAdd.id);
    if (existingCartItem) {
        existingCartItem.quantity++;
    } else {
        updatedCartItems.push({...productToAdd, quantity: 1});
    }
    return updatedCartItems;
}

const removeCartItem = (cartItems: CheckoutProduct[], cartItemToRemove: CheckoutProduct) => {
    const existingCartItem = cartItems.find(cartItem => cartItem.id === cartItemToRemove.id)
    if (existingCartItem && existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
    } else {
        return cartItems.map(cartItem => {
            return cartItem.id === cartItemToRemove.id
                ? {...cartItem, quantity: cartItem.quantity - 1}
                : cartItem
        })
    }
}

const clearCartItem = (cartItems: CheckoutProduct[], cartItemToClear: CheckoutProduct) => {
    return cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id);
}
