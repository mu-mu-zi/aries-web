import React from 'react';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import icon from '../../assets/icon/create_trust_logo.png';
import Button from '../../components/Button';
import Divide from '../../components/Divide';

export default function CreatingTrust() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className={classNames('gradient-bg2 shadow-block', 'flex flex-col flex-shrink-0 m-auto', 'rounded-xl block-gradient-border', 'max-w-[475px] h-[720px]')}>
      <div className="px-12 flex flex-col flex-auto">
        <img className="mt-20 self-center" src={icon} width="224px" alt="Logo" />
        <div className="mt-12 gradient-text1 text-shadow-block font-title text-[32px] text-center leading-[36px]">{t('Welcome to Aries Trust Company')}</div>
        <div className="mt-4 text-[#C39770] font-title text-[20px] text-center leading-[24px]">{t('The most professional digital asset family trust service provider.')}</div>
        <div className="flex-1" />
        <div className="mt-12 self-center">
          <Button size="large" onClick={() => navigate('/contactCustomer')}>{t('Creating a Trust')}</Button>
        </div>
      </div>
      <div className="mt-[52px]">
        <Divide />
        <div className="h-[84px]" />
      </div>
    </div>
  );
}
