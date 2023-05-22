import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import copyIcon from '../../assets/icon/icon_copy.svg';
import { addNotification } from '../../utils/Notification';

export default function CopyIcon({
  text,
}: {
  text: string
}) {
  return (
    <CopyToClipboard
      text={text}
      onCopy={() => {
        addNotification({
          title: 'Copy Success',
          type: 'success',
        });
      }}
    >
      <img className="cursor-pointer" width="24px" src={copyIcon} alt="" />
    </CopyToClipboard>
  );
}
