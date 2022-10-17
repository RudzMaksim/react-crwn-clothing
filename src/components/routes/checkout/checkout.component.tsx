import './checkout.styles.scss'
import CheckoutItem from "../../checkout-item/checkout-item.component";
import { useSelector } from "react-redux";
import { cartItemsSelector, cartTotalSelector } from "../../../store/cart/cart.selector";
import PaymentForm from "../../payment-form/payment-form.component";

const Checkout = () => {
    const cartItems = useSelector(cartItemsSelector)
    const cartTotal = useSelector(cartTotalSelector)

    return (
        <div className='checkout-container'>
            <div className='checkout-header'>
                <div className='header-block'>
                    <span>Product</span>
                </div>
                <div className='header-block'>
                    <span>Description</span>
                </div>
                <div className='header-block'>
                    <span>Quantity</span>
                </div>
                <div className='header-block'>
                    <span>Price</span>
                </div>
                <div className='header-block'>
                    <span>Remove</span>
                </div>
            </div>
            {
                cartItems.map(item => <CheckoutItem item={item} key={item.id}/>)
            }
            <span className='total'>Total: ${cartTotal}
            </span>
            <PaymentForm/>
        </div>
    )
}

export default Checkout;