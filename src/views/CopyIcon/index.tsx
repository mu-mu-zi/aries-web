import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useIntl } from 'react-intl';
import copyIcon from '../../assets/icon/icon_copy.svg';
import { addNotification, addSuccessNotification } from '../../utils/Notification';

export default function CopyIcon({
  text,
}: {
  text: string
}) {
  const { formatMessage } = useIntl();

  return (
    <CopyToClipboard
      text={text}
      onCopy={() => {
        addSuccessNotification({
          title: formatMessage({ defaultMessage: 'Copy Success' }),
        });
      }}
    >
      <img className="flex-shrink-0 cursor-pointer" width="24px" src={copyIcon} alt="" />
    </CopyToClipboard>
  );
}
