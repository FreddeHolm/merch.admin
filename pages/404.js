import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar'; // Adjust the path if needed

const Custom404 = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/search');
    }, 2000);

    return () => clearTimeout(timer); // Cleanup timeout on component unmount
  }, [router]);

  return (
    <div>
      <Navbar /> {/* Navbar now works without props */}

      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1>Page Not Found</h1>
        <p>Redirecting to search page...</p>
      </div>
    </div>
  );
}

export default Custom404;