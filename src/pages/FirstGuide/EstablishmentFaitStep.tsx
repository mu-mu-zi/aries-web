import React, { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { TrustDetail } from '../../interfaces/trust';

function Text({ children }: {
  children: ReactNode
}) {
  return <div className="gradient-text1 text-[20px] font-[400]">{children}</div>;
}

export default function EstablishmentFaitStep({ trust }: {
  trust: TrustDetail
}) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col text-[20px] gap-4">
      <div className="flex flex-row items-center justify-between px-8 h-[70px] gradient-block1 rounded-xl shadow-block">
        <div className="gradient-text1 font-blod">{t('Set-up fee')}</div>
        <Text>
          {`${trust.initialCost} ${trust.coinName}`}
        </Text>
      </div>
      <div className="flex flex-col rounded-xl overflow-clip shadow-block">
        <div className="flex flex-row items-center justify-between px-8 h-[70px] gradient-block1">
          <div className="gradient-text1 font-blod">{t('Payment Information')}</div>
        </div>
        <div className="flex flex-col p-8 gap-4 bg-[#314C40]">
          <Row title="Bank Name" value={trust.bankName} />
          <Row title="Bank Address" value={trust.bankAddress} />
          <Row title="Payee Name" value={trust.bankAccount} />
          {/* <Row title="Payee Account Number" value="" /> */}
          {/* <Row title="Payee Country/Region" value="" /> */}
          {/* <Row title="Swift Code" value="" /> */}
        </div>
      </div>
    </div>
  );
}

export function Row({ title, value }: {
  title: string,
  value?: string
}) {
  return (
    <div className="flex flex-row justify-between">
      <Text>{title}</Text>
      <Text>{value}</Text>
    </div>
  );
}
