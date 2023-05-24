import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useUserId from '../../hooks/useUserId';

export const useTrustContactEmailQuery = (data: {
  trustId?: number
}) => {
  const userId = useUserId();

  return useQuery({
    queryKey: ['trust', 'email', data.trustId, userId],
    queryFn: () => axios.request({
      url: '/trust/config/getExclusiveMailbox',
      method: 'get',
      params: data,
    }),
    enabled: !!userId,
  });
};
