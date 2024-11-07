import  { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Player from './pages/Player/Player';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(false); // Loading is complete once auth state is known

      if (user && window.location.pathname === '/login') {
        navigate('/'); // Redirect to home if logged in and on the login page
      } else if (!user && window.location.pathname !== '/login') {
        navigate('/login'); // Redirect to login if not authenticated and not already on the login page
      }
    });

    return () => unsubscribe(); // Clean up the subscription on unmount
  }, [navigate]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <ToastContainer theme='dark' />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/player' element={<Player />} />
        <Route path='/player/:id' element={<Player />} />
      </Routes>
    </div>
  );
}

export default App;
