import React from 'react';

export default function EstablishmentBitStep() {
  return (
    <div className="flex flex-col text-[20px] gap-4">
      <div className="flex flex-row items-center justify-between px-8 h-[70px] gradient-block1 rounded-xl shadow-block">
        <div className="gradient-text1 font-blod">Set-up fee</div>
        <div className="gradient-text1 text-[20px]">100,000.000 HKD</div>
      </div>
      <div className="flex flex-row items-center justify-between px-8 h-[70px] gradient-block1 rounded-xl shadow-block">
        <div className="gradient-text1 font-blod">Transfer network</div>
        <div className="gradient-text1 text-[20px]">BSC</div>
      </div>
      <div className="flex flex-row items-center justify-between px-8 h-[70px] gradient-block1 rounded-xl shadow-block">
        <div className="gradient-text1 font-blod">Receiving address</div>
        <div className="gradient-text1 text-[20px]">0xD33Ca668F3F...19Fc6318C47370E8</div>
      </div>
      <div className="flex flex-row items-center justify-center py-5 px-8 gradient-block1 rounded-xl shadow-block">
        <img src="https://p.ipic.vip/bhxc06.png" width="160px" height="160px" alt="" />
      </div>
    </div>
  );
}
