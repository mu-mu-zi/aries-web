import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { use } from 'i18next';
import { useId } from 'react';
import { useUserInfoQuery } from '../user/user';
import useUserId from '../../hooks/useUserId';
import {
  IFiat,
  IMainNet, IMainNetCoin, IPage, IResponseData,
} from '../../interfaces/base';
import {
  IAssetsOverview, ITrustMessage, Trust, TrustDetail,
} from '../../interfaces/trust';
import { IStationMessage } from '../../interfaces/message';

/*
* 信托详情
* */
export const useTrustDetailQuery = (data: {
  trustId: number
}) => {
  const userId = useUserId();

  return useQuery<IResponseData<TrustDetail>>({
    queryKey: ['trust', 'detail', data, userId],
    queryFn: () => axios.request({
      url: '/trust/trust/getTrustInfo',
      method: 'get',
      params: data,
    }),
    enabled: !!userId,
  });
};

/*
* 我的信托列表
* */
export const useMyTrustQuery = () => {
  const userId = useUserId();

  return useQuery<IResponseData<Trust[]>>({
    queryKey: ['trust', 'list', userId],
    queryFn: () => axios.get('/trust/trust/list'),
    enabled: !!userId,
  });
};

/*
* 信托用户列表
* */
export const useTrustUserListQuery = () => {
  const userId = useUserId();

  return useQuery({
    queryKey: ['trust', 'user', 'list', userId],
    queryFn: () => axios.get('/trust/trust/user/trustUserListByUserType'),
    enabled: !!userId,
  });
};

/*
* 信托资产总揽
* */
export const useAssetOverviewQuery = (data: {
  trustId: number
}) => {
  const userId = useUserId();

  return useQuery<IResponseData<IAssetsOverview>>({
    queryKey: ['trust', 'asset', data, userId],
    queryFn: () => axios.request({
      url: '/asset/asset/overview',
      method: 'get',
      params: data,
    }),
    enabled: !!userId && !!data.trustId,
  });
};

/*
* 信托站内信
* */
export const useTrustMessageListQuery = (data: {
  trustId?: number,
  pageIndex: number,
  pageSize?: number
}) => {
  const userId = useUserId();

  return useQuery<IResponseData<IPage<IStationMessage>>>({
    queryKey: ['trust', 'notify', data, userId],
    queryFn: () => axios.request({
      url: '/trust/stationMessage/list',
      method: 'get',
      params: data,
    }),
    enabled: !!userId && !!data.trustId,
  });
};

/*
* 获取充值地址
* */
// export const useAssesRechargeAddressQuery = (data: {
//   coinId?: number,
//   trustId?: number
// }) => {
//   const userId = useUserId();
//
//   return useQuery({
//     queryKey: ['trust', 'rechargeAddress', data, userId],
//     queryFn: () => axios.post('/asset/asset/rechargeAddress', data),
//     enabled: !!userId && !!data.coinId && !!data.trustId,
//   });
// };

/*
* 获取全部主网
* */
export const useAllMainNetsQuery = () => {
  const userId = useUserId();

  return useQuery<IResponseData<IMainNet[]>>({
    queryKey: ['mainNets', userId],
    queryFn: () => axios.get('/asset/asset/mainnets'),
    enabled: !!userId,
  });
};

/*
* 通过主网获取主网币种
* */
export const useAllCoinInMainNetQuery = (data: {
  mainnetId?: number
}) => {
  const userId = useUserId();

  return useQuery<IResponseData<IMainNetCoin[]>>({
    queryKey: ['mainNets', 'coins', data, userId],
    queryFn: () => axios.request({
      url: '/asset/asset/mainnetCoins',
      method: 'get',
      params: data,
    }),
    enabled: !!userId && !!data.mainnetId,
  });
};

/*
* 获取法币列表
* */
export const useFiatListQuery = () => {
  const userId = useUserId();

  return useQuery<IResponseData<IFiat[]>>({
    queryKey: ['fiat', 'list', useId()],
    queryFn: () => axios.get('/asset/asset/legalCoins'),
    enabled: !!userId,
  });
};
