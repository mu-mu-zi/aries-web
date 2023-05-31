import { useEffect, useMemo, useState } from 'react';
import { useUserInfoQuery } from '../../api/user/user';
import { useAppSelector } from '../../state';

export default function useAuthToken() {
  const token = useAppSelector((state) => state.user.token);
  // const [token, setToken] = useState<string | null>(localStorage.getItem('TOKEN'));
  //
  // const handler = () => setToken(localStorage.getItem('TOKEN') ?? null);
  //
  // useEffect(() => {
  //   handler();
  //   window.onstorage = () => {
  //     console.log(`TOKEN => ${localStorage.getItem('TOKEN')}`);
  //     handler();
  //   };
  // }, []);

  return token;
}

export const containsToken = () => !!localStorage.getItem('TOKEN');
