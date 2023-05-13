import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import copyIcon from '../../assets/icon/icon_copy.svg';

export default function CopyIcon({
  text,
}: {
  text: string
}) {
  return (
    <CopyToClipboard text={text}>
      <img className="cursor-pointer" src={copyIcon} alt="" />
    </CopyToClipboard>
  );
}
