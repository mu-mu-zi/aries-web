import React from 'react';
import { FormattedMessage } from 'react-intl';

export default function Header() {
  return (
    <div className="flex flex-col gap-4 p-8 font-title pt-8">
      <div className="gradient-text1 font-bold text-[40px]"><FormattedMessage defaultMessage="Bill and Resources" /></div>
      <div className="text-[#C39770] text-[20px] leading-[24px]">
        <FormattedMessage defaultMessage="Here, you can access all the information about changes in trust property and make inquiries." />
      </div>
    </div>
  );
}
