import { motion } from "framer-motion";
import { useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase.config';
import { useNavigate, Link } from "react-router-dom";
import { toast } from 'react-toastify';
import { FormInput } from "../components/styled-components/Forms/FormContainer";
import arrowRight from '../assets/svg/keyboardArrowRightIcon.svg';
import homeIcon from '../assets/svg/homeIcon.svg';

const Profile = () => {
    const auth = getAuth();

    const [changeDetails, setChangeDetails] = useState(false);

    const [formData, setFormData] = useState({
        name: auth.currentUser.displayName,
        email: auth.currentUser.email
    });

    const { name, email } = formData;

    const navigate = useNavigate();

    const onLogout = () => {
        auth.signOut();

        toast.info('Você foi deslogado!');

        navigate('/login');
    };

    const onSubmit = async () => {
        try {
            if(auth.currentUser.displayName !== name) {
                // Atualizar o displayName
                await updateProfile(auth.currentUser, {
                    displayName: name
                });

                // Atualizar no Firestore criando uma referência do usuário
                // doc(base de dados, coleção, id do user)
                const userRef = doc(db, 'users', auth.currentUser.uid);
                await updateDoc(userRef, {
                    name
                });
            };
        } catch (error) {
            toast.error('Ocorreu um erro na atualização do seus dados..');
        };
    };

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value
        }))
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: '15px' }}
            animate={{ opacity: 1, y: '0px' }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            exit={{ opacity: 0, y: '15px' }}
        >
            <div className="profile">
                <header className="profileHeader">
                    <p className="pageHeader">
                        Meu perfil
                    </p>
                    <button type="button" onClick={ onLogout } className="logOut">
                        Sair
                    </button>
                </header>

                <main>
                    <div className="profileDetailsHeader">
                        <p className="profileDetailsText">
                            Dados pessoais
                        </p>

                        <p 
                            className="changePersonalDetails" 
                            onClick={() => {
                                changeDetails && onSubmit();
                                setChangeDetails((prevState) => !prevState);
                            }}
                        >
                            {changeDetails ? 'Feito!' : 'Alterar'}
                        </p>
                    </div>

                    <div className="profileCard">
                        <form>
                            <p style={{ margin: '0 0 .5rem 0' }}>Nome</p>
                            <FormInput 
                                type="text" 
                                id="name" 
                                disabled={ !changeDetails }
                                value={ name }
                                onChange={ onChange }
                            />

                            <p style={{ margin: '0 0 .5rem 0' }}>E-mail</p>
                            <FormInput 
                                type="email" 
                                id="email"
                                disabled={ !changeDetails }
                                value={ email }
                                onChange={ onChange }
                            />
                        </form>
                    </div>

                    <Link to='/nova-oferta' className='createListing'>
                        <img src={ homeIcon } alt="Home" />
                        <p>Venda ou alugue o seu imóvel.</p>
                        <img src={ arrowRight } alt="Seta direita" />
                    </Link>
                </main>
            </div>
        </motion.div>
    )
}

export default Profile;
