import React from 'react';
import { FormattedMessage } from 'react-intl';

export default function Header() {
  return (
    <div className="flex flex-col gap-4 p-8 font-title">
      <div className="gradient-text1 font-bold text-[40px]">
        <FormattedMessage defaultMessage="Distribution" />
      </div>
      <div className="text-[#C39770] text-[20px] leading-[24px]">
        <FormattedMessage defaultMessage="The trustee can establish a distribution plan to distribute the trust property to designated beneficiaries according to the wishes and conditions of the grantor." />
      </div>
    </div>
  );
}
