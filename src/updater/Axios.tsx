import { useEffectOnce } from 'react-use';
import axios, { AxiosResponse } from 'axios';
import { Store } from 'react-notifications-component';
import { redirect, useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { addNotification } from '../utils/Notification';
import { useUserInfoQuery } from '../api/user/user';
import { useAppDispatch } from '../state';
import { deleteToken } from '../state/user';
import { BASE_URL } from '../utils/url';

export default function Axios() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const action = useAppDispatch();
  const { i18n } = useTranslation();

  useEffect(() => {
    axios.defaults.headers['Accept-Language'] = i18n.language === 'en' ? 'en-US' : 'zh-HK';
  }, [i18n.language]);

  useEffectOnce(() => {
    /* 默认 URL */
    axios.defaults.baseURL = BASE_URL;

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
          /* 数据类型 */
          if (response.data instanceof Blob) {
            return Promise.resolve(response);
          }

          /* success */
          if (response.data.code === 200) {
            return Promise.resolve(response.data);
          }
          /* token */
          if (response.data.code === 406 || response.data.code === 407) {
            action(deleteToken());
            addNotification({
              title: response.data.msg,
            });
            queryClient.removeQueries();
            console.log(`Token Error => ${JSON.stringify(response.data)}`);
            navigate('/welcome', { replace: true });
            return Promise.reject(response.data);
          }
          /* 服务端错误处理 */
          console.log(`Response Error => ${JSON.stringify(response.data)}`);
          if (response.data.msg) {
            addNotification({
              title: response.data.msg,
              type: 'success',
            });
          }
          return Promise.reject(response.data);
        }
        return Promise.reject(response.data);
      },
      (error: any) => Promise.reject(error),
    );
  });

  return null;
}
