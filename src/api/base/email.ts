import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useAuthToken, { containsToken } from '../../hooks/useUserId';

export const useTrustContactEmailQuery = (data: {
  trustId?: number
}) => {
  const userId = useAuthToken();

  return useQuery({
    queryKey: ['trust', 'email', data.trustId, userId],
    queryFn: () => axios.request({
      url: '/trust/config/getExclusiveMailbox',
      method: 'get',
      params: data,
    }),
    enabled: containsToken(),
  });
};
