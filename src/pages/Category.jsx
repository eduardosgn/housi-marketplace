import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, getDocs, query, where, orderBy, limit, startAfter } from 'firebase/firestore';
import { db } from '../firebase.config';
import { toast } from "react-toastify";
import Spinner from '../components/Spinner';

function Category() {
    const [listings, setListings] = useState(null);
    const [loading, setLoading] = useState(true);

    const params = useParams();

    useEffect(() => {
        const fetchListings = async () => {
            try {
                // Pegar referencia da coleção listings
                const listingsRef = collection(db, 'listings');

                // Criar um query
                const q = query(
                    listingsRef, 
                    where('type', '==', params.nomeCategoria), 
                    orderBy('timestamp', 'desc'), 
                    limit(10)
                );

                // Executar o query
                const querySnap = await getDocs(q);

                const listings = [];
                querySnap.forEach((doc) => {
                    return listings.push({
                        id: doc.id,
                        data: doc.data()
                    })
                });

                setListings(listings);
                setLoading(false);
            } catch (error) {
                toast.error('Não foi possível pegar a lista..');
            };
        };

        fetchListings();
    }, [params.nomeCategoria]);

    return (
        <motion.div
            initial={{ opacity: 0, y: '15px' }}
            animate={{ opacity: 1, y: '0px' }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            exit={{ opacity: 0, y: '15px' }}
        >
            <div className="category">
                <header>
                    <p className="pageHeader">
                        { params.nomeCategoria === 'rent' ? 'Lugares para alugar' : 'Lugares para comprar' }
                    </p>
                </header>

                {loading ? (
                    <Spinner />
                ) : listings && listings.length > 0 ? (
                    <>
                        <main>
                            <ul className="categoryListings">
                                {listings.map((listing) => (
                                    <h3 key={ listing.id }>{ listing.data.name }</h3>
                                ))}
                            </ul>
                        </main>
                    </>
                ) : (
                    <p>Sem ofertas para { params.nomeCategoria === 'rent' ? 'alugueis' : 'compras'}</p>
                )}
            </div>
        </motion.div>
    );
}

export default Category;