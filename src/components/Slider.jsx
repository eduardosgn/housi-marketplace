import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase.config';
import { Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/a11y';
import Spinner from './Spinner';

const Slider = () => {
    const [loading, setLoading] = useState(true);
    const [listings, setListings] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchListings = async () => {
            const listingsRef = collection(db, 'listings');
            const q = query(listingsRef, orderBy('timestamp', 'desc'), limit(5));
            const querySnapshot = await getDocs(q);

            let listings = [];

            querySnapshot.forEach((doc) => {
                return listings.push({
                    id: doc.id,
                    data: doc.data()
                })
            });

            console.log(listings);
            setListings(listings);
            setLoading(false);
        };

        fetchListings();
    }, []);

    if (loading) {
        return <Spinner />
    };

    return listings && (
        <>
            <p className="exploreHeading">Anúncios recomendados</p>

            <Swiper
                modules={[Pagination, Scrollbar, A11y]}
                slidesPerView={1}
                pagination={{clickable: true}}
                style={{ height: '300px', cursor: 'pointer' }}
                a11y={true}
            >
                {listings.map(({ data, id }) => (
                    <SwiperSlide key={id} onClick={ () => navigate(`/categoria/${data.type}/${id}`) }>
                        <div
                            className='swiperSlideDiv'
                            style={{
                                background: `url(${data.imgUrls[0]}) center no-repeat`,
                                backgroundSize: 'cover',
                            }}
                        >
                            <p className="swiperSlideText">{data.name}</p>
                            <p className="swiperSlidePrice">
                                R$ {data.discountedPrice ?? data.regularPrice}{data.type === 'rent' && ' / mês'}
                            </p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
}

export default Slider;