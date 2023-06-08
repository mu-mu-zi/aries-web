import React from 'react';
import { useParams } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';
import ContactUs from '../../SignIn/ContactUs';
import AssetDeclaration from './AssetDeclaration';
import PaymentBit from './PaymentBit';
import PaymentFiat from './PaymentFiat';
import DeclarationRecord from './DeclarationRecord';
import { useAllBankQuery } from '../../../api/assets/assets';

export default function EntrustedDeclaration() {
  // const { t } = useTranslation();
  const intl = useIntl();
  const { trustId } = useParams();
  const [isDigital, setIsDigital] = React.useState(true);
  const bankListQuery = useAllBankQuery({ trustId });

  return (
    <div className="gradient-border-container shadow-block">
      <div className="flex flex-col gradient-bg2 rounded-xl p-8 gap-8">
        {/* Header */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-row items-center justify-between font-title">
            <div className="gradient-text1 font-bold text-[20px]">
              <FormattedMessage defaultMessage="Entrusted declaration" />
            </div>
            <ContactUs />
          </div>
          <div className="h-[1px] bg-[#3B5649]" />
          <div className="gradient-bg1 rounded-xl overflow-clip p-8 leading-[18px] text-[16px]">
            <div className="text-[#C2D7C7F6] font-bold">
              <FormattedMessage defaultMessage="Please complete asset delegation establishment according to the following three steps:" />
            </div>
            <div className="mt-2 text-[#99AC9B]">
              <FormattedMessage defaultMessage="1) Please declare the asset transfer on the left side for this session." />
              <br />
              <FormattedMessage defaultMessage="2) Complete the transfer by following the receiving address on the right side." />
              <br />
              <FormattedMessage defaultMessage="3) After verifying and confirming with Aries, we will credit your account with the transferred assets. If there are any issues, we will contact you accordingly." />
              <br />
            </div>
          </div>
        </div>
        {/* Assets */}
        <div className="flex flex-row gap-16">
          <div className="flex-1">
            <AssetDeclaration assetModeChange={setIsDigital} />
          </div>
          <div className="w-[1px] bg-[#3B5649] my-[120px]" />
          <div className="flex-1">
            <div className="gradient-text1 font-bold text-[20px] font-title">
              <FormattedMessage defaultMessage="Payment information" />
            </div>
            <div className="mt-[40px]">
              {/* eslint-disable-next-line no-nested-ternary */}
              {isDigital ? <PaymentBit /> : <PaymentFiat />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
