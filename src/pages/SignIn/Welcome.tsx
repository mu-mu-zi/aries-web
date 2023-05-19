import React, { useTransition } from 'react';
import classNames from 'classnames';
import { Form, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Button from '../../components/Button';
import Divide from '../../components/Divide';
import welcomeIcon from '../../assets/icon/welcome_badge.svg';
import ContactUs from './ContactUs';
import useUserId from '../../hooks/useUserId';

export default function Welcome() {
  const navigate = useNavigate();
  const userId = useUserId();
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center pt-9">
      <div
        className={classNames(
          'flex flex-col items-center gap-[10px]',
          'gradient-bg2',
          'rounded-xl',
          'w-[587px] pb-[56px] pt-[46px]',
          'shadow-block',
        )}
      >
        <img src={welcomeIcon} width="313px" />
        <div className="gradient-text1 px-[72px] text-center font-title text-[40px] leading-[46px]">
          {t('Exclusive Trust Service for Digital Assets')}
        </div>
        <div className="mt-[48px] px-[85px] self-stretch">
          <Button
            block
            onClick={() => (userId ? navigate('/my') : navigate('/signIn'))}
          >
            {userId ? t('My Trust') : t('Sign In')}
          </Button>
        </div>
        <div className="mb-[46px] mt-[52px] self-stretch">
          <Divide />
        </div>
        <ContactUs />
      </div>
    </div>
  );
}
