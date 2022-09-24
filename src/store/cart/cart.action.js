import { createAction } from "../../utils/reducer/reducer.util";

export const CART_ACTION_TYPES = {
    SET_CART_ITEMS: "cart/SET_CART_ITEMS",
    SET_CART_OPEN: "cart/SET_CART_OPEN"
}

export const toggleCart = () => createAction(CART_ACTION_TYPES.SET_CART_OPEN)

export const addItemToCart = (cartItems, cartItem) => {
    return updateCartItems(addCartItem(cartItems, cartItem))
}

export const removeItemFromCart = (cartItems, cartItem) => {
    return updateCartItems(removeCartItem(cartItems, cartItem));
}

export const clearItemFromCart = (cartItems, cartItem) => {
    return updateCartItems(clearCartItem(cartItems, cartItem))
}

const updateCartItems = (newCartItems) => {
    const payload = {
        cartItems: newCartItems
    }
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, payload);
}

const addCartItem = (cartItems, productToAdd) => {
    const updatedCartItems = cartItems.slice();
    const existingCartItem = updatedCartItems.find(item => item.id === productToAdd.id);
    if (existingCartItem) {
        existingCartItem.quantity++;
    } else {
        updatedCartItems.push({...productToAdd, quantity: 1});
    }
    return updatedCartItems;
}

const removeCartItem = (cartItems, cartItemToRemove) => {
    const existingCartItem = cartItems.find(cartItem => cartItem.id === cartItemToRemove.id)
    if (existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
    } else {
        return cartItems.map(cartItem => {
            return cartItem.id === cartItemToRemove.id
                ? {...cartItem, quantity: cartItem.quantity - 1}
                : cartItem
        })
    }
}

const clearCartItem = (cartItems, cartItemToClear) => {
    return cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id);
}
