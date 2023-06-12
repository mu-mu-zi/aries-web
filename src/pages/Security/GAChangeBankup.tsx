import { useLocation, useNavigate } from 'react-router-dom';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import GANavbar from '../SignIn/GANavbar';
import logo from '../../assets/icon/bakcup_key_logo.svg';
import CopyIcon from '../../views/CopyIcon';
import Button from '../../components/Button';
import ContactUsFooter from '../../views/ContactUsFooter';
import CenterContainer from '../../views/CenterContainer';

export default function GAChangeBankup() {
  const location = useLocation();
  const navigate = useNavigate();
  const intl = useIntl();
  // const { t } = useTranslation();

  return (
    <CenterContainer>
      <GANavbar
        title={intl.formatMessage({ defaultMessage: 'Binding Google Authenticator' })}
        // description={intl.formatMessage({ defaultMessage: 'Google Authenticator is a commonly used identity verification app. After binding, you can obtain verification codes to enhance the security of your account.' })}
      />
      <div className="item-center flex flex-col self-center w-[420px] pt-[64px]">
        <div className="text-shadow-block font-bold gradient-text1 text-center font-title text-[32px] leading-[36px]">
          <FormattedMessage defaultMessage="Backup key" />
        </div>
        <img className="mt-16 self-center" src={logo} width="44px" alt="Key" />
        <div
          className="self-center flex flex-row items-center bg-[#3B5649] rounded-xl shadow-block px-8 gap-2 mt-10 h-[60px]"
        >
          <div className="font-title gradient-text1 text-[24px] font-bold">{location.state.secret}</div>
          <CopyIcon text={location.state.secret} />
        </div>
        <div className="text-center text-[14px] leading-[16px] mt-4 text-[#99AC9B]">
          <FormattedMessage defaultMessage="The key is used to replace the email or retrieve the Google Authenticator when lost. Please be sure to backup the key before binding." />
        </div>
        <div className="flex flex-row gap-4 mt-10">
          <Button size="medium" block onClick={() => navigate(-1)}><FormattedMessage defaultMessage="Cancel" /></Button>
          <Button
            size="medium"
            block
            onClick={() => {
              navigate('/personal/gaChangeVerify', {
                state: {
                  ticket: location.state?.ticket,
                },
                replace: true,
              });
            }}
          >
            <FormattedMessage defaultMessage="Next" />
          </Button>
        </div>
      </div>
      <div className="flex-auto" />
      <div className="mt-12 self-stretch pb-16 px-8">
        <ContactUsFooter />
      </div>
    </CenterContainer>
  );
}
