import React from 'react';
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

export default function KycVerify() {
  return (
    <div className="grid justify-items-center">
      <CenterContainer>
        <div className="flex flex-col h-full">
          <ContainerLogo />
          <div className="flex flex-col items-center">
            <div className="gradient-text1 text-shadow-block text-center font-title text-[40px] font-bold mt-12">
              Welcome to Aries Trust Company
            </div>
            <div className="text-center font-title text-[20px] font-[400] text-[#C39770] mt-4">
              The most professional digital asset family trust service provider.
            </div>
            {/* Step */}
            <div className="mt-12">
              <StepControl
                current={1}
                titles={['KYC Certification', 'Contract Signing', 'Establishment Fee', 'Trust completion']}
              />
            </div>
            <div className="mt-12 max-w-[824px] w-full">
              {/* KYCCertificationStep */}
              {/* <KYCCertificationStep /> */}
              {/* <EstablishmentFaitStep /> */}
              {/* <EstablishmentBitStep /> */}
              {/* <CompletionBitStep /> */}
              <CompletionFiatStep />
            </div>
          </div>
          <div className="flex-auto" />
          <div className="flex flex-col items-center py-12 pb-16 gap-9 px-8">
            <Divide />
            <ContactUs />
          </div>
        </div>
      </CenterContainer>
    </div>
  );
}
