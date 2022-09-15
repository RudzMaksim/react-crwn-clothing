import './checkout-item.styles.scss';
import { useContext } from "react";
import { CartContext } from "../context/cart.context";

const CheckoutItem = ({item}) => {
    const {addItemToCart, removeItemFromCart, clearItemFromCart} = useContext(CartContext)

    return (
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={item.imageUrl} alt={item.name}/>
            </div>
            <span className='name'>{item.name}</span>
            <span className='quantity'>
                <div className='arrow' onClick={() => removeItemFromCart(item)}>
                    &#10094;
                </div>
                <span className='value'>{item.quantity}</span>
                <div className='arrow' onClick={() => addItemToCart(item)}>
                    &#10095;
                </div>
            </span>
            <span className='price'>${item.price}</span>
            <span className='remove-button' onClick={() => clearItemFromCart(item)}>&#10005;</span>
        </div>
    );
}

export default CheckoutItem;