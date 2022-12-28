import Explore from '../pages/Explore';
import ForgotPassword from '../pages/ForgotPassword';
import Offers from '../pages/Offers';
import PrivateRoute from './PrivateRoute';
import Profile from '../pages/Profile';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Category from '../pages/Category';

import { AnimatePresence } from 'framer-motion';
import { useLocation, Routes, Route } from "react-router-dom";

const AnimatedRoute = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode={ 'wait' }>
            <Routes location={location} key={ location.pathname }>
                <Route path='/' element={ <Explore /> } />
                <Route path='/categoria/:nomeCategoria' element={ <Category /> } />
                <Route path='/esqueceu-senha' element={ <ForgotPassword /> } />
                <Route path='/ofertas' element={ <Offers /> } />
                <Route path='/perfil' element={ <PrivateRoute /> }>
                    <Route path='/perfil' element={ <Profile /> } />
                </Route>
                <Route path='/login' element={ <SignIn /> } />
                <Route path='/registrar' element={ <SignUp /> } />
            </Routes>
        </AnimatePresence>
    );
}

export default AnimatedRoute;