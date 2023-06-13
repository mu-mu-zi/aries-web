import React from 'react';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import icon from '../../assets/icon/create_trust_logo.png';
import Button from '../../components/Button';
import Divide from '../../components/Divide';

export default function CreatingTrust() {
  const navigate = useNavigate();
  // const { t } = useTranslation();

  return (
    <div
      className={classNames(
        'gradient-bg2 shadow-block',
        'm-auto flex flex-shrink-0 flex-col',
        'block-gradient-border rounded-xl',
        'h-[720px] max-w-[475px]',
      )}
    >
      <div className="flex flex-auto flex-col px-12">
        <img className="mt-20 self-center" src={icon} width="224px" alt="Logo" />
        <div className="gradient-text1 text-shadow-block mt-12 text-center font-title text-[32px] leading-[36px]">
          <FormattedMessage defaultMessage="Welcome to Aries Trust" />
        </div>
        <div className="mt-4 text-center font-title text-[20px] leading-[24px] text-[#C39770]">
          <FormattedMessage defaultMessage="The unique digital private trust service provider" />
        </div>
        <div className="flex-1" />
        <div className="mt-12 self-center">
          <Button size="large" onClick={() => navigate('/contactCustomer')}>
            <FormattedMessage defaultMessage="Establish a Trust" />
          </Button>
        </div>
      </div>
      <div className="mt-[52px]">
        <Divide />
        <div className="h-[84px]" />
      </div>
    </div>
  );
}
