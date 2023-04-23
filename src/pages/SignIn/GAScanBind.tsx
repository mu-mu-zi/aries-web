import React from 'react';
import GANavbar from './GANavbar';
import Button from '../../components/Button';
import Divide from '../../components/Divide';
import ContactUs from './ContactUs';

export default function GAScanBind() {
  return (
    <div className="flex flex-col items-center pt-[38px]">
      <div className="gradient-bg2 flex max-w-[1200px] w-full min-h-[800px] flex-col overflow-clip  rounded-xl">
        <GANavbar
          title="Bind Google Authentication"
          description="Google Authenticator is a dynamic password tool, which works similar to SMS dynamic verification. After
          binding, it generates a dynamic verification code every 30 seconds, which can be used for security
          verification for login, modifying security settings and other operations."
        />
        <div className="item-center flex flex-col self-center w-[418px] pt-[64px]">
          <div className="text-shadow-block font-blod gradient-text1 text-center font-title text-[32px] leading-[36px]">
            Please scan this QR code using Google Authenticator app
          </div>
          <div className="mt-12 rounded-xl bg-[#3B5649] p-5 shadow-block w-[200px] h-[200px] self-center">
            <img src="https://p.ipic.vip/bhxc06.png" width="160px" height="160px" alt="QRCode" />
          </div>
          <div className="flex flex-row gap-4 mt-[40px]">
            <Button size="medium" block>Cancel</Button>
            <Button size="medium" block>Next</Button>
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
