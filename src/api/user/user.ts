import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { IPage, IResponseData } from '../../interfaces/base';
import { IUser, IUserLoginLog } from '../../interfaces/user';
import useUserId from '../../hooks/useUserId';

/*
* 获取用户信息，会检查是否存在本地 token
* */
export const useUserInfoQuery = () => {
  const token = localStorage.getItem('TOKEN');

  return useQuery<IResponseData<IUser>>({
    queryKey: ['user', 'info', token],
    queryFn: () => axios.get('/user/user/getUserInfo'),
    enabled: !!token,
  });
};

/*
* 用户登录日志
* */
export const useLoginLogQuery = (data: {
  pageIndex: number,
  pageSize?: number
}) => {
  const userId = useUserId();

  return useQuery<IResponseData<IPage<IUserLoginLog>>>({
    queryKey: ['user', 'loginLog', data, userId],
    queryFn: () => axios.request({
      url: '/user/user/log/list',
      method: 'get',
      params: data,
    }),
    enabled: !!userId,
  });
};
