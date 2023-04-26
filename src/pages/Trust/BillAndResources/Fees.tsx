import React from 'react';
import alertIcon from '../../../assets/icon/alert.svg';

export default function Fees() {
  return (
    <div className="flex flex-col gap-4">
      <FeesCell title="Excess transfer fee" subtitle="Unsettled in 2023" amount="0.0213" suffix="USD" />
      <FeesCell title="Excess transfer fee" subtitle="Unsettled in 2023" amount="0.0213" suffix="USD" />
      <FeesCell title="Excess transfer fee" subtitle="Unsettled in 2023" amount="0.0213" suffix="USD" />
    </div>
  );
}

function FeesCell({
  title, subtitle, amount, suffix,
}: {
    title: string,
    subtitle: string,
    amount: string,
    suffix: string
}) {
  return (
    <div className="flex flex-col gap-2 p-8 gradient-block1 rounded-xl">
      <div className="flex flex-row gap-2 items-center">
        <div className="gradient-text1">{title}</div>
        <div>
          <img src={alertIcon} width="16px" alt="" />
        </div>
      </div>
      <div className="text-[#708077] text-[16px]">{subtitle}</div>
      <div className="mt-4 flex flex-row items-baseline gap-4 font-title font-bold">
        <div className="gradient-text1 text-[40px]">{amount}</div>
        <div className="gradient-text1 text-[20px]">{suffix}</div>
      </div>
    </div>
  );
}
