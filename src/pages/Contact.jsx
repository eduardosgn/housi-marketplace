import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase.config';
import { toast } from "react-toastify";

export default function Contact() {
    const [message, setMessage] = useState('');
    const [landlord, setLandlord] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();

    const params = useParams();

    useEffect(() => {
        const getLandlord = async () => {
            const docRef = doc(db, 'users', params.landlordId);
            const docSnapshop = await getDoc(docRef);

            if(docSnapshop.exists()) {
                setLandlord(docSnapshop.data());
            } else {
                toast.error('Não foi possível obter os dados do dono do imóvel');
            };
        };

        getLandlord();
    }, [params.landlordId]);

    const onChange = e => setMessage(e.target.value);

    return (
        <motion.main
            className="pageContainer"
            initial={{ opacity: 0, y: '15px' }}
            animate={{ opacity: 1, y: '0px' }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            exit={{ opacity: 0, y: '15px' }}
        >
            <header>
                <p className="pageHeader">
                    Entrar em contato com o dono do imóvel
                </p>
            </header>

            {landlord !== null && (
                <section>
                    <div className="contactLandlord">
                        <p className="landlordName">{landlord?.name}</p>
                    </div>

                    <form className="messageForm">
                        <div className="messageDiv">
                            <label htmlFor="message" className="messageLabel">
                                Mensagem
                            </label>
                            <textarea name="message" id="message" className="textarea" value={ message } onChange={ onChange }></textarea>
                        </div>

                        <a href={`mailto:${landlord.email}?Subject=${searchParams.get('listingName')}&body=${message}`}>
                            <button className="primaryButton" type="button">Enviar mensagem</button>
                        </a>
                    </form>
                </section>
            )}
        </motion.main>
    );
};
