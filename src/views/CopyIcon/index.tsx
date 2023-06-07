import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useIntl } from 'react-intl';
import copyIcon from '../../assets/icon/icon_copy.svg';
import { addNotification } from '../../utils/Notification';

export default function CopyIcon({
  text,
}: {
  text: string
}) {
  const intl = useIntl();

  return (
    <CopyToClipboard
      text={text}
      onCopy={() => {
        addNotification({
          title: intl.formatMessage({ defaultMessage: 'Copy Success' }),
          type: 'success',
        });
      }}
    >
      <img className="flex-shrink-0 cursor-pointer" width="24px" src={copyIcon} alt="" />
    </CopyToClipboard>
  );
}
