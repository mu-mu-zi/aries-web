import React from 'react';
import Dropdown from '../../../components/Dropdown';
import PaymentRow from './PaymentRow';

export default function PaymentBit() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <div className="text-[#C2D7C7F6] font-blod text-[16px]">Choosing a Bank</div>
        <Dropdown title="Hang Send Bank" />
      </div>
      <div className="flex flex-col gap-4">
        <div className="text-[#C2D7C7F6] font-blod text-[16px]">Receiving address</div>
        <div className="flex flex-col gap-4">
          <PaymentRow title="Payee Name" value="Mr. Lin" />
          <PaymentRow title="Payee account number" value="4561 000 000 8888" />
          <PaymentRow title="Payee's Address" value="1108NEXXUS BUILDING,41CONNAUGHTROAD C ENTRAL,CENTRAL HK" />
          <PaymentRow title="Payment Bank (English)" value="STANDARD CHARTERED BANK" />
          <PaymentRow title="Payment Bank (Chinese simplified)" value="恒生银行" />
          <PaymentRow title="Wire transfer code (SWIFT)" value="MrSCBLHKHHXXX" />
        </div>
      </div>
    </div>
  );
}
