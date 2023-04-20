import React from 'react';
import logo from '../../assets/icon/logo_black.svg';
import Button from '../../components/Button';
import Divide from '../../components/Divide';

export default function SignIn() {
  const [isPhone, setIsPhone] = React.useState(false);

  return (
    <div className="flex flex-col items-center pt-9">
      <div className="gradient-bg2 flex w-[580px] flex-col overflow-clip rounded-xl">
        {/* Logo */}
        <div className="gradient-border1 grid h-[102px] place-items-center">
          <img height="54px" src={logo} />
        </div>
        {/* Form */}
        <div className="flex flex-col">
          <div className="flex flex-row">
            <div>Phone</div>
            <div>Email</div>
          </div>
          <div className="flex flex-row">
            <div>+312</div>
            <div>123123</div>
          </div>
          <div>12313</div>
          <Button block>Next</Button>
          <div>
            After mobile phone verification, the user will automatically log in without registration. Registration
            represents agreement to the Aries Digital Group Agreement and Aries Digital Group Privacy Policy.
          </div>
          <Divide />
          <div>Contace Us</div>
        </div>
      </div>
    </div>
  );
}
