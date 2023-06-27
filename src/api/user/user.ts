import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect } from 'react';
import { IPage, IResponseData } from '../../interfaces/base';
import { IGoogleQr, IUser, IUserLoginLog } from '../../interfaces/user';
import useAuthToken, { containsToken } from '../../hooks/useUserId';

/*
* 获取用户信息，会检查是否存在本地 token
* */
export const useUserInfoQuery = () => useQuery<IResponseData<IUser>>({
  queryKey: ['user', 'info'],
  queryFn: () => axios.get('/user/user/getUserInfo'),
  enabled: containsToken(),
});

/*
* 用户登录日志
* */
export const useLoginLogQuery = (data: {
  pageIndex: number,
  pageSize?: number
}) => useQuery<IResponseData<IPage<IUserLoginLog>>>({
  queryKey: ['user', 'loginLog', data],
  queryFn: () => axios.request({
    url: '/user/user/log/list',
    method: 'get',
    params: data,
  }),
  enabled: containsToken(),
});

export const useGoogleSecretKeyQuery = () => useQuery<IResponseData<IGoogleQr>>({
  queryKey: ['user', 'googleSecretKey'],
  queryFn: () => axios.get('/user/user/achieveGoogleSecretKey'),
  enabled: containsToken(),
  retry: false,
  refetchOnWindowFocus: false,
});

/*
* 检查用户是否已经注册
* */
export const useCheckUserContainQuery = (data: {
  userEmail?: string,
  userMobile?: string,
  areaCodeId?: number
}) => useQuery<IResponseData<boolean>>({
  queryKey: ['user', 'check', 'reg', data],
  queryFn: () => axios.request({
    url: '/trust/trust/check/reg',
    method: 'get',
    params: data,
  }),
  enabled: containsToken() && (!!data.userEmail || !!data.userMobile),
});
