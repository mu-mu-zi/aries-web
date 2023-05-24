import React from 'react';
import { useTranslation } from 'react-i18next';
import waitIcon from '../../../assets/icon/icon_waiting.svg';

export default function Opening() {
  const { t } = useTranslation();

  return (
    <div className="mt-12 flex flex-col items-center gap-4">
      <img src={waitIcon} alt="" />
      <div className="text-[#708077] text-[14px]">{t('Your account is in the process of opening')}</div>
    </div>
  );
}
