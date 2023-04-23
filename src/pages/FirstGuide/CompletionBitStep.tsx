import React, { ReactNode } from 'react';
import VerifyStatusRow from './VerifyStatusRow';
import digitalIcon from '../../assets/icon/digital_account.svg';

function Text({ children }: {
  children: ReactNode
}) {
  return <div className="gradient-text1 text-[20px] font-[400]">{children}</div>;
}

export default function CompletionBitStep() {
  return (
    <div className="flex flex-col text-[20px] gap-4">
      <div className="flex flex-row items-center justify-between px-8 h-[70px] gradient-block1 rounded-xl shadow-block">
        <div className="gradient-text1 font-blod">Initial assets</div>
        <div className="gradient-text1 text-[20px]">100,000.000 HKD</div>
      </div>
      <div className="flex flex-col rounded-xl overflow-clip shadow-block">
        <div className="flex flex-row items-center justify-between px-8 h-[70px] gradient-block1">
          <div className="gradient-text1 font-blod">Receiving address</div>
        </div>
        <div className="flex flex-col p-8 gap-4 bg-[#314C40]">
          <div className="flex flex-row justify-between">
            <Text>Network</Text>
            <Text>BSC</Text>
          </div>
          <div className="flex flex-row justify-between">
            <Text>Currency</Text>
            <Text>BTC</Text>
          </div>
          <div className="flex flex-row justify-between">
            <Text>Digital asset address</Text>
            <Text>0xD33Ca668F3F...19Fc6318C47370E8</Text>
          </div>
        </div>
      </div>
      <div className="text-[#C39770] text-[20px] text-center font-title py-4">We are in the process of setting up your account...</div>
      <div className="flex flex-col gap-2 self-stretch">
        {/* todo：Logo 阴影导致图片无法居中，待 UI 调整 */}
        <VerifyStatusRow icon={digitalIcon} title="Digital asset account" isOpening={false} />
        <VerifyStatusRow icon={digitalIcon} title="Trust Asset Holding Company" isOpening={false} />
        <VerifyStatusRow icon={digitalIcon} title="Bank Account" isOpening={false} />
        <VerifyStatusRow icon={digitalIcon} title="Exchange Account" isOpening={false} />
      </div>
    </div>
  );
}
