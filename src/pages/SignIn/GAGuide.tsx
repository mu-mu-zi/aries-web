import React from 'react';
import Button from '../../components/Button';
import Divide from '../../components/Divide';
import ContactUs from './ContactUs';
import appstoreIcon from '../../assets/icon/appstore.svg';
import GANavbar from './GANavbar';

export default function GAGuide() {
  return (
    <div className="flex flex-col items-center pt-[38px]">
      <div className="gradient-bg2 flex max-w-[1200px] w-full min-h-[800px] flex-col overflow-clip  rounded-xl">
        <GANavbar
          title="Bind Google Authentication"
          description="Google Authenticator is a dynamic password tool, which works similar to SMS dynamic verification. After
          binding, it generates a dynamic verification code every 30 seconds, which can be used for security
          verification for login, modifying security settings and other operations."
        />
        <div className="flex flex-col items-center px-[100px] py-16">
          <div className="flex w-[480px] flex-col items-center">
            <div className="text-shadow-block font-title font-blod gradient-text1 text-center text-[32px] leading-[36px]">
              Download and install the Google Authenticator app
            </div>
            <div className="mt-[64px] flex flex-row gap-2">
              <ChannelButton icon={appstoreIcon} text="Google Play" />
              <ChannelButton icon={appstoreIcon} text="App Store" />
            </div>
            <div className="mt-[40px] w-full">
              <Button block>Next</Button>
            </div>
          </div>
          <div className="flex-auto" />
          <div className="mt-[150px] flex w-full flex-col gap-8">
            <Divide />
            <ContactUs />
          </div>
        </div>
      </div>
    </div>
  );
}

function ChannelButton({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="flex items-center justify-center h-[88px] w-[218px] flex-row gap-4 overflow-clip rounded-xl bg-[#3B5649] shadow-block cursor-pointer">
      <img src={icon} alt={text} width="24px" />
      <div className="gradient-text1 text-[20px]">{text}</div>
    </div>
  );
}
