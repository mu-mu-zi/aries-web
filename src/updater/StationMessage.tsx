import { useEffect } from 'react';
import { EventSourcePolyfill } from 'event-source-polyfill';
import useAuthToken from '../hooks/useUserId';
import { useAppDispatch, useAppSelector } from '../state';
import { appendMessage } from '../state/msg';
import 'react-notifications-component/dist/theme.css';
import { IStationMessage } from '../interfaces/message';
import { addSuccessNotification } from '../utils/Notification';
import { BASE_URL } from '../utils/url';
import { Language } from '../interfaces/language';

export default function StationMessage() {
  const userId = useAuthToken();
  const action = useAppDispatch();
  const lan = useAppSelector((state) => state.app.language);
  // const { i18n } = useTranslation();

  useEffect(() => {
    const token = localStorage.getItem('TOKEN');
    if (!userId || !token) return;

    const es = new EventSourcePolyfill(`${BASE_URL}/trust/stationMessage/subscribe`, {
      headers: {
        Authorization: token,
        'Accept-Language': lan === Language.EN ? 'en-US' : 'zh-HK',
      },
    });

    es.addEventListener('message', (msg) => {
      console.log(msg.data);
      const msgObj: IStationMessage = JSON.parse(msg.data);
      action(appendMessage(msgObj));

      addSuccessNotification({
        title: msgObj.title,
        content: msgObj.content,
      });
    });

    // eslint-disable-next-line consistent-return
    return () => es.close();
  }, [userId, lan]);

  return null;
}
