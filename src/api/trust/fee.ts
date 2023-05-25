import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useUserId from '../../hooks/useUserId';
import { IPage, IResponseData } from '../../interfaces/base';
import { ITrustEstablishment, ITrustExcessFeeRecord, ITrustManageFeeRecord } from '../../interfaces/trust';

/*
* 管理费用列表
* */
export const useTrustManageFeeListQuery = (data: {
  pageIndex: number,
  pageSize: number,
  trustId?: number,
  year?: number
}) => {
  const userId = useUserId();

  return useQuery<IResponseData<IPage<ITrustManageFeeRecord>>>({
    queryKey: ['trust', 'fee', 'manage', data, userId],
    queryFn: () => axios.request({
      url: '/trust/trust/management/fee/list',
      method: 'get',
      params: data,
    }),
    enabled: !!userId && !!data.trustId && !!data.year,
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
  const userId = useUserId();

  return useQuery<IResponseData<IPage<ITrustExcessFeeRecord>>>({
    queryKey: ['trust', 'fee', 'excess', data, userId],
    queryFn: () => axios.request({
      url: '/trust/trust/excess/amount/list',
      method: 'get',
      params: data,
    }),
    enabled: !!userId && !!data.trustId && !!data.year,
  });
};

export const useEstablishmentFeeListQuery = (data: {
  pageIndex: number,
  pageSize: number,
  trustId?: number,
  year?: number
}) => {
  const userId = useUserId();

  return useQuery<IResponseData<IPage<ITrustEstablishment>>>({
    queryKey: ['trust', 'fee', 'establishment', data, userId],
    queryFn: () => axios.request({
      url: '/trust/trust/establishment/fee/list',
      method: 'get',
      params: data,
    }),
    enabled: !!userId && !!data.trustId && !!data.year,
  });
};

export const useTrustFeeStatisticsQuery = (data: {
  trustId: number,
  year: number,
  type?: number
}) => {
  const userId = useUserId();

  return useQuery({
    queryKey: ['trust', 'fee', 'statistics', data, userId],
    queryFn: () => axios.request({
      url: '/trust/trust/fee/statistics',
      method: 'get',
      params: data,
    }),
    enabled: !!userId && !!data.trustId && !!data.type,
  });
};
