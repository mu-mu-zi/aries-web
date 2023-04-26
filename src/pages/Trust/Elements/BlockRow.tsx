import React from 'react';

export default function BlockRow({ title, value }: {
    title: string,
    value: string
}) {
  return (
    <div className="flex flex-row justify-between gap-4 items-baseline">
      <div className="text-[#99AC9B] text-[16px]">{title}</div>
      <div className="flex-1 text-[#C2D7C7F6] text-[20px] font-bold text-right">{value}</div>
    </div>
  );
}
