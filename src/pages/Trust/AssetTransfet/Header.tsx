import React from 'react';
import logo from '../../../assets/icon/asset_head_logo.svg';

export default function Header() {
  return (
    <div className="flex flex-row items-center px-8 py-[46px] gap-[120px]">
      <div className="flex-1 flex flex-col gap-4">
        <div className="gradient-text1 font-bold text-[40px] font-title">Asset Transfer</div>
        <div className="text-[#C39770] font-title text-[20px] leading-[24px]">
          The principal can transfer entrusted assets to the trust through here. Prior to the transfer, an
          application for transfer must be submitted. Upon verification by the trustee, confirmation will be
          given that the entrusted assets have been transferred to the trust.
        </div>
      </div>
      <img src={logo} width="223px" alt="Logo" />
    </div>
  );
}
