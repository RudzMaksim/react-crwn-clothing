import { createContext, useReducer } from "react";
import { createAction } from "../../utils/reducer/reducer.util";

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

export const CartContext = createContext({
    isCartOpen: false,
    toggleCart: () => {
    },
    cartItems: [],
    addItemToCart: () => {
    },
    removeItemFromCart: () => {
    },
    clearItemFromCart: () => {
    },
    cartCount: 0,
    cartTotal: 0
})

export const CART_ACTION_TYPES = {
    SET_CART_ITEMS: "SET_CART_ITEMS",
    SET_CART_OPEN: "SET_CART_OPEN"
}

const cartReducer = (state, action) => {
    const {type, payload} = action;
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
            throw new Error(`unhandled type ${type} in cartReducer`);
    }
}

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0
}

export const CartProvider = ({children}) => {
    const [{isCartOpen, cartItems, cartCount, cartTotal}, dispatch] = useReducer(cartReducer, INITIAL_STATE);

    const toggleCart = () => {
        dispatch(createAction(CART_ACTION_TYPES.SET_CART_OPEN))
    }

    const addItemToCart = (cartItem) => {
        updateCartItems(addCartItem(cartItems, cartItem))
    }

    const removeItemFromCart = (cartItem) => {
        updateCartItems(removeCartItem(cartItems, cartItem));
    }

    const clearItemFromCart = (cartItem) => {
        updateCartItems(clearCartItem(cartItems, cartItem))
    }

    const updateCartItems = (newCartItems) => {
        const newCartCount = newCartItems.reduce((total, currentElem) => total + currentElem.quantity, 0)
        const newCartTotal = newCartItems.reduce((total, currentValue) => total + (currentValue.quantity * currentValue.price), 0)

        const payload = {
            cartItems: newCartItems,
            cartTotal: newCartTotal,
            cartCount: newCartCount
        }
        dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, payload));
    }

    const value = {
        isCartOpen,
        toggleCart,
        cartItems,
        addItemToCart,
        removeItemFromCart,
        clearItemFromCart,
        cartCount,
        cartTotal
    }
    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}

