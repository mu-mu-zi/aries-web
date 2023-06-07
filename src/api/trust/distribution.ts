import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useAuthToken, { containsToken } from '../../hooks/useUserId';
import { IPage, IResponseData } from '../../interfaces/base';
import { IDistribution, IDistributionBill } from '../../interfaces/trust';

/*
* 获取分配计划列表
* */
export const useDistributionListQuery = (data: {
  pageIndex?: number
  pageSize?: number
  trustId?: number
}) => {
  const userId = useAuthToken();

  return useQuery<IResponseData<IPage<IDistribution>>>({
    queryKey: ['trust', 'distribution', 'list', data, userId],
    queryFn: () => axios.request({
      url: '/trust/trust/distribution/plan/list',
      method: 'get',
      params: data,
    }),
    enabled: containsToken() && !!data.trustId,
  });
};

export const useDistributionBillQuery = (data: {
  pageIndex: number,
  pageSize?: number,
  trustId?: number
}) => {
  const userId = useAuthToken();

  return useQuery<IResponseData<IPage<IDistributionBill>>>({
    queryKey: ['trust', 'distribution', 'allocationRecord', data, userId],
    queryFn: () => axios.request({
      url: '/trust/trust/distribution/plan/bill/list',
      method: 'get',
      params: data,
    }),
    enabled: containsToken() && !!data.trustId,
  });
};
