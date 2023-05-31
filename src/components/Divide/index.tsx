import React from 'react';
import { css } from '@emotion/react';
import icon from '../../assets/icon/divide_star.svg';
import lineIcon from '../../assets/icon/drive.svg';
import aaa from '../../assets/icon/aaaadivide.svg';

export default function Divide() {
  return (
    /* todo: 这个分割线两侧不够细 */
    <div className="px-4 w-full">
      <div
        className="flex items-center justify-center relativ h-[3px] w-full"
        css={css`
          background: url(${aaa}) no-repeat center / cover;
          // background: linear-gradient(90deg, rgba(190, 157, 102, 0) -2.99%, #BE9756 49.05%, rgba(224, 198, 141, 0) 100%);
        `}
      >
        <img src={icon} alt="" className="" />
      </div>
    </div>
    // <div className="flex items-center justify-center">
    //   <img src={lineIcon} className="h-[19px]" alt="" />
    // </div>
  );
}
