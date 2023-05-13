import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useId } from 'react';
import useUserId from '../../hooks/useUserId';
import { IResponseData } from '../../interfaces/base';
import { IBank } from '../../interfaces/asset';

export const useAssetByCoinId = (data: {
  mainnetCoinId?: number,
  trustId?: number
}) => {
  const userId = useUserId();

  return useQuery({
    queryKey: ['asset', 'rechargeAddress', data, userId],
    queryFn: () => axios.post('/asset/asset/rechargeAddress', data),
    enabled: !!useId() && !!data.mainnetCoinId && !!data.trustId,
  });
};

export const useAllBankQuery = (data: {
  trustId?: number
}) => {
  const userId = useUserId();

  return useQuery<IResponseData<IBank[]>>({
    queryKey: ['asset', 'bankList', data, userId],
    queryFn: () => axios.request({
      url: '/asset/asset/banks',
      method: 'get',
      params: data,
    }),
    enabled: !!data.trustId && !!userId,
  });
};
