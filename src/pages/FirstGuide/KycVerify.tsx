import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import CenterContainer from '../../views/CenterContainer';
import ContainerLogo from '../../views/CenterContainer/ContainerLogo';
import StepControl from './StepControl';
import KYCCertificationStep from './KYCCertificationStep';
import Divide from '../../components/Divide';
import ContactUs from '../SignIn/ContactUs';
import EstablishmentFaitStep from './EstablishmentFaitStep';
import EstablishmentBitStep from './EstablishmentBitStep';
import CompletionBitStep from './CompletionBitStep';
import CompletionFiatStep from './CompletionFiatStep';
import { useTrustDetailQuery } from '../../api/trust/trust';
import ContractSigningStep from './ContractSigningStep';

export default function KycVerify() {
  const location = useLocation();
  /* todo: 固定 ID */
  const detailQuery = useTrustDetailQuery({
    trustId: 24,
  });

  const stepId = () => {
    switch (detailQuery.data?.data?.stepId) {
      case 1:
        return 0;
      case 2:
      case 3:
        return 1;
      case 4:
      case 5:
        return 2;
      case 6:
        return 3;
      default:
        return 0;
    }
  };

  return (
    <CenterContainer>
      <div className="flex-1 flex flex-col">
        <ContainerLogo />
        <div className="flex flex-col items-center">
          <div
            className="gradient-text1 text-shadow-block text-center font-title text-[40px] font-bold mt-12"
          >
            Welcome to Aries Trust Company
          </div>
          <div className="text-center font-title text-[20px] font-[400] text-[#C39770] mt-4">
            The most professional digital asset family trust service provider.
          </div>
          {/* Step */}
          {detailQuery.data?.data && (
            <>
              <div className="mt-12">
                <StepControl
                  current={stepId()}
                  titles={['KYC Certification', 'Contract Signing', 'Establishment Fee', 'Trust Completion']}
                />
              </div>
              <div className="mt-12 max-w-[824px] w-full">
                {detailQuery.data.data.stepId === 1 && <KYCCertificationStep trust={detailQuery.data.data} />}
                {[2, 3].includes(detailQuery.data.data.stepId) && <ContractSigningStep trust={detailQuery.data.data} />}
                {[4, 5].includes(detailQuery.data.data.stepId) && detailQuery.data.data.trustAssetType === 1 && <EstablishmentBitStep trust={detailQuery.data.data} />}
                {[4, 5].includes(detailQuery.data.data.stepId) && detailQuery.data.data.trustAssetType === 2 && <EstablishmentFaitStep trust={detailQuery.data.data} />}
                {detailQuery.data.data.stepId === 6 && detailQuery.data.data.trustAssetType === 1 && <CompletionBitStep trust={detailQuery.data.data} />}
                {detailQuery.data.data.stepId === 6 && detailQuery.data.data.trustAssetType === 2 && <CompletionFiatStep trust={detailQuery.data.data} />}
              </div>
            </>
          )}
        </div>
        <div className="flex-auto" />
        <div className="flex flex-col items-center py-12 pb-16 gap-9 px-8">
          <Divide />
          <ContactUs />
        </div>
      </div>
    </CenterContainer>
  );
}
