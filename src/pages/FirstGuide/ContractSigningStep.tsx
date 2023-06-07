import React, { useTransition } from 'react';
import { useLocation } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { useTrustDetailQuery } from '../../api/trust/trust';
import { TrustDetail } from '../../interfaces/trust';
import okIcon from '../../assets/icon/icon_check.svg';
import waitIcon from '../../assets/icon/icon_waiting.svg';

export default function ContractSigningStep({ trust }: {
  trust: TrustDetail
}) {
  return (
    <div className="flex flex-col items-center justify-center">
      <img src={trust.contractStatus === 1 ? waitIcon : okIcon} alt="" width="44px" />
      <div
        className="text-[#708077] text-[14px] leading-[16px] mt-4"
      >

        {trust.contractStatus === 1 ? <FormattedMessage defaultMessage="Contract signing in progress" /> : <FormattedMessage defaultMessage="Contract signed successfully" /> }
      </div>
    </div>
  );
}
