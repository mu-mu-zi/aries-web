import { useEffectOnce } from 'react-use';
import axios, { AxiosResponse } from 'axios';

export default function Axios() {
  useEffectOnce(() => {
    /* 默认 URL */
    axios.defaults.baseURL = 'https://api.aries-trust.com/';

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
          if (response.data.code === 406) {
            /* 删除本地 token */
            localStorage.removeItem('TOKEN');
            return Promise.reject(response.data.msg);
          }
          /* 服务端错误处理 */
          console.log(`Response Error => ${JSON.stringify(response.data)}`);
        }
        return Promise.reject(response.data.msg);
      },
      (error: any) => Promise.reject(error),
    );
  });

  return null;
}
