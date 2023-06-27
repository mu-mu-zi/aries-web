import { useEffect, useMemo, useState } from 'react';
import { useUserInfoQuery } from '../../api/user/user';
import { useAppSelector } from '../../state';

export default function useAuthToken() {
  return useAppSelector((state) => state.user.token);
}

export const containsToken = () => !!localStorage.getItem('TOKEN');
