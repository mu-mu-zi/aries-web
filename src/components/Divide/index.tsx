import React from 'react';
import { css } from '@emotion/react';
import icon from '../../assets/icon/divide_star.svg';
import lineIcon from '../../assets/icon/drive.svg';

export default function Divide() {
  return (
    /* todo: 这个分割线两侧不够细 */
    <div
      className="flex items-center justify-center relative bg-gradient-to-r from-[#BE9D6600] from-[-2.99%] via-[#BE9756] via-49.05% to-[#E0C68D00] to-100% h-[3px] w-full"
      css={css`
        //background: linear-gradient(90deg, rgba(190, 157, 102, 0) -2.99%, #BE9756 49.05%, rgba(224, 198, 141, 0) 100%);
      `}
    >
      <img src={icon} alt="" />
    </div>
    // <div className="flex items-center justify-center">
    //   <img src={lineIcon} className="h-[19px]" alt="" />
    // </div>
  );
}
