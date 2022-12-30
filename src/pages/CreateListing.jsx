import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Form, useNavigate } from "react-router-dom";
import { FormInput } from "../components/styled-components/Forms/FormContainer";
import Spinner from '../components/Spinner';

function CreateListing() {
    const [loading, setLoading] = useState(false);

    const [geolocationEnabled, setGeolocationEnabled] = useState(true);

    const [formData, setFormData] = useState({
        type: 'rent',
        name: '',
        bedrooms: 1,
        bathrooms: 1,
        parking: false,
        furnished: false,
        address: '',
        offer: false,
        regularPrice: 0,
        discountedPrice: 0,
        images: [],
        latitude: 0,
        longitude: 0
    });

    const {
        type, 
        name, 
        bedrooms, 
        bathrooms, 
        parking, 
        furnished, 
        address, 
        offer, 
        regularPrice, 
        discountedPrice, 
        images, 
        latitude, 
        longitude
    } = formData;

    const auth = getAuth();
    const navigate = useNavigate();
    const isMounted = useRef(true);

    useEffect(() => {
        if (isMounted) {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    setFormData({...formData, userRef: user.uid});
                } else {
                    navigate('/login');
                };
            });
        };

        return () => {
            isMounted.current = false;
        };
    }, [isMounted]);

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    const onMutate = (e) => {
        let boolean = null;

        if (e.target.value === 'true') {
            boolean = true;
        };

        if (e.target.value === 'false') {
            boolean = false;
        };

        // Arquivos
        if (e.target.files) {
            setFormData((prevState) => ({
                ...prevState,
                images: e.target.files
            }));
        };

        // Texto/Booleanos/Números
        if (!e.target.files) {
            setFormData((prevState) => ({
                ...prevState,
                [e.target.id]: boolean ?? e.target.value,
            }));
        };
    };

    if (loading) {
        return <Spinner />
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: '15px' }}
            animate={{ opacity: 1, y: '0px' }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            exit={{ opacity: 0, y: '15px' }}
        >
            <div className="profile">
                <header>
                    <p className="pageHeader">
                        Criar um novo classificado de imóvel
                    </p>
                </header>

                <main>
                    <form onSubmit={onSubmit}>
                        <label className="formLabel">Vender/Alugar</label>
                        <div className="formButtons">
                            <button 
                                type="button" 
                                className={ type === 'sale' ? 'formButtonActive' : 'formButton' }
                                id='type'
                                value='sale'
                                onClick={ onMutate }
                            >
                                Vender
                            </button>

                            <button 
                                type="button" 
                                className={ type === 'rent' ? 'formButtonActive' : 'formButton' }
                                id='type'
                                value='rent'
                                onClick={ onMutate }
                            >
                                Alugar
                            </button>
                        </div>

                        <label className="formLabel">Nome</label>
                        <input 
                            className='formInputName'
                            type="text"
                            id="name"
                            value={ name }
                            onChange={ onMutate }
                            maxLength='32'
                            minLength='10'
                            required
                        />

                        <div className='formRooms flex'>
                            <div>
                                <label className='formLabel'>Quartos</label>
                                <input
                                    className='formInputSmall'
                                    type='number'
                                    id='bedrooms'
                                    value={bedrooms}
                                    onChange={onMutate}
                                    min='1'
                                    max='50'
                                    required
                                />
                            </div>

                            <div>
                                <label className='formLabel'>Banheiros</label>
                                <input
                                    className='formInputSmall'
                                    type='number'
                                    id='bathrooms'
                                    value={bathrooms}
                                    onChange={onMutate}
                                    min='1'
                                    max='50'
                                    required
                                />
                            </div>
                        </div>

                        <label className='formLabel'>Vaga de estacionamento</label>
                        <div className='formButtons'>
                            <button
                                className={parking ? 'formButtonActive' : 'formButton'}
                                type='button'
                                id='parking'
                                value={true}
                                onClick={onMutate}
                                min='1'
                                max='50'
                            >
                                Sim
                            </button>

                            <button
                                className={
                                    !parking && parking !== null ? 'formButtonActive' : 'formButton'
                                }
                                type='button'
                                id='parking'
                                value={false}
                                onClick={onMutate}
                            >
                                Não
                            </button>
                        </div>

                        <label className='formLabel'>Mobiliado</label>
                        <div className='formButtons'>
                            <button
                                className={furnished ? 'formButtonActive' : 'formButton'}
                                type='button'
                                id='furnished'
                                value={true}
                                onClick={onMutate}
                            >
                                Sim
                            </button>

                            <button
                                className={
                                    !furnished && furnished !== null
                                    ? 'formButtonActive'
                                    : 'formButton'
                                }
                                type='button'
                                id='furnished'
                                value={false}
                                onClick={onMutate}
                            >
                                Não
                            </button>
                        </div>

                        <label className='formLabel'>Endereço</label>
                        <textarea
                            className='formInputAddress'
                            type='text'
                            id='address'
                            value={address}
                            onChange={onMutate}
                            required
                        />

                        {!geolocationEnabled && (
                            <div className='formLatLng flex'>
                                <div>
                                    <label className='formLabel'>Latitude</label>
                                    <input
                                        className='formInputSmall'
                                        type='number'
                                        id='latitude'
                                        value={latitude}
                                        onChange={onMutate}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className='formLabel'>Longitude</label>
                                    <input
                                        className='formInputSmall'
                                        type='number'
                                        id='longitude'
                                        value={longitude}
                                        onChange={onMutate}
                                        required
                                    />
                                </div>
                            </div>
                        )}

                        <label className='formLabel'>Desconto</label>
                        <div className='formButtons'>
                            <button
                                className={offer ? 'formButtonActive' : 'formButton'}
                                type='button'
                                id='offer'
                                value={true}
                                onClick={onMutate}
                            >
                                Sim
                            </button>

                            <button
                                className={
                                    !offer && offer !== null ? 'formButtonActive' : 'formButton'
                                }
                                type='button'
                                id='offer'
                                value={false}
                                onClick={onMutate}
                            >
                                Não
                            </button>
                        </div>

                        <label className='formLabel'>Preço regular</label>
                        <div className='formPriceDiv'>
                            <input
                                className="formInputSmall"
                                type='number'
                                id='regularPrice'
                                value={regularPrice}
                                onChange={onMutate}
                                min='50'
                                max='750000000'
                                required
                            />
                            {type === 'rent' && <p className='formPriceText'>R$ / Mês</p>}
                        </div>

                        {offer && (
                            <>
                                <label className='formLabel'>Preço com desconto</label>
                                <input
                                    className="formInputSmall"
                                    type='number'
                                    id='discountedPrice'
                                    value={discountedPrice}
                                    onChange={onMutate}
                                    min='50'
                                    max='750000000'
                                    required={offer}
                                />
                            </>
                        )}

                        <label className='formLabel'>Imagens</label>
                        <p className='imagesInfo'>
                            A primeira imagem será a capa (max 6 imagens).
                        </p>
                        <input
                            className='formInputFile'
                            type='file'
                            id='images'
                            onChange={onMutate}
                            max='6'
                            accept='.jpg,.png,.jpeg'
                            multiple
                            required
                        />

                        <button type='submit' className='primaryButton createListingButton'>
                            Criar novo classificado
                        </button>
                    </form>
                </main>
            </div>
        </motion.div>
    );
}

export default CreateListing;