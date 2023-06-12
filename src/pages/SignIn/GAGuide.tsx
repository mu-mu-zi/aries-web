import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';
import Button from '../../components/Button';
import Divide from '../../components/Divide';
import ContactUs from './ContactUs';
import appstoreIcon from '../../assets/icon/appstore.svg';
import googlePayIcon from '../../assets/icon/icons_google_selected.svg';
import GANavbar from './GANavbar';
import CenterContainer from '../../views/CenterContainer';
import ContactUsFooter from '../../views/ContactUsFooter';

export default function GAGuide() {
  const navigate = useNavigate();
  const location = useLocation();
  // const { t } = useTranslation();
  const intl = useIntl();

  return (
  // <div className="flex flex-col items-center pt-[38px]">
    <CenterContainer>
      <GANavbar
        title={intl.formatMessage({ defaultMessage: 'Binding Google Authenticator' })}
        description={intl.formatMessage({ defaultMessage: 'Google Authenticator is a commonly used identity verification app. After binding, you can obtain verification codes to enhance the security of your account.' })}
      />
      <div className="flex flex-col items-center px-[100px] py-16">
        <div className="flex w-[420px] flex-col items-center">
          <div className="text-shadow-block font-title font-bold gradient-text1 text-center text-[32px] leading-[36px]">
            <FormattedMessage defaultMessage="Download and install the Google Authenticator app" />
          </div>
          <div className="mt-[64px] flex flex-row gap-2">
            <a href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2" target="_blank" rel="noreferrer">
              <ChannelButton icon={googlePayIcon} text="Google Play" />
            </a>
            <a href="https://apps.apple.com/us/app/google-authenticator/id388497605" target="_blank" rel="noreferrer">
              <ChannelButton icon={appstoreIcon} text="App Store" />
            </a>
          </div>
          {/* {location.state?.areaCodeId} */}
          {/* {location.state?.account} */}
          <div className="mt-[40px] w-full">
            <Button
              size="large"
              block
              onClick={() => {
                navigate('/gaBind', {
                  state: {
                    account: location.state.account,
                    areaCodeId: location.state.areaCodeId,
                    userName: location.state.userName,
                  },
                });
              }}
            >
              <FormattedMessage defaultMessage="Next" />
            </Button>
            {/* {location.state?.userName} */}
          </div>
        </div>
        <div className="flex-auto" />
        <div className="mt-[150px] self-stretch">
          <ContactUsFooter />
        </div>
      </div>
    </CenterContainer>
  // </div>
  );
}

function ChannelButton({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="flex items-center justify-center h-[88px] w-[200px] flex-row gap-4 overflow-clip rounded-xl bg-[#3B5649] shadow-block cursor-pointer">
      <img src={icon} alt={text} width="24px" />
      <div className="gradient-text1 text-[20px]">{text}</div>
    </div>
  );
}
