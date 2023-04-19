import React from 'react';
import icon from '../../assets/icon/divide_star.svg';

export default function Divide() {
  return (
    /* todo: 这个分割线两侧不够细 */
    <div className="flex items-center justify-center relative bg-gradient-to-r from-[#BE9D6600] from-[-2.99%] via-[#BE9756] via-49.05% to-[#E0C68D00] to-100% h-[3px] w-full">
      <img src={icon} alt="" />
    </div>
  );
}
