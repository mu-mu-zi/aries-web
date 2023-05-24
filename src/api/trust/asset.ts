import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useUserId from '../../hooks/useUserId';

export const useTrustAssetDeclareQuery = (data: {
  pageIndex: number,
  pageSize?: number,
  trustId?: number
}) => {
  const userId = useUserId();

  return useQuery({
    queryKey: ['trust', 'asset', data, userId],
    queryFn: () => axios.request({
      url: '/trust/assetDeclare/list',
      method: 'get',
      params: data,
    }),
    enabled: !!userId && !!data.trustId,
  });
};

export const useAssetDeclareDetailQuery = (data: {
  recordId?: number
}) => {
  const userId = useUserId();

  return useQuery({
    queryKey: ['trust', 'asset', data, userId],
    queryFn: () => axios.request({
      url: '/trust/assetDeclare/detail',
      method: 'get',
      params: data,
    }),
    enabled: !!userId && !!data.recordId,
  });
};
