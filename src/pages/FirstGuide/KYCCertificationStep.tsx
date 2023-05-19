import React, { useTransition } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTrustDetailQuery } from '../../api/trust/trust';
import { TrustDetail } from '../../interfaces/trust';
import okIcon from '../../assets/icon/icon_check.svg';
import waitIcon from '../../assets/icon/icon_waiting.svg';

export default function KYCCertificationStep({ trust }: {
    trust: TrustDetail
}) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center">
      <img src={trust.kycStatus === 1 ? waitIcon : okIcon} alt="" width="44px" />
      <div
        className="text-[#708077] text-[14px] leading-[16px] mt-4"
      >
        {trust.kycStatus === 1 ? t('KYC certification in progress') : t('KYC Certification Success')}
      </div>
    </div>
  );
}
