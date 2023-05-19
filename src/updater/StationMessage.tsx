import { useEffect } from 'react';
import { EventSourcePolyfill } from 'event-source-polyfill';
import { ReactNotifications, Store } from 'react-notifications-component';
import useUserId from '../hooks/useUserId';
import { useAppDispatch, useAppSelector } from '../state';
import { appendMessage } from '../state/msg';
import 'react-notifications-component/dist/theme.css';
import { IStationMessage } from '../interfaces/message';

export default function StationMessage() {
  const userId = useUserId();
  const action = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem('TOKEN');
    if (!userId || !token) return;

    // const baseUrl = 'http://8.222.208.7:8080';
    const baseUrl = 'https://api.aries-trust.com';
    /* todo: 国际化 */
    const es = new EventSourcePolyfill(`${baseUrl}/trust/stationMessage/subscribe`, {
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

      /* 通知 */
      Store.addNotification({
        container: 'top-right',
        title: msgObj.title,
        message: msgObj.content,
        dismiss: {
          duration: 3000,
          onScreen: true,
        },
      });
    });

    // eslint-disable-next-line consistent-return
    return () => es.close();
  }, [userId]);

  return null;
}
