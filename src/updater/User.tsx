import { useEffect } from 'react';
import { useUserInfoQuery } from '../api/user/user';
import { useMyTrustQuery } from '../api/trust/trust';

export default function User() {
  useUserInfoQuery();

  return null;
}
