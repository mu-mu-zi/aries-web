import React, { ReactNode } from 'react';
import { FormattedMessage } from 'react-intl';
import { TrustDetail } from '../../interfaces/trust';
import QrCode from '../../components/QrCode';
import { currencyFormat } from '../../utils/CurrencyFormat';
import CopyIcon from '../../views/CopyIcon';

export function Text({ children }: { children: ReactNode }) {
  return <div className="gradient-text1 text-[20px] font-[400]">{children}</div>;
}

export default function EstablishmentBitStep({ trust }: { trust: TrustDetail }) {
  return (
    <div className="flex flex-col gap-4 text-[20px]">
      <div className="flex flex-col overflow-clip rounded-xl shadow-block">
        <div className="gradient-block1 flex h-[70px] flex-row items-center justify-between px-8">
          <div className="gradient-text1 font-bold">
            <FormattedMessage defaultMessage="Payment Information" />
          </div>
        </div>
        <div className="flex flex-col gap-4 bg-[#314C40] p-8">
          <div className="flex flex-row justify-between">
            <Text>
              <FormattedMessage defaultMessage="Establishment Fee" />
            </Text>
            <Text>{`${trust.initialCost} ${trust.coinName}`}</Text>
          </div>
          <div className="flex flex-row justify-between">
            <Text>
              <FormattedMessage defaultMessage="Network" />
            </Text>
            <Text>{trust.mainne}</Text>
          </div>
          <div className="flex flex-row justify-between">
            <Text>
              <FormattedMessage defaultMessage="Digital Asset Address" />
            </Text>
            <div className="flex flex-row gap-2">
              <Text>{trust.collectionAddress}</Text>
              <CopyIcon text={trust.collectionAddress} />
            </div>
          </div>
          <div className="flex flex-row justify-between">
            <Text>
              <FormattedMessage defaultMessage="QR Code" />
            </Text>
            <div className="gradient-block1 grid place-items-center rounded-xl p-3 shadow-btn">
              <QrCode text={trust.collectionAddress} size={136} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
