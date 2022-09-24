import './cart-icon.styles.scss'
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg'
import { useDispatch, useSelector } from "react-redux";
import { toggleCart } from "../../store/cart/cart.action";
import { cartCountSelector } from "../../store/cart/cart.selector";

const CartIcon = () => {
    const dispatch = useDispatch()
    const cartCount = useSelector(cartCountSelector)

    return (
        <div className='cart-icon-container' onClick={() => dispatch(toggleCart())}>
            <ShoppingIcon className='shopping-icon'/>
            <span
                className='item-count'>{cartCount}</span>
        </div>
    )
}

export default CartIcon