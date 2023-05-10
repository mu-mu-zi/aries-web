import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import GANavbar from './GANavbar';
import Button from '../../components/Button';
import Divide from '../../components/Divide';
import ContactUs from './ContactUs';
import logo from '../../assets/icon/bakcup_key_logo.svg';
import Copy from '../../views/Icons/Copy';

export default function GABackupKey() {
  const location = useLocation();
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
        <div className="item-center flex flex-col self-center w-[418px] pt-[64px]">
          <div className="text-shadow-block font-blod gradient-text1 text-center font-title text-[32px] leading-[36px]">
            Backup key
          </div>
          <img className="mt-16 self-center" src={logo} width="44px" alt="Key" />
          <div className="self-center flex flex-row items-center bg-[#3B5649] rounded-xl shadow-block px-8 py-4 gap-2 mt-10">
            <div className="font-title gradient-text1 text-[24px] font-blod">{location.state.secret}</div>
            <Copy />
          </div>
          <div className="text-center size-[14px] leading-[16px] mt-4 text-[#99AC9B]">
            The key is used to replace the email or retrieve the Google Authenticator when lost. Please be sure to backup the key before binding.
          </div>
          <div className="flex flex-row gap-4 mt-10">
            <Button size="medium" block onClick={() => navigate(-1)}>Cancel</Button>
            <Button
              size="medium"
              block
              onClick={() => {
                navigate('/gaBindVerify', {
                  state: {
                    account: location.state.account,
                    areaCodeId: location.state.areaCodeId,
                  },
                });
              }}
            >
              Next
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
