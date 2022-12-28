import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { toast } from 'react-toastify';
import { FormInput } from "../components/styled-components/Forms/FormContainer";

const ForgotPassword = () => {
    const [email, setEmail] = useState('');

    const onChange = e => setEmail(e.target.value);

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const auth = getAuth();
            await sendPasswordResetEmail(auth, email);
            toast.success('Um e-mail para resetar sua senha foi enviado!')
        } catch (error) {
            toast.error('Houve um problema ao enviar o e-mail, tente novamente..');
        };
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: '15px' }}
            animate={{ opacity: 1, y: '0px' }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            exit={{ opacity: 0, y: '15px' }}
        >
            <div className="pageContainer">
                <header>
                    <p className="pageHeader">Esqueci a minha senha</p>
                    <p>Insira o seu melhor endereço de e-mail para resetar a sua senha.</p>
                </header>

                <main>
                    <form onSubmit={onSubmit}>
                        <FormInput type="email" placeholder="Seu e-mail" id="email" value={email} onChange={onChange} />

                        <Link className="forgotPasswordLink" to='/login'>
                            Ir para o login
                        </Link>

                        <div className="signInBar">
                            <div className="signInText">
                                Enviar link para resetar senha
                            </div>

                            <button className="signInButton">
                                <svg xmlns="http://www.w3.org/2000/svg" height="34px" viewBox="0 0 24 24" width="34px" fill="#fff">
                                    <path d="M0 0h24v24H0V0z" fill="none"/>
                                    <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                                </svg>
                            </button>
                        </div>
                    </form>
                </main>
            </div>
        </motion.div>
    );
};

export default ForgotPassword;
