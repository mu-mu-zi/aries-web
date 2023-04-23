import React from 'react';
import bg from '../../assets/icon/envelop_bg.svg';
import Button from '../../components/Button';

export default function FirstGuideWelcome() {
  return (
    <div className="justify-center flex h-full flex-col items-center">
      <div
        className="w-[1024px] h-[680px] bg-cover bg-center bg-no-repeat flex flex-col items-center gap-4 p-8 rounded-xl"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="mt-[94px] gradient-text1 font-blod text-center text-[40px] font-title text-shadow-block">Dear Mr.Lin</div>
        <div className="mt-4 max-w-[548px] text-center text-[20px] font-title text-[#C39770] leading-[23px] font-[400]">
          Welcome to the digital trust exclusively established for you, opening the door to digital wealth. You will be
          able to see all trust assets and view all records.
        </div>
        <div className="mt-10">
          <Button>Open</Button>
        </div>
      </div>
    </div>
  );
}
