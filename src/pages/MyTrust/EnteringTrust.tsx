import React from 'react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import icon from '../../assets/icon/my_trust_logo.svg';
import Button from '../../components/Button';
import Divide from '../../components/Divide';
import bankIcon from '../../assets/icon/coin_bank.svg';
import { Trust } from '../../interfaces/trust';

export default function EnteringTrust({ trust }: {
  trust: Trust
}) {
  const navigate = useNavigate();

  return (
    <div className="m-auto gradient-bg1 flex h-[720px] max-w-[475px] flex-col flex-shrink-0 overflow-clip rounded-xl shadow-block">
      <div className="flex flex-auto flex-col px-12">
        <img className="mt-20 self-center" src={icon} width="224px" alt="Logo" />
        <div className="gradient-text1 mt-12 text-center font-title text-[32px]">Welcome to Aries Trust Company</div>
        <div className="gradient-text1 mt-4 text-center font-title text-[32px]">[Settlor]</div>
        <div className="mt-4 text-center font-title text-[20px] text-[#C39770]">
          {moment.unix(trust.createTime / 1000).format('yyyy-MM-DD')}
        </div>
        <div className="flex-1" />
        <div className="self-center">
          <Button onClick={() => navigate('/trust/dashboard')}>Entering the trust</Button>
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
