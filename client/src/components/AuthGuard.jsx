// AuthGuard.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthGuard = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check for access and refresh tokens in localStorage
    const accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');

    // Redirect to login if tokens are missing
    if (!accessToken || !refreshToken) {
      navigate('/login');
    }
  }, [navigate]);

  return children; // Render children if tokens are present
};

export default AuthGuard;
