import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Header() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-4 p-8 font-title">
      <div className="gradient-text1 font-blod text-[40px]">{t('Distribution')}</div>
      <div className="text-[#C39770] text-[20px] leading-[24px]">{t('The trustee can establish a distribution plan to distribute the trust property to designated beneficiaries according to the wishes and conditions of the grantor.')}</div>
    </div>
  );
}
