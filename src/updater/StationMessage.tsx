import { useEffect } from 'react';
import { EventSourcePolyfill } from 'event-source-polyfill';
import { ReactNotifications, Store } from 'react-notifications-component';
import useAuthToken from '../hooks/useUserId';
import { useAppDispatch, useAppSelector } from '../state';
import { appendMessage } from '../state/msg';
import 'react-notifications-component/dist/theme.css';
import { IStationMessage } from '../interfaces/message';
import { addNotification } from '../utils/Notification';
import { BASE_URL } from '../utils/url';

export default function StationMessage() {
  const userId = useAuthToken();
  const action = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem('TOKEN');
    if (!userId || !token) return;

    // const baseUrl = 'http://8.222.208.7:8080';
    // const baseUrl = 'https://testapi.aries-trust.com/';
    /* todo: 国际化 */
    // console.log(`baseUrl => ${}`);
    const es = new EventSourcePolyfill(`${BASE_URL}/trust/stationMessage/subscribe`, {
      headers: {
        Authorization: token,
        'Accept-Language': 'zh-hk',
      },
    });

    es.addEventListener('open', console.log);
    es.addEventListener('error', console.error);
    es.addEventListener('message', (msg) => {
      console.log(msg.data);
      const msgObj: IStationMessage = JSON.parse(msg.data);
      action(appendMessage(msgObj));

      addNotification({
        title: msgObj.title,
        content: msgObj.content,
        type: 'success',
      });

      /* 通知 */
      // Store.addNotification({
      //   container: 'top-right',
      //   title: msgObj.title,
      //   message: msgObj.content,
      //   dismiss: {
      //     duration: 3000,
      //     onScreen: true,
      //   },
      // });
    });

    // eslint-disable-next-line consistent-return
    return () => es.close();
  }, [userId]);

  return null;
}
