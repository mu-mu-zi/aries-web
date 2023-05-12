import React, { ReactNode } from 'react';
import { TrustDetail } from '../../interfaces/trust';

function Text({ children }: {
  children: ReactNode
}) {
  return <div className="gradient-text1 text-[20px] font-[400]">{children}</div>;
}

export default function EstablishmentFaitStep({ trust }: {
  trust: TrustDetail
}) {
  return (
    <div className="flex flex-col text-[20px] gap-4">
      <div className="flex flex-row items-center justify-between px-8 h-[70px] gradient-block1 rounded-xl shadow-block">
        <div className="gradient-text1 font-blod">Set-up fee</div>
        <Text>100,000.000 HKD</Text>
      </div>
      <div className="flex flex-col rounded-xl overflow-clip shadow-block">
        <div className="flex flex-row items-center justify-between px-8 h-[70px] gradient-block1">
          <div className="gradient-text1 font-blod">Payment Information</div>
        </div>
        <div className="flex flex-col p-8 gap-4 bg-[#314C40]">
          <div className="flex flex-row justify-between">
            <Text>Bank Name: HSBC</Text>
            <Text>Bank of China (Hong Kong)</Text>
          </div>
          <div className="flex flex-row justify-between">
            <Text>Bank Address</Text>
            <Text>Garden Road, Hong Kong</Text>
          </div>
          <div className="flex flex-row justify-between">
            <Text>Payee Name</Text>
            <Text>Aries Trust Limited Company</Text>
          </div>
          <div className="flex flex-row justify-between">
            <Text>Payee Account Number</Text>
            <Text>012-884-2-23333-3</Text>
          </div>
          <div className="flex flex-row justify-between">
            <Text>Payee Country/Region</Text>
            <Text>Hong Kong</Text>
          </div>
          <div className="flex flex-row justify-between">
            <Text>Swift Code</Text>
            <Text>BKCHHKHHXXX</Text>
          </div>
        </div>
      </div>
    </div>
  );
}
