import React, { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { TrustDetail } from '../../interfaces/trust';
import QrCode from '../../components/QrCode';
import { currencyFormat } from '../../utils/CurrencyFormat';
import CopyIcon from '../../views/CopyIcon';

export function Text({ children }: {
  children: ReactNode
}) {
  return <div className="gradient-text1 text-[20px] font-[400]">{children}</div>;
}

export default function EstablishmentBitStep({ trust }: {
    trust: TrustDetail
}) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col text-[20px] gap-4">
      {/* <div className="flex flex-row items-center justify-between px-8 h-[70px] gradient-block1 rounded-xl shadow-block"> */}
      {/*  <div className="gradient-text1 font-bold">{t('Set-up fee')}</div> */}
      {/*  <div className="gradient-text1 text-[20px]"> */}
      {/*    {`${trust.initialCost} ${trust.coinName}`} */}
      {/*  </div> */}
      {/* </div> */}
      {/* <div className="flex flex-row items-center justify-between px-8 h-[70px] gradient-block1 rounded-xl shadow-block"> */}
      {/*  <div className="gradient-text1 font-bold">{t('Transfer network')}</div> */}
      {/*  <div className="gradient-text1 text-[20px]">{trust.mainne}</div> */}
      {/* </div> */}
      {/* <div className="flex flex-row items-center justify-between px-8 h-[70px] gradient-block1 rounded-xl shadow-block"> */}
      {/*  <div className="gradient-text1 font-bold">{t('Receiving address')}</div> */}
      {/*  <div className="flex flex-row gap-2"> */}
      {/*    <div className="gradient-text1 text-[20px]">{trust.collectionAddress}</div> */}
      {/*    <CopyIcon text={trust.collectionAddress} /> */}
      {/*  </div> */}
      {/* </div> */}
      {/* <div className="flex flex-row items-center justify-center py-5 px-8 gradient-block1 rounded-xl shadow-block"> */}
      {/*  {trust.collectionAddress && <QrCode text={trust.collectionAddress} size={136} />} */}
      {/* </div> */}
      <div className="flex flex-col rounded-xl overflow-clip shadow-block">
        <div className="flex flex-row items-center justify-between px-8 h-[70px] gradient-block1">
          <div className="gradient-text1 font-bold">{t('Set-up fee')}</div>
        </div>
        <div className="flex flex-col p-8 gap-4 bg-[#314C40]">
          <div className="flex flex-row justify-between">
            <Text>{t('Account opening fee')}</Text>
            <Text>{`${trust.initialCost} ${trust.coinName}`}</Text>
          </div>
          <div className="flex flex-row justify-between">
            <Text>{t('Transfer network')}</Text>
            <Text>{trust.mainne}</Text>
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
    </div>
  );
}
