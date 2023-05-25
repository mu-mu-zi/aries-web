import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ContainerNav({ title, description }: { title: string; description?: string }) {
  const navigate = useNavigate();

  return (
    <div className="gradient-border1 flex flex-row gap-4 p-8 min-h-[102px]">
      <div className="cursor-pointer" onClick={() => navigate(-1)}>
        <svg
          className="flex-shrink-0"
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M11 16L21 8L18.5 16L21 24L11 16Z" fill="#3D3228" />
        </svg>
      </div>
      <div className="flex-auto flex flex-col gap-2">
        <div className="color-[#3D3228] font-bold text-[24px]">{title}</div>
        {description && <div className="text-[14px] leading-[16px] text-[#695D52]">{description}</div>}
      </div>
    </div>
  );
}
