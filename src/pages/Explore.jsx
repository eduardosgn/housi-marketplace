import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import rentCategoryImage from '../assets/jpg/rentCategoryImage.jpg';
import sellCategoryImage from '../assets/jpg/sellCategoryImage.jpg';

function Explore() {
    return (
        <motion.div
            initial={{ opacity: 0, y: '15px' }}
            animate={{ opacity: 1, y: '0px' }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            exit={{ opacity: 0, y: '15px' }}
        >
            <div className="explore">
                <header>
                    <p className="pageHeader">Explorar</p>
                </header>

                <main>
                    {/* Slider */}

                    <p className="exploreCategoryHeading">Categorias</p>

                    <div className="exploreCategories">
                        <Link to='/categoria/aluguel'>
                            <img src={ rentCategoryImage } alt="Aluguel" className="exploreCategoryImg" />
                            <p className="exploreCategoryName">Lugares para alugar</p>
                        </Link>

                        <Link to='/categoria/comprar'>
                            <img src={ sellCategoryImage } alt="Comprar" className="exploreCategoryImg" />
                            <p className="exploreCategoryName">Lugares para comprar</p>
                        </Link>
                    </div>
                </main>
            </div>
        </motion.div>
    );
}

export default Explore;