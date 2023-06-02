import React from 'react';
import closeIcon from '../../../assets/icon/model_close.svg';

export default function PlanDetail({ detail, onClose }: {
  detail: string
  onClose?(): void
}) {
  return (
    <div className="flex flex-col gap-4 bg-[#1A342F] rounded-xl p-8 w-[720px]">
      <div className="text-[#99AC9B] text-[16px] font-bold">Allocation Plan Explanation:</div>
      <div className="text-[20px] text-[#C2D7C7F6] break-all">
        {detail}
      </div>
      <div className="self-center cursor-pointer mt-4" onClick={onClose}>
        <img src={closeIcon} width="48px" />
      </div>
    </div>
  );
}
