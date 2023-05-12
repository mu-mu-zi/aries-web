import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

/*
* 获取用户信息，会检查是否存在本地 token
* */
export const useUserInfoQuery = () => {
  const token = localStorage.getItem('TOKEN');

  return useQuery({
    queryKey: ['user', 'info', token],
    queryFn: () => axios.get('/user/user/getUserInfo'),
    enabled: !!token,
  });
};
