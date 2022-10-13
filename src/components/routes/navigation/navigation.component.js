import { Fragment } from "react";
import { Outlet, Link } from "react-router-dom";
import { ReactComponent as CrownLogo } from "../../../assets/crown.svg";
import CartIcon from "../../cart-icon/cart-icon.component";
import CartDropdown from "../../cart-dropdown/cart-dropdown.component";
import './navigation.styles.scss'
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../../store/user/user.selector";
import { isCartOpenSelector } from "../../../store/cart/cart.selector";
import { signOutStart } from "../../../store/user/user.action";

const Navigation = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser);
    const isCartOpen = useSelector(isCartOpenSelector);
    const signOutUser = () => dispatch(signOutStart());
    return (
        <Fragment>
            <div className='navigation'>
                <Link className='logo-container' to=''>
                    <CrownLogo className='logo'/>
                </Link>
                <div className='nav-links-container'>
                    <Link className='nav-link' to='/shop'>
                        SHOP
                    </Link>
                    {
                        currentUser ? (
                            <span className='nav-link' onClick={signOutUser}>SIGN OUT</span>
                        ) : (
                            <Link className='nav-link' to='/auth'>
                                SIGN IN
                            </Link>
                        )
                    }
                    <CartIcon/>
                </div>
                {isCartOpen && <CartDropdown/>}
            </div>
            <Outlet/>
        </Fragment>
    )
}

export default Navigation