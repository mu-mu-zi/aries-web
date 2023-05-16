import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useUserId from '../../hooks/useUserId';
import { IPage, IResponseData } from '../../interfaces/base';
import { IDistribution } from '../../interfaces/trust';

/*
* 获取分配计划列表
* */
export const useDistributionListQuery = (data: {
  pageIndex?: number
  pageSize?: number
  trustId?: number
}) => {
  const userId = useUserId();

  return useQuery<IResponseData<IPage<IDistribution>>>({
    queryKey: ['trust', 'distribution', data, userId],
    queryFn: () => axios.request({
      url: '/trust/trust/distribution/plan/list',
      method: 'get',
      params: data,
    }),
    enabled: !!userId && !!data.trustId,
  });
};
