import './product-card.styles.scss'
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../../store/cart/cart.action";
import { cartItemsSelector } from "../../store/cart/cart.selector";

const ProductCard = ({product}) => {
    const {name, imageUrl, price} = product;
    const dispatch = useDispatch();
    const cartItems = useSelector(cartItemsSelector)

    const addProductToCart = () => {
        dispatch(addItemToCart(cartItems, product));
    }

    return (
        <div className="product-card-container">
            <img src={imageUrl} alt={name}/>
            <div className='footer'>
                <span className='name'>{name}</span>
                <span className='price'>${price}</span>
            </div>
            <Button text="Add to cart" buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addProductToCart}/>
        </div>
    )
}

export default ProductCard;