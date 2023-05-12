import React from 'react';
import VerifyStatusRow from './VerifyStatusRow';
import digitalIcon from '../../assets/icon/digital_account.svg';
import { TrustDetail } from '../../interfaces/trust';

export default function CompletionFiatStep({ trust }: {
    trust: TrustDetail
}) {
  return (
    <div className="flex flex-col items-center gap-6">
      <div>Logo</div>
      <div className="text-[16px] text-center text-[#99AC9B]">We will collect from you offline.</div>
      <div className="mt-4" />
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
