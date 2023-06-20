import React from 'react';
import classNames from 'classnames';
import cellIcon from '../../../assets/icon/money_small_icon.svg';

export default function NotificationCell({
  title,
  content,
  datetime,
  simple,
}: {
  title: string;
  content: string;
  datetime: string;
  simple?: boolean;
}) {
  return (
    <div className="flex flex-row items-center gap-4">
      <img src={cellIcon} width="32px" alt="" className={classNames(!simple && 'self-start')} />
      <div className="flex flex-col gap-2">
        <div
          className={classNames(
            'text-[16px] font-bold text-t2',
            simple && 'line-clamp-1 overflow-hidden text-ellipsis break-all',
          )}
        >
          {title}
        </div>
        {/* 简单通知 */}
        {simple && (
          <div
            className={classNames('text-[16px] text-[#99ac9b]', 'line-clamp-2 overflow-hidden text-ellipsis break-all')}
          >
            {content}
          </div>
        )}
        {/* 详细通知 */}
        {/* ⚠️ XSS 攻击来咯 */}
        {!simple && (
          <div
            className="text-[16px] text-[#99ac9b]"
            // dangerouslySetInnerHTML={{
            //   __html: content.replace('\n', '<br>'),
            // }}
          >
            {content.trim().split('\n').map((x) => <p key={x}>{x}</p>)}
          </div>
        )}
        <div className="text-[14px] font-normal text-[#99ac9b]">{datetime}</div>
      </div>
    </div>
  );
}
