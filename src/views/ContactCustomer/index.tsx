import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GANavbar from '../../pages/SignIn/GANavbar';
import logo from '../../assets/icon/bakcup_key_logo.svg';
import Copy from '../Icons/Copy';
import Button from '../../components/Button';
import Divide from '../../components/Divide';
import ContactUs from '../../pages/SignIn/ContactUs';
import TextInput from '../../components/TextInput';
import TextArea from '../../components/TextArea';
import PhotoEmailSwitch from '../../components/PhotoEmailSwitch';
import Select from '../../components/Select';

export default function ContactCustomer() {
  const navigate = useNavigate();
  const [isPhone, setIsPhone] = useState(true);

  return (
    <div className="flex flex-col items-center pt-[38px]">
      <div className="gradient-bg2 flex max-w-[1200px] w-full min-h-[800px] flex-col overflow-clip  rounded-xl">
        <GANavbar title="Cancel" />
        <div className="item-center flex w-[418px] flex-col self-center pt-[64px]">
          <div className="text-shadow-block font-blod gradient-text1 text-center font-title text-[32px] leading-[36px]">
            Contact customer service
          </div>
          <div className="mt-16 flex flex-col gap-4">
            <div className="flex flex-row gap-2">
              <div className="gradient-text1">*</div>
              <div className="font-blod text-[#c2d7c7]">Name</div>
            </div>
            <TextInput placeholder="Please enter your name" />
            <div className="flex flex-row gap-2">
              <div className="gradient-text1">*</div>
              <div className="font-blod text-[#c2d7c7]">Description</div>
            </div>
            <TextArea />
            <div className="flex flex-row gap-2">
              <div className="gradient-text1">*</div>
              <div className="font-blod text-[#c2d7c7]">Contact</div>
            </div>
            <PhotoEmailSwitch onSelected={setIsPhone} />
            <div className="flex flex-row gap-2">
              {isPhone ? <Select /> : null}
              <TextInput block className="w-full" placeholder="Please input your email" type="email" />
            </div>
          </div>
          <div className="mt-[40px] flex flex-row gap-4">
            <Button size="medium" block onClick={() => navigate('/status')}>
              Confirm
            </Button>
          </div>
          <div className="text-[#708077] text-[14px] leading-[16px] mt-10">
            The application will be processed within one working day, please keep your communication channels open so that customer service can contact you in a timely manner. Additionally, you can also contact the platform through 123456789@gmail.com.
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
