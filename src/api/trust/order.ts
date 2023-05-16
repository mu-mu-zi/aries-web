import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useUserId from '../../hooks/useUserId';
import { IPage, IResponseData } from '../../interfaces/base';
import { ILaw, IReport, ITrustFee } from '../../interfaces/trust';

/*
* 账单列表
*  */
export const useLedgerOrderListQuery = (data: {
  pageIndex: number,
  pageSize?: number,
  trustId?: number
}) => {
  const userId = useUserId();

  return useQuery({
    queryKey: ['trust', 'order', data, userId],
    queryFn: () => axios.request({
      url: '/trust/trust/bill/list',
      method: 'get',
      params: data,
    }),
    enabled: !!userId && !!data.trustId,
  });
};

export const useExcessFeeListQuery = (data: {
  pageIndex: number,
  pageSize?: number,
  trustId?: number
}) => {
  const userId = useUserId();

  return useQuery({
    queryKey: ['trust', 'order', 'excess', data, userId],
    queryFn: () => axios.request({
      url: '/trust/trust/excess/amount/list',
      method: 'get',
      params: data,
    }),
    enabled: !!userId && !!data.trustId,
  });
};

export const useManagementFeeListQuery = (data: {
  pageIndex: number,
  pageSize?: number,
  trustId?: number
}) => {
  const userId = useUserId();

  return useQuery({
    queryKey: ['trust', 'order', 'management', data, userId],
    queryFn: () => axios.request({
      url: '/trust/trust/excess/amount/list',
      method: 'get',
      params: data,
    }),
    enabled: !!userId && !!data.trustId,
  });
};

export const useTrustFeeListQuery = (data: {
  trustId?: number
}) => {
  const userId = useUserId();

  return useQuery<IResponseData<ITrustFee[]>>({
    queryKey: ['trust', 'order', 'trust', data, userId],
    queryFn: () => axios.request({
      url: '/trust/trust/trustFeeList',
      method: 'get',
      params: data,
    }),
    enabled: !!userId && !!data.trustId,
  });
};

/*
* 信托报告
* */
export const useTrustReportListQuery = (data: {
  pageIndex?: number,
  pageSize?: number,
  trustId?: number
}) => {
  const userId = useUserId();

  return useQuery<IResponseData<IPage<IReport>>>({
    queryKey: ['trust', 'report', data, userId],
    queryFn: () => axios.request({
      url: '/trust/report/list',
      method: 'get',
      params: data,
    }),
    enabled: !!userId && !!data.trustId,
  });
};

export const useTrustLawListQuery = (data: {
  pageIndex?: number,
  pageSize?: number,
  trustId?: number
}) => {
  const userId = useUserId();

  return useQuery<IResponseData<IPage<ILaw>>>({
    queryKey: ['trust', 'law', data, userId],
    queryFn: () => axios.request({
      url: '/trust/law/list',
      method: 'get',
      params: data,
    }),
    enabled: !!userId && !!data.trustId,
  });
};
