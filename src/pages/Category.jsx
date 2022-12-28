import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, getDocs, query, where, orderBy, limit, startAfter } from 'firebase/firestore';
import { db } from '../firebase.config';
import { toast } from "react-toastify";
import Spinner from '../components/Spinner';

function Category() {
    const [listing, setListing] = useState(null);
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

                let listings = [];
                querySnap.forEach((doc) => {
                    console.log('hi');
                    console.log(doc.data());
                });
            } catch (error) {};
        };

        fetchListings();
    });

    return (
        <motion.div
            initial={{ opacity: 0, y: '15px' }}
            animate={{ opacity: 1, y: '0px' }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            exit={{ opacity: 0, y: '15px' }}
        >
            Categoria
        </motion.div>
    );
}

export default Category;