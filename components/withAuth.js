import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { auth } from './firebase'; // Adjust the path
import { onAuthStateChanged } from 'firebase/auth';

const withAuth = (WrappedComponent) => {
  const Wrapper = (props) => {
    const router = useRouter();

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (!user) {
          // User is not signed in.
          router.replace('/login');
        }
      });
      return () => unsubscribe();
    }, [router]);

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuth;