import React, { useState } from 'react';
import Dropdown from '../../../components/Dropdown';
import PaymentRow from './PaymentRow';
import { useAllBankQuery } from '../../../api/assets/assets';
import { IBank } from '../../../interfaces/asset';

export default function PaymentFiat() {
  /* todo: 固定 id */
  const bankListQuery = useAllBankQuery({
    trustId: 15,
  });
  const [bank, setBank] = useState<IBank>();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <div className="text-[#C2D7C7F6] font-blod text-[16px]">Choosing a Bank</div>
        <Dropdown
          title="Hang Send Bank"
          items={bankListQuery.data?.data?.map((x) => x.bankName)}
          onSelected={(idx) => setBank(bankListQuery.data?.data?.[idx])}
        />
      </div>
      {bank && (
        <div className="flex flex-col gap-4">
          <div className="text-[#C2D7C7F6] font-blod text-[16px]">Receiving address</div>
          <div className="flex flex-col gap-4">
            <PaymentRow title="Payee Name" value={bank.userName} />
            <PaymentRow title="Payee account number" value={bank.address} />
            <PaymentRow title="BankName" value={bank.bankName} />
            {bank.customContents.map((it) => <PaymentRow key={it.id} title={it.customKey} value={it.customValue} />)}
          </div>
        </div>
      )}
    </div>
  );
}
