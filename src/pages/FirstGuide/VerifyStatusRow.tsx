import React from 'react';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

export enum VerifyStatusRowStatus {
  Success,
  Opening,
  NotOpen
}

export default function VerifyStatusRow({
  icon,
  title,
  status,
}: {
  icon: string;
  title: string;
  status: VerifyStatusRowStatus;
}) {
  return (
    <div className="flex flex-row items-center gap-2 bg-[#3B5649] px-8 py-4 shadow-block rounded-xl">
      <img src={icon} width="32px" alt={title} />
      <div className="gradient-text1 font-bold flex-auto text-[14px]">{title}</div>
      <div className={classNames('font-bold text-[14px] transition', {
        'text-[#C2D7C7F6]': status === VerifyStatusRowStatus.Success,
        'text-[#708077]': status !== VerifyStatusRowStatus.Success,
      })}
      >
        {status === VerifyStatusRowStatus.Success && <FormattedMessage defaultMessage="Successfully opened" /> }
        {status === VerifyStatusRowStatus.Opening && <FormattedMessage defaultMessage="Opening in progress" /> }
        {status === VerifyStatusRowStatus.NotOpen && <FormattedMessage defaultMessage="Not Open" /> }
      </div>
    </div>
  );
}
