import React from 'react';
import { useTranslation } from 'react-i18next';
import ContactUs from '../../SignIn/ContactUs';
import AssetDeclaration from './AssetDeclaration';
import PaymentBit from './PaymentBit';
import PaymentFiat from './PaymentFiat';
import DeclarationRecord from './DeclarationRecord';

export default function EntrustedDeclaration() {
  const { t } = useTranslation();
  const [isDigital, setIsDigital] = React.useState(true);

  return (
    <div className="flex flex-col gradient-bg2 rounded-xl overflow-clip p-8 gap-8">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-row items-center justify-between font-title">
          <div className="gradient-text1 font-bold text-[20px]">{t('Entrusted declaration')}</div>
          <ContactUs />
        </div>
        <div className="h-[1px] bg-[#3B5649]" />
        <div className="gradient-bg1 rounded-xl overflow-clip p-8 leading-[18px] text-[16px]">
          <div className="text-[#C2D7C7F6] font-bold">
            {t('Please complete asset delegation establishment according to the following three steps:')}
          </div>
          <div className="mt-2 text-[#99AC9B]">
            {t('1) Please declare the asset transfer on the left side for this session.')}
            <br />
            {t('2) Complete the transfer by following the receiving address on the right side.')}
            <br />
            {t('3) After verifying and confirming with Aries, we will credit your account with the transferred assets. If there are any issues, we will contact you accordingly.')}
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
          <div className="gradient-text1 font-blod text-[20px] font-title">{t('Payment information')}</div>
          <div className="mt-[40px]">
            {isDigital ? <PaymentBit /> : <PaymentFiat />}
          </div>
        </div>
      </div>
    </div>
  );
}
