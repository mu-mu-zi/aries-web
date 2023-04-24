import React from 'react';

export default function PaymentRow({ title, value }: {
    title: string,
    value: string
}) {
  return (
    <div className="flex flex-col shadow-btn gradient-block1 rounded-xl overflow-clip gap-2 px-6 py-3">
      <div className="text-[#99AC9B] text-[16px]">{title}</div>
      <div className="text-[#C2D7C7F6] font-bold text-[16px]">{value}</div>
    </div>
  );
}
