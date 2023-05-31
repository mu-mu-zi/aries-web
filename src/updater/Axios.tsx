import { useEffectOnce } from 'react-use';
import axios, { AxiosResponse } from 'axios';
import { Store } from 'react-notifications-component';
import { redirect, useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { addNotification } from '../utils/Notification';
import { useUserInfoQuery } from '../api/user/user';
import { useAppDispatch } from '../state';
import { deleteToken } from '../state/user';
import { baseUrl } from '../utils/url';

export default function Axios() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const action = useAppDispatch();

  useEffectOnce(() => {
    /* 默认 URL */
    axios.defaults.baseURL = baseUrl;
    axios.defaults.headers['Accept-Language'] = 'en-US';

    /*
    * 请求拦截器
    * */
    axios.interceptors.request.use((config) => {
      const token = localStorage.getItem('TOKEN');
      if (config.headers && token) {
        config.headers.Authorization = token;
      }
      return config;
    }, (error) => Promise.reject(error));

    /*
    * 响应拦截器
    * */
    axios.interceptors.response.use(
      (response) => {
        if (response.status === 200) {
          if (response.data.code === 200) {
            return Promise.resolve(response.data);
          }
          if (response.data.code === 406 || response.data.code === 407) {
            navigate('/welcome', { replace: true });
            addNotification({
              title: response.data.msg,
            });
            /* 删除本地 token */
            action(deleteToken());
            queryClient.removeQueries();
            console.log(`Token Error => ${JSON.stringify(response.data)}`);
            return Promise.reject(response.data.msg);
          }
          /* 服务端错误处理 */
          console.log(`Response Error => ${JSON.stringify(response.data)}`);
          if (response.data.msg) {
            addNotification({
              title: response.data.msg,
              type: 'success',
            });
          }
        }
        return Promise.reject(response.data.msg);
      },
      (error: any) => Promise.reject(error),
    );
  });

  return null;
}
