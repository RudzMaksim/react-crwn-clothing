import './cart-icon.styles.scss'
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg'
import { useContext } from "react";
import { CartContext } from "../context/cart.context";

const CartIcon = () => {
    const {isCartOpen, cartCount, setIsCartOpen} = useContext(CartContext)

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
    }

    return (
        <div className='cart-icon-container' onClick={toggleCart}>
            <ShoppingIcon className='shopping-icon'/>
            <span
                className='item-count'>{cartCount}</span>
        </div>
    )
}

export default CartIcon