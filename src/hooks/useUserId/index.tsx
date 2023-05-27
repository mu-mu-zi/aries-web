import { useEffect, useMemo, useState } from 'react';
import { useUserInfoQuery } from '../../api/user/user';

export default function useAuthToken() {
  const [token, setToken] = useState<string | null>();

  useEffect(() => {
    const token = localStorage.getItem('TOKEN');
    if (token) {
      setToken(token);
    }

    const handleStorage = (event: any) => {
      if (event.key === 'TOKEN') {
        if (event.newValue) {
          setToken(event.newValue);
        } else {
          setToken(null);
        }
      }
      console.info(`TOKEN => ${event.newValue}`);
    };

    window.addEventListener('storage', handleStorage);
    return () => {
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  return token;
}

export const containsToken = () => !!localStorage.getItem('TOKEN');
