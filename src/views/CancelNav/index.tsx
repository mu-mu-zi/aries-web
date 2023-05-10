import React, { useId } from 'react';
import { useNavigate } from 'react-router-dom';
import icon from '../../assets/icon/arrow_l.svg';

export default function CancelNav({ onTap }: {
    onTap?(): void
}) {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-row gap-4 items-center cursor-pointer min-h-32px"
      onClick={() => {
        if (onTap) {
          onTap();
        } else {
          navigate(-1);
        }
      }}
    >
      <img src={icon} width="32px" alt="" />
      <div className="font-title font-bold text-[24px] gradient-text1">Cancel</div>
    </div>
  );
}
