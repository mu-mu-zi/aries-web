import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Dropdown from '../../../components/Dropdown';
import PaymentRow from './PaymentRow';
import { useAllBankQuery } from '../../../api/assets/assets';
import { IBank } from '../../../interfaces/asset';

export default function PaymentFiat() {
  const { trustId } = useParams();
  const { t } = useTranslation();

  const bankListQuery = useAllBankQuery({
    trustId,
  });
  const [bank, setBank] = useState<IBank>();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <div className="text-[#C2D7C7F6] font-blod text-[16px]">{t('Choosing a Bank')}</div>
        <Dropdown
          title={bank?.bankName}
          items={bankListQuery.data?.data?.map((x) => x.bankName)}
          onSelected={(idx) => setBank(bankListQuery.data?.data?.[idx])}
        />
      </div>
      {bank && (
        <div className="flex flex-col gap-4">
          <div className="text-[#C2D7C7F6] font-blod text-[16px]">{t('Receiving address')}</div>
          <div className="flex flex-col gap-4">
            <PaymentRow title={t('Payee Name')} value={bank.userName} />
            <PaymentRow title={t('Payee account number')} value={bank.address} />
            <PaymentRow title={t('BankName')} value={bank.bankName} />
            {bank.customContents.map((it) => <PaymentRow key={it.id} title={it.customKey} value={it.customValue} />)}
          </div>
        </div>
      )}
    </div>
  );
}
