import './checkout-item.styles.scss';
import { addItemToCart, clearItemFromCart, removeItemFromCart } from "../../store/cart/cart.action";
import { useDispatch, useSelector } from "react-redux";
import { cartItemsSelector } from "../../store/cart/cart.selector";
import { CheckoutProduct } from "../../interfaces/product";

type CheckoutItemProps = {
    item: CheckoutProduct
}

const CheckoutItem = ({item}: CheckoutItemProps) => {
    const cartItems = useSelector(cartItemsSelector)
    const dispatch = useDispatch()

    return (
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={item.imageUrl} alt={item.name}/>
            </div>
            <span className='name'>{item.name}</span>
            <span className='quantity'>
                <div className='arrow' onClick={() => dispatch(removeItemFromCart(cartItems, item))}>
                    &#10094;
                </div>
                <span className='value'>{item.quantity}</span>
                <div className='arrow' onClick={() => dispatch(addItemToCart(cartItems, item))}>
                    &#10095;
                </div>
            </span>
            <span className='price'>${item.price}</span>
            <span className='remove-button' onClick={() => dispatch(clearItemFromCart(cartItems, item))}>&#10005;</span>
        </div>
    );
}

export default CheckoutItem;