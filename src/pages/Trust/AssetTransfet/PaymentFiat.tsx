import React from 'react';
import Dropdown from '../../../components/Dropdown';
import PaymentRow from './PaymentRow';

export default function PaymentFiat() {
  return (
    <div className="flex flex-col gap-4">
      <div className="text-[#C2D7C7F6] font-blod text-[16px]">Receiving address</div>
      <div className="flex flex-row gap-4">
        <Dropdown title="BSC" />
        <Dropdown title="BSC" />
      </div>
      <PaymentRow title="Receiving address" value="0x7Cbb269D95f85Cd06...F7D6c625f4C22fAeCA99" />
      <div className="grid place-items-center p-3 bg-[#3B5649] shadow-btn rounded-xl self-start">
        <img src="https://p.ipic.vip/bhxc06.png" width="136px" height="136px" />
      </div>
    </div>
  );
}
