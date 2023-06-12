import React, { useTransition } from 'react';
import classNames from 'classnames';
import { Form, useNavigate } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';
import Button from '../../components/Button';
import Divide from '../../components/Divide';
import welcomeIcon from '../../assets/icon/welcome_badge.svg';
import ContactUs from './ContactUs';
import useAuthToken from '../../hooks/useUserId';
import ContactUsFooter from '../../views/ContactUsFooter';
import { useMyTrustQuery } from '../../api/trust/trust';

export default function Welcome() {
  const navigate = useNavigate();
  const userId = useAuthToken();
  useMyTrustQuery();
  // const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center pt-9">
      <div
        className={classNames(
          'flex flex-col items-center',
          'gradient-bg2',
          'rounded-xl',
          'w-[587px] pb-[56px] pt-[46px]',
          'shadow-block',
        )}
      >
        <img src={welcomeIcon} className="" width="313px" />
        <div className="gradient-text1 px-[72px] mt-16 text-center font-title text-[40px] leading-[46px]">
          Exclusive Trust Service
          <br />
          for Digital Assets
        </div>
        <div className="mt-12 px-[85px] self-stretch">
          <Button
            size="large"
            block
            onClick={() => (userId ? navigate('/my') : navigate('/signIn'))}
          >
            {userId ? <FormattedMessage defaultMessage="My Trust" /> : <FormattedMessage defaultMessage="Login" /> }
          </Button>
        </div>
        <div className="mt-[52px] self-stretch flex flex-col gap-12">
          <Divide />
          <div className="self-center"><ContactUs /></div>
        </div>
      </div>
    </div>
  );
}
