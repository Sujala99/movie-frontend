import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../UserContext';

export default function Logout() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Clear user context or perform logout actions only once
    setUser(null);
    localStorage.removeItem('token'); // Clear token from storage

    // Navigate back to home or login page after logout
    navigate('/', { replace: true });
  }, [setUser, navigate]); // Empty dependency array ensures it runs only once

  return null;
}
