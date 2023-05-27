import { useEffectOnce } from 'react-use';
import axios, { AxiosResponse } from 'axios';
import { Store } from 'react-notifications-component';
import { useNavigate } from 'react-router-dom';
import { addNotification } from '../utils/Notification';
import { useUserInfoQuery } from '../api/user/user';

export default function Axios() {
  // const navigate = useNavigate();
  // const userQuery = useUserInfoQuery();

  useEffectOnce(() => {
    /* 默认 URL */
    axios.defaults.baseURL = 'https://api.aries-trust.com/';
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
          if (response.data.code === 406 || response.data.code === 407 || response.data.code === 4008) {
            /* 删除本地 token */
            localStorage.removeItem('TOKEN');
            /* 跳转到首页 */
            // navigate('/');
            /* 删除用户缓存 */
            // userQuery.remove();
            addNotification({
              title: response.data.msg,
              type: 'danger',
            });
            return Promise.reject(response.data.msg);
          }
          /* 服务端错误处理 */
          console.log(`Response Error => ${JSON.stringify(response.data)}`);
          if (response.data.msg) {
            addNotification({
              title: response.data.msg,
              type: 'danger',
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
