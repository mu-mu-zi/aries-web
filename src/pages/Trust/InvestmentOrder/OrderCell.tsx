import React from 'react';
import StepProgress from './StepProgress';

export default function OrderCell() {
  return (
    <div className="flex flex-col gap-4 gradient-block1 rounded-xl shadow-block p-8">
      {/* Header */}
      <div className="flex flex-row items-center gap-2">
        <div className="text-[#C2D7C7F6] text-[20px] font-blod">
          Investment code 202304041321
        </div>
        <div className="font-title text-[14px] text-[#3D3228] px-3 py-[10px] rounded-xl bg-[#99AC9B]">
          Principal
        </div>
        <div className="font-title text-[14px] text-[#3D3228] px-3 py-[10px] rounded-xl bg-[#99AC9B]">
          Protector
        </div>
      </div>
      {/* Content */}
      <div className="flex flex-col gap-2 text-[#99AC9B] text-[16px] leading-[18px]">
        <div>
          {'"ABC" Company\'s stock, purchase limit of 1000 shares, buying price at RMB 12.50 per share, settled in real-time...'}
        </div>
        <div>March 30th, 2023 to April 1st, 2025</div>
      </div>
      {/* Step */}
      <div className="mt-4"><StepProgress titles={['', '']} /></div>
      {/* 分割线 */}
      <div className="h-[1px] mx-[-32px] bg-[#3B5649]" />
      {/* 操作 */}
      <div className="flex flex-row items-center font-title justify-center gap-16">
        <div className="gradient-text1 font-blod text-[14px]">Cancel</div>
        <div className="gradient-text1 font-blod text-[14px]">Approval</div>
        <div className="gradient-text1 font-blod text-[14px]">Check</div>
      </div>
    </div>
  );
}
