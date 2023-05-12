import React from 'react';
import cellIcon from '../../../assets/icon/money_small_icon.svg';

export default function NotificationCell({ title, content, datetime }: { title: string; content: string; datetime: string }) {
  return (
    <div className="flex flex-row items-center gap-4">
      <img src={cellIcon} width="32px" alt="" />
      <div className="flex flex-col gap-2">
        <div className="font-blod text-[16px] text-t2">{title}</div>
        <div className="text-[16px] font-normal text-[#99ac9b]">{content}</div>
        <div className="text-[14px] font-normal text-[#99ac9b]">{datetime}</div>
      </div>
    </div>
  );
}
