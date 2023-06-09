import { useEffectOnce } from 'react-use';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { addNotification } from '../utils/Notification';
import { useAppDispatch, useAppSelector } from '../state';
import { deleteToken } from '../state/user';
import { BASE_URL } from '../utils/url';
import { Language } from '../interfaces/language';

export default function Axios() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const action = useAppDispatch();
  const lan = useAppSelector((state) => state.app.language);

  // useEffect(() => {
  //   console.log(`Language => ${lan}, ${lan === Language.EN}`);
  //   axios.defaults.headers['Accept-Language'] = (lan === Language.EN ? 'en-US' : 'zh-HK');
  // }, [lan]);

  useEffectOnce(() => {
    /* 默认 URL */
    axios.defaults.baseURL = BASE_URL;

    /*
    * 请求拦截器
    * */
    axios.interceptors.request.use((config) => {
      const token = localStorage.getItem('TOKEN');
      if (config.headers) {
        config.headers['Accept-Language'] = (localStorage.getItem('LANGUAGE') === 'en' ? 'en-US' : 'zh-HK');

        if (token) {
          config.headers.Authorization = token;
        }
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
          if (response.data.code === 406 || response.data.code === 407 || response.data.code === 401) {
            addNotification({
              title: response.data.msg,
            });
            navigate('/welcome', { replace: true });
            action(deleteToken());
            queryClient.removeQueries();
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
