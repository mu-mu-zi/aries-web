import React from 'react';
import { useTranslation } from 'react-i18next';
import { TrustDetail } from '../../interfaces/trust';
import QrCode from '../../components/QrCode';
import { currencyFormat } from '../../utils/CurrencyFormat';
import CopyIcon from '../../views/CopyIcon';

export default function EstablishmentBitStep({ trust }: {
    trust: TrustDetail
}) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col text-[20px] gap-4">
      <div className="flex flex-row items-center justify-between px-8 h-[70px] gradient-block1 rounded-xl shadow-block">
        <div className="gradient-text1 font-bold">{t('Set-up fee')}</div>
        <div className="gradient-text1 text-[20px]">
          {`${trust.initialCost} ${trust.coinName}`}
        </div>
      </div>
      <div className="flex flex-row items-center justify-between px-8 h-[70px] gradient-block1 rounded-xl shadow-block">
        <div className="gradient-text1 font-bold">{t('Transfer network')}</div>
        <div className="gradient-text1 text-[20px]">{trust.mainne}</div>
      </div>
      <div className="flex flex-row items-center justify-between px-8 h-[70px] gradient-block1 rounded-xl shadow-block">
        <div className="gradient-text1 font-bold">{t('Receiving address')}</div>
        <div className="flex flex-row gap-2">
          <div className="gradient-text1 text-[20px]">{trust.collectionAddress}</div>
          <CopyIcon text={trust.collectionAddress} />
        </div>
      </div>
      <div className="flex flex-row items-center justify-center py-5 px-8 gradient-block1 rounded-xl shadow-block">
        {trust.collectionAddress && <QrCode text={trust.collectionAddress} size={136} />}
      </div>
    </div>
  );
}
