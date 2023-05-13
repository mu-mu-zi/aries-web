import QRCode from 'react-qr-code';
import React from 'react';

export default function QrCode({ text, size }: {
  text: string,
  size: number
}) {
  return (
    <div>
      {/* <div className="rounded-xl bg-[#3B5649] p-3 shadow-block w-min"> */}
      <div className="p-3 rounded-xl bg-[#D2D8D6]">
        <QRCode value={text} size={size} bgColor="#D2D8D6" />
      </div>
      {/* </div> */}
    </div>
  );
}
