import Navbar from "./components/Navbar";

import { BrowserRouter } from "react-router-dom";
import AnimatedRoute from "./components/AnimatedRoute";

function App() {
    return (
        <BrowserRouter>
            <AnimatedRoute />
            <Navbar />
        </BrowserRouter>
    );
};

export default App;