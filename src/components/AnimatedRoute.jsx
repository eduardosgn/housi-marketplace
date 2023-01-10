import Explore from '../pages/Explore';
import ForgotPassword from '../pages/ForgotPassword';
import Offers from '../pages/Offers';
import PrivateRoute from './PrivateRoute';
import Profile from '../pages/Profile';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Category from '../pages/Category';
import CreateListing from '../pages/CreateListing';
import Listing from '../pages/Listing';
import Contact from '../pages/Contact';

import { AnimatePresence } from 'framer-motion';
import { useLocation, Routes, Route } from "react-router-dom";

const AnimatedRoute = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode={ 'wait' }>
            <Routes location={location} key={ location.pathname }>
                <Route path='/' element={ <Explore /> } />
                <Route path='/categoria/:nomeCategoria' element={ <Category /> } />
                <Route path='/categoria/:nomeCategoria/:idAnuncio' element={ <Listing /> } />
                <Route path='/esqueceu-senha' element={ <ForgotPassword /> } />
                <Route path='/ofertas' element={ <Offers /> } />
                <Route path='/perfil' element={ <PrivateRoute /> }>
                    <Route path='/perfil' element={ <Profile /> } />
                </Route>
                <Route path='/login' element={ <SignIn /> } />
                <Route path='/registrar' element={ <SignUp /> } />
                <Route path='/nova-oferta' element={ <CreateListing /> } />
                <Route path='/contact/:landlordId' element={ <Contact /> } />
            </Routes>
        </AnimatePresence>
    );
}

export default AnimatedRoute;