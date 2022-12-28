import { motion } from "framer-motion";

import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase.config';

import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

import ArrowRightIcon from '../assets/svg/keyboardArrowRightIcon.svg';

import { HeaderContainer, HeaderTitle } from '../components/styled-components/Forms/HeaderContainer';
import { FormContainer, FormInput, FormPasswordContainer, FormPasswordInput, FormRevealPasswordIcon } from '../components/styled-components/Forms/FormContainer';

import { toast } from 'react-toastify';

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const { name, email, password } = formData;

    const navigate = useNavigate();

    const formOnChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const auth = getAuth();

            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            const user = userCredential.user;

            updateProfile(auth.currentUser, {
                displayName: name
            });

            // Salvar o user no firestore
            // Copiar o objeto formData para poder excluir a passagem da senha para o db
            const formDataCopy = { ...formData };
            // Deletando do objeto a senha copiada do formData
            delete formDataCopy.password;
            // Gerando e salvando o momento em que foi feito o processo
            formDataCopy.timestamp = serverTimestamp();
            // setDoc atualiza o db, adicionando o user.uid (novo user único) dentro do collection 'users'
            await setDoc(doc(db, 'users', user.uid), formDataCopy);

            navigate('/');
        } catch (error) {
            toast.error('Algo deu errado no cadastro..');
        };
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            exit={{ opacity: 0 }}
        >
            <motion.div
                initial={{ opacity: 0, y: '-20px' }}
                animate={{ opacity: 1, y: '0px' }}
                transition={{ duration: 1, ease: 'easeInOut' }}
                exit={{ opacity: 0, y: '-20px' }}
            >
                <HeaderContainer>

                    <header>
                        <p style={{ color: '#00cc66' }}>Housi</p>

                        <motion.div
                            style={{ borderBottom: '1px solid #2c2c2c' }}
                            initial={{ x: -2000 }}
                            animate={{ x: 0 }}
                            transition={{ duration: 1, ease: 'easeInOut' }}
                            exit={{ x: -3000 }}
                        >
                        </motion.div>

                        <HeaderTitle>
                            Registre-se!
                        </HeaderTitle>
                    </header>

                </HeaderContainer>
            </motion.div>

            <FormContainer>

                <form onSubmit={onSubmit}>

                    <FormInput 
                        type="text" 
                        placeholder="Seu nome" 
                        id="name" 
                        value={name} 
                        onChange={formOnChange} 
                    />

                    <FormInput 
                        type="email" 
                        placeholder="E-mail" 
                        id="email" 
                        value={email} 
                        onChange={formOnChange} 
                    />

                    <FormPasswordContainer>

                        <FormPasswordInput 
                            type={showPassword ? 'text' : 'password'} 
                            placeholder="Senha" id="password" 
                            value={password} 
                            onChange={formOnChange}
                        />

                        {!showPassword ?
                            <FormRevealPasswordIcon 
                                xmlns="http://www.w3.org/2000/svg" 
                                height="24px" 
                                viewBox="0 0 640 512" 
                                width="24px" 
                                fill="#fff" 
                                onClick={() => setShowPassword((prevState) => !prevState)}
                            >
                                <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM432 256c0 79.5-64.5 144-144 144s-144-64.5-144-144s64.5-144 144-144s144 64.5 144 144zM288 192c0 35.3-28.7 64-64 64c-11.5 0-22.3-3-31.6-8.4c-.2 2.8-.4 5.5-.4 8.4c0 53 43 96 96 96s96-43 96-96s-43-96-96-96c-2.8 0-5.6 .1-8.4 .4c5.3 9.3 8.4 20.1 8.4 31.6z"/>
                            </FormRevealPasswordIcon> :
                            <FormRevealPasswordIcon 
                                xmlns="http://www.w3.org/2000/svg" 
                                height="24px" 
                                viewBox="0 0 640 512" 
                                width="24px" 
                                fill="#fff" 
                                onClick={() => setShowPassword((prevState) => !prevState)}
                            >
                                <path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c5.2-11.8 8-24.8 8-38.5c0-53-43-96-96-96c-2.8 0-5.6 .1-8.4 .4c5.3 9.3 8.4 20.1 8.4 31.6c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zm223.1 298L83.1 161.5c-11 14.4-20.5 28.7-28.4 42.2l339 265.7c18.7-5.5 36.2-13 52.6-21.8zM34.5 268.3c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c3.1 0 6.1-.1 9.2-.2L33.1 247.8c-1.8 6.8-1.3 14 1.4 20.5z"/>
                            </FormRevealPasswordIcon>
                        }


                    </FormPasswordContainer>

                    <Link to='/esqueceu-senha' className='forgotPasswordLink'>
                        Esqueceu sua senha?
                    </Link>

                    <div className="signUpBar">
                        
                        <p className="signUpText">
                            Registrar
                        </p>

                        <button className="signUpButton">
                            <img src={ ArrowRightIcon } />
                        </button>

                    </div>

                </form>

                {/* Google OAuth */}

                <Link to='/login' className='registerLink'>
                    Entrar com a sua conta
                </Link>
            </FormContainer>
        </motion.div>
    );
}

export default SignUp;