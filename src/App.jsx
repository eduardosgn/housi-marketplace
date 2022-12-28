import Navbar from "./components/Navbar";

import { BrowserRouter } from "react-router-dom";
import AnimatedRoute from "./components/AnimatedRoute";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <>
            <BrowserRouter>
                <AnimatedRoute />
                <Navbar />
            </BrowserRouter>

            <ToastContainer />
        </>
    );
};

export default App;