import React, { useTransition } from 'react';
import { useLocation } from 'react-router-dom';
import { useTrustDetailQuery } from '../../api/trust/trust';
import { TrustDetail } from '../../interfaces/trust';

export default function KYCCertificationStep({ trust }: {
    trust: TrustDetail
}) {
  return (
    <div className="flex flex-col items-center">
      <img src="https://p.ipic.vip/bhxc06.png" alt="" width="99px" height="99px" />
      <div
        className="text-[#708077] text-[14px] leading-[16px] mt-4"
      >
        Contract signed successfully
      </div>
    </div>
  );
}
