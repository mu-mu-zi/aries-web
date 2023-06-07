import React from 'react';
import { FormattedMessage } from 'react-intl';
import waitIcon from '../../../assets/icon/icon_waiting.svg';

export default function Opening() {
  return (
    <div className="mt-12 flex flex-col items-center gap-4">
      <img src={waitIcon} alt="" />
      <div className="text-[#708077] text-[14px]">
        <FormattedMessage defaultMessage="Your account is in the process of opening" />
      </div>
    </div>
  );
}
