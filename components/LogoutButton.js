import { useRouter } from 'next/router';
import { auth } from './firebase';
import { signOut } from 'firebase/auth';

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/login');
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;