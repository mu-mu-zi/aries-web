import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useUserId from '../../hooks/useUserId';
import { IPage, IResponseData } from '../../interfaces/base';
import { IInvestment, IInvestmentApproveRecode, IInvestmentOrderRecode } from '../../interfaces/trust';

/*
* 投资指令
* */
export const useInvestmentOrderQuery = (data: {
  pageIndex: number,
  pageSize?: number,
  trustId?: number
}) => {
  const userId = useUserId();

  return useQuery<IResponseData<IPage<IInvestment>>>({
    queryKey: ['trust', 'investment', data, userId],
    queryFn: () => axios.request({
      url: '/trust/trust/investment/list',
      method: 'get',
      params: data,
    }),
    enabled: !!userId && !!data.pageIndex && !!data.trustId,
  });
};

/*
* 审批记录
* */
export const useInvestmentApprovalRecodeQuery = (data: {
  pageIndex?: number,
  pageSize?: number,
  trustInvestmentId?: number
}) => {
  const userId = useUserId();

  return useQuery<IResponseData<IPage<IInvestmentApproveRecode>>>({
    queryKey: ['trust', 'investment', 'approvalList', data, userId],
    queryFn: () => axios.request({
      url: '/trust/trust/investment/approval/record/list',
      method: 'get',
      params: data,
    }),
    enabled: !!userId && !!data.trustInvestmentId,
  });
};

/*
* 账单记录
* */
export const useInvestmentOrderRecodeQuery = (data: {
  pageIndex?: number,
  pageSize?: number,
  trustInvestmentId?: number
}) => {
  const userId = useUserId();

  return useQuery<IResponseData<IPage<IInvestmentOrderRecode>>>({
    queryKey: ['trust', 'investment', 'order', 'record', data, userId],
    queryFn: () => axios.request({
      url: '/trust/trust/investment/investment/bill/list',
      method: 'get',
      params: data,
    }),
    enabled: !!userId && !!data.trustInvestmentId,
  });
};
