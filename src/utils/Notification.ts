import { Store } from 'react-notifications-component';
import { NOTIFICATION_TYPE } from 'react-notifications-component/dist/src/typings';

export const addSuccessNotification = ({
  title,
  content,
}: {
  title: string,
  content?: string
}) => {
  addNotification({
    title,
    content,
    type: 'success',
  });
};

// eslint-disable-next-line import/prefer-default-export
export const addNotification = (
  {
    title,
    content,
    type,
  }: {
    title: string,
    content?: string,
    type?: NOTIFICATION_TYPE
  },
) => {
  Promise.resolve().then(() => Store.addNotification({
    container: 'top-right',
    title,
    message: content,
    type,
    dismiss: {
      duration: 2 * 1000,
      waitForAnimation: false,
    },
  })).then((id) => new Promise((resolve) => {
    setTimeout(() => {
      Store.removeNotification(id);
      resolve(2 * 1000);
    }, 2 * 1000);
  }));
};
