import React from 'react';
import footerImg from '../../assets/icon/footer_graat.svg';

export default function FooterNote() {
  return (
    <div className="flex flex-col items-center">
      <img src={footerImg} className="max-w-[1024px] mx-auto my-10" alt="" />
    </div>
  );
}
