import React, { ReactNode } from 'react';

export default function TrustHeader({
  title,
  description,
  logo,
  btn,
}: {
  title: string,
  description: string,
  logo?: string,
  btn?: ReactNode
}) {
  return (
    <div className="flex flex-row justify-between items-center gap-4 p-8">
      <div className="flex flex-col gap-4">
        <div className="gradient-text1 font-bold font-title text-[40px] text-shadow-block">
          {title}
        </div>
        <div className="text-[#C39770] text-[20px] font-title max-w-[780px]">{description}</div>
        {btn && <div className="mt-4">{btn}</div>}
      </div>
      <img src={logo} alt="" />
    </div>
  );
}
