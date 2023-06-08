import React from 'react';
import classNames from 'classnames';
import moreIcon from '../../../assets/icon/arrow_r.svg';
import { unixFormatTime } from '../../../utils/DateFormat';

export default function MiniCell({
  logo,
  title,
  link,
}: {
  logo: string,
  title: string,
  link: string
}) {
  return (
    <div className="gradient-border-container shadow-block">
      <a
        href={link}
        target="_blank"
        className={classNames('flex flex-col', 'px-8 py-4', 'rounded-xl', 'gradient-bg2', 'cursor-pointer')}
        rel="noreferrer"
      >
        <div className={classNames('flex flex-row gap-4 items-center')}>
          <img src={logo} width="32px" />
          <div className="text-[#C2D7C7F6] text-[16px]">{title}</div>
        </div>
      </a>
    </div>
  );
}
