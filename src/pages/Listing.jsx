import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getDoc, doc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../firebase.config';
import Spinner from '../components/Spinner';
import shareIcon from '../assets/svg/shareIcon.svg';

export default function Listing() {
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [shareLinkCopied, setShareLinkCopied] = useState(false);

    const navigate = useNavigate();
    const params = useParams();
    const auth = getAuth();

    useEffect(() => {
        const fetchListing = async () => {
            const docRef = doc(db, 'listings', params.idAnuncio);
            const docSnapshot = await getDoc(docRef);

            if (docSnapshot.exists()) {
                console.log(docSnapshot.data());
                setListing(docSnapshot.data());
                setLoading(false);
            };
        };

        fetchListing();
    }, [navigate, params.idAnuncio]);

    if(loading) {
        return <Spinner />
    };

    return (
        <motion.main
            initial={{ opacity: 0, y: '15px' }}
            animate={{ opacity: 1, y: '0px' }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            exit={{ opacity: 0, y: '15px' }}
        >
            {/* Slider */}

            <div className="shareIconDiv" onClick={() => {
                navigator.clipboard.writeText(window.location.href);

                setShareLinkCopied(true);

                setTimeout(() => {
                    setShareLinkCopied(false);
                }, 2000);
            }}>
                <img src={shareIcon} alt="Share" />
            </div>

            {shareLinkCopied &&
                <p className="linkCopied">Link copiado!</p>
            }

            <div className="listingDetails">
                <p className="listingName">
                    { listing.name } - R$
                    { listing.offer
                        ? listing.discountedPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                        : listing.regularPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                    }
                </p>

                <p className="listingLocation">{ listing.location }</p>

                <p className="listingType">
                    Para {listing.type === 'rent' ? 'alugar' : 'vender'}
                </p>

                {listing.offer && (
                    <p className="discountPrice">
                        R${listing.regularPrice - listing.discountedPrice}
                    </p>
                )}

                <ul className="listingDetailsList">
                    <li>{listing.bedrooms > 1 ? `${listing.bedrooms} quartos` : '01 quarto'}</li>

                    <li>{listing.bathrooms > 1 ? `${listing.bathrooms} banheiros` : '01 banheiro'}</li>

                    <li>{listing.parking > 1 && 'Com garagem'}</li>

                    <li>{listing.furnished > 1 && 'Mobiliado'}</li>
                </ul>

                <p className="listingLocationTitle">
                    Localização do imóvel
                </p>

                {/* Mapa */}

                {auth.currentUser?.uid !== listing.userRef && (
                    <Link to={`/contact/${listing.userRef}?listingName=${listing.name}`} className='primaryButton'>
                        Entrar em contato com o dono do imóvel
                    </Link>
                )}
            </div>
        </motion.main>
    );
};
