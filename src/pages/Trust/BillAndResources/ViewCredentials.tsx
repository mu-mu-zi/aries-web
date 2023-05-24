import React from 'react';
import icon from '../../../assets/icon/icons-small_triangle_right.svg';

export default function ViewCredentials() {
  return (
    <div className="flex items-center gap-4 cursor-pointer">
      <div className="gradient-text2 font-title font-bold text-[14px]">View credentials</div>
      <img src={icon} />
    </div>
  );
}
