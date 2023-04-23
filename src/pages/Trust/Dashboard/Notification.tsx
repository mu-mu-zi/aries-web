import React from 'react';
import classNames from 'classnames';
import cellIcon from '../../../assets/icon/money_small_icon.svg';
import moreIcon from '../../../assets/icon/arrow_r.svg';

export default function Notification() {
  return (
    <div className={classNames('flex flex-col', 'p-8', 'rounded-xl', 'gradient-bg2', 'shadow-[-4px_8px_10px_0_#030c08]')}>
      <div className={classNames('item-center flex flex-row justify-between')}>
        <div className="gradient-text1 font-blod text-[20px]">Notification</div>
        <div className="flex flex-row items-center gap-2 cursor-pointer">
          <div className="gradient-text1 font-blod text-[16px]">More</div>
          <img src={moreIcon} width="24px" alt="" />
        </div>
      </div>
      <div className="my-6 h-[1px] bg-[#3B5649]" />
      <div className="flex flex-col gap-6">
        <NotificationCell
          title="Transfer of investment instructions"
          content="HKD 1,000,000,000 has been successfully transferred out."
          datetime="2023-03-30 12:00:00"
        />
        <NotificationCell
          title="Transfer of investment instructions"
          content="HKD 1,000,000,000 has been successfully transferred out."
          datetime="2023-03-30 12:00:00"
        />
      </div>
    </div>
  );
}

function NotificationCell({ title, content, datetime }: { title: string; content: string; datetime: string }) {
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
