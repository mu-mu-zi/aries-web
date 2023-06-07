import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useId } from 'react';
import { useUserInfoQuery } from '../user/user';
import useAuthToken, { containsToken } from '../../hooks/useUserId';
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
  trustId?: number
}) => {
  const userId = useAuthToken();

  return useQuery<IResponseData<TrustDetail>, IResponseData<any>>({
    queryKey: ['trust', 'detail', data, userId],
    queryFn: () => axios.request({
      url: '/trust/trust/getTrustInfo',
      method: 'get',
      params: data,
    }),
    enabled: containsToken() && !!data.trustId,
  });
};

/*
* 我的信托列表
* */
export const useMyTrustQuery = () => useQuery<IResponseData<Trust[]>>({
  queryKey: ['trust', 'list', 'my'],
  queryFn: () => axios.get('/trust/trust/list'),
  enabled: containsToken(),
});

/*
* 信托用户列表
* */
export const useTrustUserListQuery = () => {
  const userId = useAuthToken();

  return useQuery({
    queryKey: ['trust', 'user', 'list', userId],
    queryFn: () => axios.get('/trust/trust/user/trustUserListByUserType'),
    enabled: containsToken(),
  });
};

/*
* 信托资产总揽
* */
export const useAssetOverviewQuery = (data: {
  trustId: number
}) => {
  const userId = useAuthToken();

  return useQuery<IResponseData<IAssetsOverview>>({
    queryKey: ['trust', 'asset', data, userId],
    queryFn: () => axios.request({
      url: '/asset/asset/overview',
      method: 'get',
      params: data,
    }),
    enabled: containsToken() && !!data.trustId,
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
  const userId = useAuthToken();

  return useQuery<IResponseData<IPage<IStationMessage>>>({
    queryKey: ['trust', 'notify', data, userId],
    queryFn: () => axios.request({
      url: '/trust/stationMessage/list',
      method: 'get',
      params: data,
    }),
    enabled: containsToken() && !!data.trustId,
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
  const userId = useAuthToken();

  return useQuery<IResponseData<IMainNet[]>>({
    queryKey: ['mainNets', userId],
    queryFn: () => axios.get('/asset/asset/mainnets'),
    enabled: containsToken(),
  });
};

/*
* 通过主网获取主网币种
* */
export const useAllCoinInMainNetQuery = (data: {
  mainnetId?: number
}) => {
  const userId = useAuthToken();

  return useQuery<IResponseData<IMainNetCoin[]>>({
    queryKey: ['mainNets', 'coins', data, userId],
    queryFn: () => axios.request({
      url: '/asset/asset/mainnetCoins',
      method: 'get',
      params: data,
    }),
    enabled: containsToken() && !!data.mainnetId,
  });
};

/*
* 获取法币列表
* */
export const useFiatListQuery = () => {
  const userId = useAuthToken();

  return useQuery<IResponseData<IFiat[]>>({
    queryKey: ['fiat', 'list', userId],
    queryFn: () => axios.get('/asset/asset/legalCoins'),
    enabled: containsToken(),
  });
};
