import { useEffect } from 'react';
import { EventSourcePolyfill } from 'event-source-polyfill';
import useUserId from '../hooks/useUserId';
import { useAppDispatch, useAppSelector } from '../state';
import { appendMessage } from '../state/msg';

export default function StationMessage() {
  const userId = useUserId();
  const action = useAppDispatch();
  const msgList = useAppSelector((state) => state.msg.msgList);

  useEffect(() => {
    const token = localStorage.getItem('TOKEN');
    if (!userId || !token) return;

    const baseUrl = 'http://8.222.208.7:8080';
    const es = new EventSourcePolyfill(`${baseUrl}/trust/stationMessage/subscribe`, {
      headers: {
        Authorization: token,
        'Accept-Language': 'zh-hk',
      },
    });

    // es.addEventListener('open', console.log);
    // es.addEventListener('error', console.error);
    es.addEventListener('message', (msg) => {
      action(appendMessage(JSON.parse(msg.data)));
    });

    // eslint-disable-next-line consistent-return
    return () => es.close();
  }, [userId]);

  useEffect(() => console.log(msgList), [msgList]);

  return null;
}
