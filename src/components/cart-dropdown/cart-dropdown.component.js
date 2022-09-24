import './cart-dropdown.styles.scss';
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { cartItemsSelector } from "../../store/cart/cart.selector";

const CartDropdown = () => {
    const cartItems = useSelector(cartItemsSelector)

    return (
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
                {
                    cartItems.length > 0 ?
                        cartItems.map(item => <CartItem key={item.id} cartItem={item}/>)
                        :
                        <span className='empty-message'>Your cart is empty</span>
                }
            </div>
            {
               cartItems.length > 0 &&
                <Link to="/checkout">
                    <Button text='Go to checkout' buttonType={BUTTON_TYPE_CLASSES.inverted}/>
                </Link>
            }
        </div>
    )
}

export default CartDropdown;