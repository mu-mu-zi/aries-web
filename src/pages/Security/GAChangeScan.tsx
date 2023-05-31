import React from 'react';
import QRCode from 'react-qr-code';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import GANavbar from '../SignIn/GANavbar';
import Button from '../../components/Button';
import ContactUsFooter from '../../views/ContactUsFooter';
import CenterContainer from '../../views/CenterContainer';
import { useGoogleSecretQuery } from '../../api/user/verify';
import { useGoogleSecretKeyQuery } from '../../api/user/user';
import CopyIcon from '../../views/CopyIcon';

export default function GAChangeScan() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const googleAuth = useGoogleSecretKeyQuery();

  return (
    <CenterContainer>
      <GANavbar
        title={t('Bind Google Authenticator')}
      />
      <div className="item-center flex flex-col self-center w-[680px] pt-[64px]">
        <div
          className="text-shadow-block font-bold gradient-text1 text-center font-title text-[32px] leading-[36px] w-[420px] mx-auto"
        >
          {t('Scan the new QR code using the Google Authenticator App')}
        </div>
        <div className="flex items-center gap-[44px]">
          {googleAuth.data?.data && (
            <>
              <div className="mt-12 rounded-xl bg-[#3B5649] p-3 shadow-block self-center">
                <div className="p-3 rounded-xl bg-[#D2D8D6]">
                  {googleAuth.data?.data?.qrCode
                    && <QRCode value={googleAuth.data?.data.qrCode} size={136} bgColor="#D2D8D6" />}
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div
                  className="self-center flex flex-row items-center bg-[#3B5649] rounded-xl shadow-block px-8 gap-2 mt-10 h-[60px]"
                >
                  <div className="font-title gradient-text1 text-[24px] font-bold">{googleAuth.data?.data?.secret}</div>
                  {googleAuth.data?.data?.secret && <CopyIcon text={googleAuth.data?.data?.secret} />}
                </div>
                <div className="text-center text-[14px] text-[#99AC9B]">
                  If you cannot scan the QR code, please enter the
                  character manually
                </div>
              </div>
            </>
          )}
        </div>
        <div className="flex flex-row gap-4 mt-[40px] w-[420px] m-auto">
          <Button size="medium" block onClick={() => navigate(-1)}>{t('Cancel')}</Button>
          <Button
            size="medium"
            block
            onClick={() => {
              if (googleAuth.data?.data?.secret) {
                navigate('/personal/gaChangeBankup', {
                  state: {
                    secret: googleAuth.data?.data.secret,
                    ticket: location.state?.ticket,
                  },
                  replace: true,
                });
              }
            }}
          >
            {t('Next')}
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
