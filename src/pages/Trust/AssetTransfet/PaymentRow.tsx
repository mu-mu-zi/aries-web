import React from 'react';
import CopyIcon from '../../../views/CopyIcon';

export default function PaymentRow({
  title,
  value,
  canCopy,
}: {
  title: string,
  value?: string,
  canCopy?: boolean
}) {
  return (
    <div className="flex flex-col shadow-btn gradient-block1 rounded-xl overflow-clip gap-2 px-6 py-3">
      <div className="text-[#99AC9B] text-[16px]">{title}</div>
      <div className="flex flex-row items-center gap-2">
        <div className="text-[#C2D7C7F6] font-bold text-[20px] break-all">{value || '--'}</div>
        {canCopy && value && <CopyIcon text={value} />}
      </div>
    </div>
  );
}
