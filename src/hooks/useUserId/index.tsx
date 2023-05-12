import { useMemo } from 'react';
import { useUserInfoQuery } from '../../api/user/user';

export default function useUserId() {
  const userQuery = useUserInfoQuery();
  return useMemo(() => userQuery.data?.data?.id, [userQuery.data?.data]);
}
