import React from 'react';
import classNames from 'classnames';
import logo from '../../assets/icon/logo_black.svg';
import Button from '../../components/Button';
import Divide from '../../components/Divide';
import TextInput from '../../components/TextInput';
import mobileIcon from '../../assets/icon/mobile_nor.svg';
import mobileSelIcon from '../../assets/icon/mobile_sel.svg';
import emailIcon from '../../assets/icon/email_nor.svg';
import emailSelIcon from '../../assets/icon/email_sel.svg';
import Select from '../../components/Select';
import ContactUs from './ContactUs';
import PhotoEmailSwitch from '../../components/PhotoEmailSwitch';

export default function SignIn() {
  const [isPhone, setIsPhone] = React.useState(true);

  return (
    <div className="flex flex-col items-center pt-9">
      <div className="gradient-bg2 flex w-[580px] flex-col overflow-clip rounded-xl">
        {/* Logo */}
        <div className="gradient-border1 grid h-[102px] place-items-center">
          <img height="54px" src={logo} />
        </div>
        {/* Form */}
        <div className="flex flex-col gap-10 px-[80px] py-[64px]">
          <PhotoEmailSwitch onSelected={setIsPhone} />
          <div className="flex flex-row gap-2">
            {isPhone ? <Select /> : null}
            <TextInput block className="w-full" placeholder="Please input your email" type="email" />
          </div>
          <div>
            <TextInput placeholder="Please input your email" type="email" />
          </div>
          <Button block>Next</Button>
          <div className="text-[#99AC9B] leading-[15px] text-[14px]">
            After mobile phone verification, the user will automatically log in without registration. Registration
            represents agreement to the
            {' '}
            <a href="#" className="gradient-text1">Aries Digital Group Agreement</a>
            {' '}
            and
            {' '}
            <a href="#" className="gradient-text1">Aries Digital Group Privacy Policy</a>
            .
          </div>
          <Divide />
          <ContactUs />
        </div>
      </div>
    </div>
  );
}
