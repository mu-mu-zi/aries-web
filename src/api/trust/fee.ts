import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useAuthToken, { containsToken } from '../../hooks/useUserId';
import { IPage, IResponseData } from '../../interfaces/base';
import { ITrustEstablishment, ITrustExcessFeeRecord, ITrustManageFeeRecord } from '../../interfaces/trust';
import { IExpenseRatio } from '../../interfaces/fee';

/*
* 管理费用列表
* */
export const useTrustManageFeeListQuery = (data: {
  pageIndex: number,
  pageSize: number,
  trustId?: number,
  year?: number
}) => {
  const userId = useAuthToken();

  return useQuery<IResponseData<IPage<ITrustManageFeeRecord>>>({
    queryKey: ['trust', 'fee', 'manage', data, userId],
    queryFn: () => axios.request({
      url: '/trust/trust/management/fee/list',
      method: 'get',
      params: data,
    }),
    enabled: containsToken() && !!data.trustId && !!data.year,
  });
};

/*
* 超额转账费用明细
* */
export const useTrustExcessFeeListQuery = (data: {
  pageIndex: number,
  pageSize: number,
  trustId?: number,
  year?: number
}) => {
  const userId = useAuthToken();

  return useQuery<IResponseData<IPage<ITrustExcessFeeRecord>>>({
    queryKey: ['trust', 'fee', 'excess', data, userId],
    queryFn: () => axios.request({
      url: '/trust/trust/excess/amount/list',
      method: 'get',
      params: data,
    }),
    enabled: containsToken() && !!data.trustId && !!data.year,
  });
};

export const useEstablishmentFeeListQuery = (data: {
  pageIndex: number,
  pageSize: number,
  trustId?: number,
  year?: number
}) => useQuery<IResponseData<IPage<ITrustEstablishment>>>({
  queryKey: ['trust', 'fee', 'establishment', data],
  queryFn: () => axios.request({
    url: '/trust/trust/establishment/fee/list',
    method: 'get',
    params: data,
  }),
  enabled: containsToken() && !!data.trustId && !!data.year,
});

export const useTrustFeeStatisticsQuery = (data: {
  trustId: number,
  year?: number,
  quarter?: number,
  month?: number,
  type?: number
}) => useQuery({
  queryKey: ['trust', 'fee', 'statistics', data],
  queryFn: () => axios.request({
    url: '/trust/trust/fee/statistics',
    method: 'get',
    params: data,
  }),
  enabled: containsToken() && !!data.trustId && !!data.type && !!data.year,
});

/*
* 获取费率配置参数
* */
export const useExpenseRatioQuery = () => useQuery<IResponseData<IExpenseRatio[]>>({
  queryKey: ['trust', 'fee', 'expenseRatio'],
  queryFn: () => axios.get('/trust/trust/expense/ratio'),
  enabled: containsToken(),
});
