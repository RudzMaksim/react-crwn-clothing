import { Routes, Route } from "react-router-dom";
import { lazy, useEffect, Suspense } from "react";
import { checkUserSession } from "./store/user/user.action";
import { useDispatch } from "react-redux";
import Spinner from "./components/spinner/spinner.component";
import { GlobalStyle } from "./global.styles";

const Home = lazy(() => import('./components/routes/home/home.component'));
const Authentication = lazy(() => import('./components/routes/authentication/authentication.component'))
const Navigation = lazy(() => import('./components/routes/navigation/navigation.component'));
const Shop = lazy(() => import('./components/routes/shop/shop.component'));
const Checkout = lazy(() => import('./components/routes/checkout/checkout.component'));

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkUserSession())
    }, []);

    return (
        <div>
            <GlobalStyle/>
            <Suspense fallback={<Spinner/>}>
                <Routes>
                    <Route path='/' element={<Navigation/>}>
                        <Route index element={<Home/>}/>
                        <Route path='shop/*' element={<Shop/>}/>
                        <Route path='auth' element={<Authentication/>}/>
                        <Route path='checkout' element={<Checkout/>}/>
                    </Route>
                </Routes>
            </Suspense>
        </div>
    )
}

export default App;
