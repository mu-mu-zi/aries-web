import React, { useEffect } from 'react';
import QRCode from 'react-qr-code';
import { Await, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';
import { useAsync } from 'react-use';
import { FormattedMessage, useIntl } from 'react-intl';
import GANavbar from './GANavbar';
import Button from '../../components/Button';
import Divide from '../../components/Divide';
import ContactUs from './ContactUs';
import { useGoogleSecretQuery } from '../../api/user/verify';
import ContactUsFooter from '../../views/ContactUsFooter';
import QrCode from '../../components/QrCode';
import CopyIcon from '../../views/CopyIcon';
// import { useGoogleSecretQuery } from '../../api/user/verify';

export default function GAScanBind() {
  const navigate = useNavigate();
  // const { t } = useTranslation();
  const intl = useIntl();
  const location = useLocation();
  const googleAuth = useGoogleSecretQuery({
    account: location.state?.account,
  });

  return (
    <div className="flex flex-col items-center pt-[38px]">
      <div className="gradient-bg2 flex max-w-[1200px] w-full min-h-[800px] flex-col overflow-clip  rounded-xl">
        <GANavbar
          title={intl.formatMessage({ defaultMessage: 'Binding Google Authenticator' })}
          description={intl.formatMessage({ defaultMessage: 'Google Authenticator is a commonly used identity verification app. After binding, you can obtain verification codes to enhance the security of your account.' })}
        />
        <div className="item-center flex flex-col self-center w-[420px] pt-[64px]">
          <div className="text-shadow-block font-bold gradient-text1 text-center font-title text-[32px] leading-[36px]">
            <FormattedMessage defaultMessage="Please scan this QR code using Google Authenticator app" />
          </div>
          <div className="mt-12 rounded-xl bg-[#3B5649] p-5 shadow-block self-center">
            <div className="p-3 rounded-xl bg-[#D2D8D6]">
              {googleAuth.data?.data.qrCode && <QrCode text={googleAuth.data?.data.qrCode} size={136} />}
            </div>
          </div>
          <div className="self-center flex flex-row items-center bg-[#3B5649] rounded-xl shadow-block px-8 gap-2 mt-12 h-[60px]">
            <div className="font-title gradient-text1 text-[24px] font-bold">{googleAuth.data?.data?.secret}</div>
            <CopyIcon text={googleAuth.data?.data?.secret} />
          </div>
          <div className="text-center text-[14px] leading-[16px] mt-8 text-[#99AC9B]">
            <FormattedMessage defaultMessage="If you are unable to scan this QR code, please enter this string of characters as the setup key in the Google Authenticator app" />
          </div>
          <div className="flex flex-row gap-4 mt-[40px]">
            <Button size="medium" block onClick={() => navigate(-1)}><FormattedMessage defaultMessage="Back" /></Button>
            <Button
              size="medium"
              block
              onClick={() => {
                if (googleAuth.data?.data.secret) {
                  navigate('/gaBindVerify', {
                    state: {
                      secret: googleAuth.data?.data.secret,
                      account: location.state.account,
                      areaCodeId: location.state.areaCodeId,
                      userName: location.state.userName,
                    },
                    replace: true,
                  });
                }
              }}
            >
              <FormattedMessage defaultMessage="Next" />
            </Button>
          </div>
        </div>
        <div className="flex-auto" />
        <div className="mt-12 self-stretch pb-16 px-8">
          {/* <Divide /> */}
          {/* <ContactUs /> */}
          <ContactUsFooter />
        </div>
      </div>
    </div>
  );
}
