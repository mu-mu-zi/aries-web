import React, { useEffect, useMemo } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';
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
import ContactUsFooter from '../../views/ContactUsFooter';

export default function KycVerify() {
  const location = useLocation();
  const { trustId } = useParams();
  const detailQuery = useTrustDetailQuery({
    trustId: Number(trustId),
  });
  // const { t } = useTranslation();
  const intl = useIntl();
  const navigate = useNavigate();

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

  useEffect(() => {
    if (detailQuery.data?.data) {
      if (detailQuery.data.data.trustStatus === 21) {
        navigate(`/first/${trustId}/welcome`, { replace: true });
      } else if (detailQuery.data.data.trustStatus === 2) {
        navigate('/my', { replace: true });
      }
    }
  }, [detailQuery.data?.data]);

  return (
    <CenterContainer>
      <div className="flex-1 flex flex-col">
        <ContainerLogo />
        <div className="flex-1 flex flex-col items-center">
          <div
            className="gradient-text1 text-shadow-block text-center font-title text-[40px] font-bold mt-12"
          >
            <FormattedMessage defaultMessage="Establishing Exclusive Private Trust" />
          </div>
          <div className="text-center font-title text-[20px] font-[400] text-[#C39770] mt-4 px-16">
            {stepId() === 0 && (
              <FormattedMessage
                defaultMessage="Aries is honored to provide you with world-class digital private trust services! To ensure the security of your assets and comply with relevant laws and regulations, Aries needs to verify your identity. Your dedicated trust manager will contact you to discuss the required information and documents"
              />
            )}
            {stepId() === 1 && (
              <FormattedMessage
                defaultMessage="Please follow the guidance of your dedicated trust manager to complete the signing of relevant agreements, including the Trust Deed、Trustee Memorandum、Services Agreement"
              />
            )}
            {stepId() === 2 && (
              <FormattedMessage
                defaultMessage="According to the payment method you have chosen, please make the payment for the trust establishment fee. Below is the payment information for Aries. If you have any questions, please contact your dedicated trust manager"
              />
            )}
            {stepId() === 3 && (
              <FormattedMessage
                defaultMessage="Thank you for your patience! Now, all you need to do is complete the injection of the initial entrusted assets to establish the trust. Based on the asset types you have chosen, below is the corresponding payment information"
              />
            )}
          </div>
          {/* Step */}
          {detailQuery.data?.data && (
            <>
              <div className="mt-12">
                <StepControl
                  current={stepId()}
                  titles={[
                    intl.formatMessage({ defaultMessage: 'Identity Verification' }),
                    intl.formatMessage({ defaultMessage: 'Agreements Signing' }),
                    intl.formatMessage({ defaultMessage: 'Fee Payment' }),
                    intl.formatMessage({ defaultMessage: 'Establishment completed' }),
                  ]}
                />
              </div>
              {/* {import.meta.env.VITE_DEV && ( */}
              {/*  <> */}
              {/*    <div className="text-red-500 text-3xl text-center">--- DEBUG START ---</div> */}
              {/*    <KYCCertificationStep trust={detailQuery.data.data} /> */}
              {/*    <ContractSigningStep trust={detailQuery.data.data} /> */}
              {/*    <EstablishmentBitStep trust={detailQuery.data.data} /> */}
              {/*    <EstablishmentFaitStep trust={detailQuery.data.data} /> */}
              {/*    <CompletionBitStep trust={detailQuery.data.data} /> */}
              {/*    <CompletionFiatStep trust={detailQuery.data.data} /> */}
              {/*    <div className="text-red-500 text-3xl text-center">--- DEBUG END ---</div> */}
              {/*  </> */}
              {/* )} */}
              <div className="flex-auto flex flex-col justify-center mt-12 max-w-[824px] w-full">
                {detailQuery.data.data.stepId === 1 && <KYCCertificationStep trust={detailQuery.data.data} />}
                {[2, 3].includes(detailQuery.data.data.stepId) && <ContractSigningStep trust={detailQuery.data.data} />}
                {[4, 5].includes(detailQuery.data.data.stepId) && detailQuery.data.data.payType === 1 && <EstablishmentBitStep trust={detailQuery.data.data} />}
                {[4, 5].includes(detailQuery.data.data.stepId) && detailQuery.data.data.payType === 2 && <EstablishmentFaitStep trust={detailQuery.data.data} />}
                {detailQuery.data.data.stepId === 6 && detailQuery.data.data.trustCompanyModel?.payType === 1 && <CompletionBitStep trust={detailQuery.data.data} />}
                {detailQuery.data.data.stepId === 6 && detailQuery.data.data.trustCompanyModel?.payType === 2 && <CompletionFiatStep trust={detailQuery.data.data} />}
              </div>
            </>
          )}
        </div>
        {/* <div className="flex-auto" /> */}
        <div className="self-stretch py-12 pb-16 gap-9 px-8">
          <ContactUsFooter />
        </div>
      </div>
    </CenterContainer>
  );
}
