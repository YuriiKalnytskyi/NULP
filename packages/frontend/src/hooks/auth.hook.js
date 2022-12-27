import { useCallback, useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';

export const useAuth = () => {
  const [token, setToken] = useState(null);

  const login = useCallback((accessToken) => {
    setToken(accessToken);

    const decoded = jwt_decode(accessToken);

    localStorage.setItem('role', decoded.type);
    localStorage.setItem('accessToken', accessToken);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    localStorage.removeItem('role');
    localStorage.removeItem('accessToken');
  }, []);

  useEffect(() => {
    const data = localStorage.getItem('accessToken');
    if (data) {
      login(data);
    }
  }, [login]);

  return { login, token, logout };
};
