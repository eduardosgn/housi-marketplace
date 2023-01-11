import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, getDocs, query, where, orderBy, limit, startAfter } from 'firebase/firestore';
import { db } from '../firebase.config';
import { toast } from "react-toastify";
import Spinner from '../components/Spinner';
import ListingItem from "../components/ListingItem";

function Category() {
    const [listings, setListings] = useState(null);
    const [loading, setLoading] = useState(true);
    const [lastFetchedListing, setLastFetchedListing] = useState(null);

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
                    limit(5)
                );

                // Executar o query
                const querySnap = await getDocs(q);

                // pegando o último anúncio visível
                const lastVisible = querySnap.docs[querySnap.docs.length - 1];
                setLastFetchedListing(lastVisible);

                const listings = [];
                querySnap.forEach((doc) => {
                    console.log(doc.data());
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

    // Paginação / Carregar mais anúncios
    const onFetchMoreListing = async () => {
        try {
            // Pegar referencia da coleção listings
            const listingsRef = collection(db, 'listings');

            // Criar um query
            const q = query(
                listingsRef, 
                where('type', '==', params.nomeCategoria), 
                orderBy('timestamp', 'desc'),
                startAfter(lastFetchedListing),
                limit(10)
            );

            // Executar o query
            const querySnap = await getDocs(q);

            const lastVisible = querySnap.docs[querySnap.docs.length - 1];
            setLastFetchedListing(lastVisible);

            const listings = [];
            querySnap.forEach((doc) => {
                console.log(doc.data());
                return listings.push({
                    id: doc.id,
                    data: doc.data()
                })
            });

            setListings((prevState) => [...prevState, ...listings]);
            setLoading(false);
        } catch (error) {
            toast.error('Não foi possível pegar a lista..');
        };
    };

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
                                    <ListingItem 
                                        listing={ listing.data } 
                                        id={ listing.id } 
                                        key={ listing.id }
                                    />
                                ))}
                            </ul>
                        </main>

                        <br />

                        {lastFetchedListing && (
                            <p className="loadMore" onClick={onFetchMoreListing}>Carregar mais</p>
                        )}
                    </>
                ) : (
                    <p>Sem ofertas para { params.nomeCategoria === 'rent' ? 'alugueis' : 'compras'}</p>
                )}
            </div>
        </motion.div>
    );
}

export default Category;