import React from 'react';
import classNames from 'classnames';
import cellIcon from '../../../assets/icon/money_small_icon.svg';

export default function NotificationCell({
  title,
  content,
  datetime,
  simple,
}: {
  title: string
  content: string
  datetime: string
  simple?: boolean
}) {
  return (
    <div className="flex flex-row items-center gap-4">
      <img src={cellIcon} width="32px" alt="" />
      <div className="flex flex-col gap-2">
        <div className={classNames('font-bold text-[16px] text-t2', simple && 'overflow-hidden text-ellipsis line-clamp-1 break-all')}>{title}</div>
        <div className={classNames('text-[16px] font-normal text-[#99ac9b]', simple && 'line-clamp-2 overflow-hidden text-ellipsis break-all')}>{content}</div>
        <div className="text-[14px] font-normal text-[#99ac9b]">{datetime}</div>
      </div>
    </div>
  );
}
