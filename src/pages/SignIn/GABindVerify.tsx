import React from 'react';
import { useNavigate } from 'react-router-dom';
import GANavbar from './GANavbar';
import appstoreIcon from '../../assets/icon/appstore.svg';
import Button from '../../components/Button';
import Divide from '../../components/Divide';
import ContactUs from './ContactUs';
import TextInput from '../../components/TextInput';

export default function GABindVerify() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center pt-[38px]">
      <div className="gradient-bg2 flex max-w-[1200px] w-full min-h-[800px] flex-col overflow-clip  rounded-xl">
        <GANavbar
          title="Bind Google Authentication"
          description="Google Authenticator is a dynamic password tool, which works similar to SMS dynamic verification. After
          binding, it generates a dynamic verification code every 30 seconds, which can be used for security
          verification for login, modifying security settings and other operations."
        />
        <div className="item-center flex w-[418px] flex-col self-center pt-[64px]">
          <div className="text-shadow-block font-blod gradient-text1 text-center font-title text-[32px] leading-[36px]">
            Verify identity
          </div>
          <div className="mt-16 flex flex-col gap-4">
            <div className="font-blod text-[#c2d7c7]">Email verification code</div>
            <TextInput />
            <div className="text-[14px] leading-[16px] text-[#708077]">
              To ensure the security of your funds and account, please enter the verification code received in your
              Aries trust company@Gmail.com email.
            </div>
            <div className="font-blod text-[#c2d7c7]">Google Captcha</div>
            <TextInput />
          </div>
          <div className="mt-[40px] flex flex-row gap-4">
            <Button size="medium" block>
              Cancel
            </Button>
            <Button size="medium" block onClick={() => navigate('/status')}>
              Next
            </Button>
          </div>
        </div>
        <div className="flex-auto" />
        <div className="mt-12 flex flex-col items-center gap-9 self-stretch px-8 pb-16">
          <Divide />
          <ContactUs />
        </div>
      </div>
    </div>
  );
}
