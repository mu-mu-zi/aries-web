import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { IResponseData } from '../../interfaces/base';

/*
* 发送手机 Or 邮箱验证码
* */
export const useSendValidateCodeMutation = () => useMutation({
  mutationFn: (data: {
      account: string,
      areaCode?: string
  }) => axios.post('/user/send/sendSmsCode', data),
});

/*
* 未登录获取用户信息
* */
export const useGetUserInfoMutation = () => useMutation({
  mutationFn: (data: {
      userEmail?: string,
      userMobile?: string,
      areaCodeId?: string | number,
      securityCode: string
  }) => axios.post<IResponseData<any>>('/auth/ariesToken/getUserInfo', data),
});

/*
* 获取 Google 验证码
* */
export const useGoogleSecretQuery = (data: {
    account?: string
}) => useQuery({
  queryKey: ['google', data],
  queryFn: () => axios.request({
    url: '/user/userSecurity/achieveGoogleSecretKey',
    method: 'get',
    params: data,
  }),
  enabled: !!data.account,
});
