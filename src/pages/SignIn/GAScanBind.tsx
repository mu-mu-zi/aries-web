import React, { useEffect } from 'react';
import QRCode from 'react-qr-code';
import { Await, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';
import { useAsync } from 'react-use';
import { useTranslation } from 'react-i18next';
import GANavbar from './GANavbar';
import Button from '../../components/Button';
import Divide from '../../components/Divide';
import ContactUs from './ContactUs';
import { useGoogleSecretQuery } from '../../api/user/verify';
// import { useGoogleSecretQuery } from '../../api/user/verify';

export default function GAScanBind() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const location = useLocation();
  const googleAuth = useGoogleSecretQuery({
    account: location.state?.account,
  });

  return (
    <div className="flex flex-col items-center pt-[38px]">
      <div className="gradient-bg2 flex max-w-[1200px] w-full min-h-[800px] flex-col overflow-clip  rounded-xl">
        <GANavbar
          title={t('Bind Google Authentication')}
          description={t('Google Authenticator is a dynamic password tool, which works similar to SMS dynamic verification. After binding, it generates a dynamic verification code every 30 seconds, which can be used for security verification for login, modifying security settings and other operations.')}
        />
        <div className="item-center flex flex-col self-center w-[418px] pt-[64px]">
          <div className="text-shadow-block font-bold gradient-text1 text-center font-title text-[32px] leading-[36px]">
            {t('Please scan this QR code using Google Authenticator app')}
          </div>
          <div className="mt-12 rounded-xl bg-[#3B5649] p-5 shadow-block self-center">
            <div className="p-3 rounded-xl bg-[#D2D8D6]">
              {googleAuth.data?.data.qrCode && <QRCode value={googleAuth.data?.data.qrCode} size={160} bgColor="#D2D8D6" />}
            </div>
          </div>
          <div className="flex flex-row gap-4 mt-[40px]">
            <Button size="medium" block onClick={() => navigate(-1)}>{t('Cancel')}</Button>
            <Button
              size="medium"
              block
              onClick={() => {
                if (googleAuth.data?.data.secret) {
                  navigate('/gaBackup', {
                    state: {
                      secret: googleAuth.data?.data.secret,
                      account: location.state.account,
                      areaCodeId: location.state.areaCodeId,
                    },
                  });
                }
              }}
            >
              {t('Next')}
            </Button>
          </div>
        </div>
        <div className="flex-auto" />
        <div className="mt-12 flex flex-col items-center gap-9 self-stretch pb-16 px-8">
          <Divide />
          <ContactUs />
        </div>
      </div>
    </div>
  );
}
