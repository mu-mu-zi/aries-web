import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useAuthToken, { containsToken } from '../../hooks/useUserId';
import { IResponseData } from '../../interfaces/base';
import { ITrustAssetRecode } from '../../interfaces/trust';

export const useTrustAssetDeclareQuery = (data: {
  pageIndex: number,
  pageSize?: number,
  trustId?: number
}) => useQuery({
  queryKey: ['trust', 'asset', data],
  queryFn: () => axios.request({
    url: '/trust/assetDeclare/list',
    method: 'get',
    params: data,
  }),
  enabled: containsToken() && !!data.trustId,
});

export const useAssetDeclareDetailQuery = (data: {
  recordId?: number
}) => useQuery<IResponseData<ITrustAssetRecode>>({
  queryKey: ['trust', 'asset', data],
  queryFn: () => axios.request({
    url: '/trust/assetDeclare/detail',
    method: 'get',
    params: data,
  }),
  enabled: containsToken() && !!data.recordId,
});
