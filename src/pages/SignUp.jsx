import { motion } from "framer-motion";

import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { db } from '../firebase.config';

import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

import ArrowRightIcon from '../assets/svg/keyboardArrowRightIcon.svg';

import { HeaderContainer, HeaderTitle } from '../components/styled-components/SignIn/HeaderContainer';
import { FormContainer, FormInput, FormPasswordContainer, FormPasswordInput, FormRevealPasswordIcon } from '../components/styled-components/SignIn/FormContainer';

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

            navigate('/');
        } catch (error) {
            console.log(error);
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

                        <FormRevealPasswordIcon 
                            xmlns="http://www.w3.org/2000/svg" 
                            height="24px" 
                            viewBox="0 0 24 24" 
                            width="24px" 
                            fill="#fff" 
                            onClick={() => setShowPassword((prevState) => !prevState)}
                        >
                            <path d="M0 0h24v24H0z" fill="none"/>
                            <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                        </FormRevealPasswordIcon>

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