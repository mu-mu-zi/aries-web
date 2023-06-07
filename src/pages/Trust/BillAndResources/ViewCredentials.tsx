import React from 'react';
import { FormattedMessage } from 'react-intl';
import icon from '../../../assets/icon/icons-small_triangle_right.svg';
import TextButton from '../../../components/TextButton';

export default function ViewCredentials({ onTap }: {
  onTap?(): void;
}) {
  return (
    <div className="flex items-center gap-2 cursor-pointer" onClick={onTap}>
      <TextButton><FormattedMessage defaultMessage="View credentials" /></TextButton>
      <img src={icon} />
    </div>
  );
}
