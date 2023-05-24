import { Store } from 'react-notifications-component';
import { NOTIFICATION_TYPE } from 'react-notifications-component/dist/src/typings';

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
  Store.addNotification({
    container: 'top-right',
    title,
    message: content,
    type,
    dismiss: {
      duration: 2 * 1000,
      waitForAnimation: false,
    },
  });
};

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
