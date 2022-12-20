import { motion } from "framer-motion";

const Profile = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: '15px' }}
            animate={{ opacity: 1, y: '0px' }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            exit={{ opacity: 0, y: '15px' }}
        >
            <h1>Perfil</h1>
        </motion.div>
    );
}

export default Profile;
