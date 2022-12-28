import { useLocation, useNavigate } from 'react-router-dom';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';
import googleIcon from '../assets/svg/googleIcon.svg';

function OAuth() {
    const navigate = useNavigate();
    const location = useLocation();

    const onGoogleAuth = async () => {
        try {
            const auth = getAuth();
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            // Checar pelo user
            const userRef = doc(db, 'users', user.uid);
            const userSnap = await getDoc(userRef);

            // Se o user não existe, criar o user
            if(!userSnap.exists()) {
                await setDoc(doc(db, 'users', user.uid), {
                    name: user.displayName,
                    email: user.email,
                    timestamp: serverTimestamp()
                });
            };

            navigate('/');
        } catch (error) {
            toast.error('Não foi possível entrar com o Google, tente novamente..');
        };
    };

    return (
        <div className='socialLogin'>
            <p>{location.pathname === '/registrar' ? 'Se registrar com' : 'Entrar com'}</p>
            <button className="socialIconDiv" onClick={ onGoogleAuth }>
                <img className='socialIconImg' src={ googleIcon } alt="Google" />
            </button>
        </div>
    );
};

export default OAuth;