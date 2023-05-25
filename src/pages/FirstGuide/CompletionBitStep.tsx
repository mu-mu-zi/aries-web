import React, { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import VerifyStatusRow from './VerifyStatusRow';
import digitalIcon from '../../assets/icon/digital_account.svg';
import { TrustDetail } from '../../interfaces/trust';
import CopyIcon from '../../views/CopyIcon';
import QrCode from '../../components/QrCode';
import icon2 from '../../assets/icon/icon_coin_company.svg';
import icon3 from '../../assets/icon/icon_coin_bank.svg';
import icon4 from '../../assets/icon/icon_coin_exchange.svgicon_coin_exchange.svg';

function Text({ children }: {
  children: ReactNode
}) {
  return <div className="gradient-text1 text-[20px] font-[400]">{children}</div>;
}

export default function CompletionBitStep({ trust }: {
    trust: TrustDetail
}) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col text-[20px] gap-4">
      <div className="flex flex-row items-center justify-between px-8 h-[70px] gradient-block1 rounded-xl shadow-block">
        <div className="gradient-text1 font-bold">{t('Initial assets')}</div>
        <div className="gradient-text1 text-[20px]">
          {`${trust.transferredAssets} ${trust.coinName}`}
        </div>
      </div>
      <div className="flex flex-col rounded-xl overflow-clip shadow-block">
        <div className="flex flex-row items-center justify-between px-8 h-[70px] gradient-block1">
          <div className="gradient-text1 font-bold">{t('Receiving address')}</div>
        </div>
        <div className="flex flex-col p-8 gap-4 bg-[#314C40]">
          <div className="flex flex-row justify-between">
            <Text>{t('Network')}</Text>
            <Text>{trust.mainne}</Text>
          </div>
          <div className="flex flex-row justify-between">
            <Text>{t('Currency')}</Text>
            <Text>{trust.coinName}</Text>
          </div>
          <div className="flex flex-row justify-between">
            <Text>{t('Digital asset address')}</Text>
            <div className="flex flex-row gap-2">
              <Text>{trust.collectionAddress}</Text>
              <CopyIcon text={trust.collectionAddress} />
            </div>
          </div>
          <div className="flex flex-row justify-between">
            <Text>{t('Payment code')}</Text>
            <div className="grid place-items-center p-3 gradient-block1 rounded-xl shadow-btn">
              <QrCode text={trust.collectionAddress} size={136} />
            </div>
          </div>
        </div>
      </div>
      <div className="text-[#C39770] text-[20px] text-center font-title py-4">{t('We are in the process of setting up your account...')}</div>
      <div className="flex flex-col gap-2 self-stretch">
        {/* todo：Logo 阴影导致图片无法居中，待 UI 调整 */}
        <VerifyStatusRow icon={icon2} title="Trust Asset Holding Company" isOpening={false} />
        <VerifyStatusRow icon={icon3} title="Bank Account" isOpening />
        <VerifyStatusRow icon={icon4} title="Exchange Account" isOpening />
      </div>
    </div>
  );
}
