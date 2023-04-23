import React from 'react';
import icon from '../../assets/icon/my_trust_logo.svg';
import Button from '../../components/Button';
import Divide from '../../components/Divide';
import bankIcon from '../../assets/icon/coin_bank.svg';

export default function EnteringTrust() {
  return (
    <div className="gradient-bg1 flex h-[720px] max-w-[475px] flex-col overflow-clip rounded-xl shadow-block">
      <div className="flex flex-auto flex-col px-12">
        <img className="mt-20 self-center" src={icon} width="224px" alt="Logo" />
        <div className="gradient-text1 mt-12 text-center font-title text-[32px]">Welcome to Aries Trust Company</div>
        <div className="gradient-text1 mt-4 text-center font-title text-[32px]">[Settlor]</div>
        <div className="mt-4 text-center font-title text-[20px] text-[#C39770]">2023-05-01</div>
        <div className="flex-1" />
        <div className="self-center">
          <Button>Entering the trust</Button>
        </div>
      </div>
      <div className="mt-[52px]">
        <Divide />
        <div className="flex h-[84px] flex-row items-center justify-around">
          <BottomItem icon={bankIcon} title="Bank Account" />
          <BottomItem icon={bankIcon} title="Exchange Account" />
        </div>
      </div>
    </div>
  );
}

function BottomItem({ icon, title, onTap }: { icon: string; title: string; onTap?(): void }) {
  return (
    <div className="flex flex-row items-center gap-2 cursor-pointer" onClick={onTap}>
      <img src={icon} width="32px" alt={title} />
      <div className="gradient-text1 font-blod text-[14px]">{title}</div>
    </div>
  );
}
