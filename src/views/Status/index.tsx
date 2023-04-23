import React from 'react';
import { useLocation } from 'react-router-dom';
import Button from '../../components/Button';
import sucIcon from '../../assets/icon/status_suc.svg';

export default function Status({}: {
}) {
  const location = useLocation();

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="flex flex-col items-center gap-8 w-[1000px] p-12 gradient-bg2 shadow-block rounded-xl overflow-clip">
        <img src={sucIcon} width="44px" alt="Success" />
        <div className="gradient-text1 font-blod text-[32px]">Bind Google Authenticator</div>
        <div className="text-[#708077] text-[14px]">Congratulations! You have successfully bound Google Authenticator.</div>
        <div className="mt-8">
          <Button>I Know</Button>
        </div>
      </div>
    </div>
  );
}
