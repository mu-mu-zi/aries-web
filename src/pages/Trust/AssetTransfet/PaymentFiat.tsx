import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';
import Dropdown from '../../../components/Dropdown';
import PaymentRow from './PaymentRow';
import { useAllBankQuery } from '../../../api/assets/assets';
import { IBank } from '../../../interfaces/asset';
import { useAppSelector } from '../../../state';

export default function PaymentFiat() {
  // const { t } = useTranslation();
  const intl = useIntl();
  const { trustId } = useParams();
  const fiatId = useAppSelector((state) => state.trust.assetTransfer.selectedFiatId);
  const bankListQuery = useAllBankQuery({
    trustId,
    coinId: fiatId,
  });
  const [bank, setBank] = useState<IBank>();

  useEffect(() => setBank(bankListQuery.data?.data?.[0]), [bankListQuery.data?.data]);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <div className="text-[#C2D7C7F6] font-bold text-[16px]">
          <FormattedMessage defaultMessage="Please select the receiving bank" />
        </div>
        <Dropdown
          title={bank?.bankName}
          items={bankListQuery.data?.data?.map((x) => x.bankName)}
          onSelected={(idx) => setBank(bankListQuery.data?.data?.[idx])}
        />
      </div>
      {bank && (
        <div className="flex flex-col gap-4">
          <div className="text-[#C2D7C7F6] font-bold text-[16px]">
            <FormattedMessage defaultMessage="Receiving Information" />
          </div>
          <div className="flex flex-col gap-4">
            <PaymentRow title={intl.formatMessage({ defaultMessage: 'Payee Name' })} value={bank.userName} />
            <PaymentRow title={intl.formatMessage({ defaultMessage: 'Payee Bank Account Number' })} value={bank.address} />
            <PaymentRow title={intl.formatMessage({ defaultMessage: 'Bank Name' })} value={bank.bankName} />
            <PaymentRow title={intl.formatMessage({ defaultMessage: 'Payee Country/Region' })} value={bank.symbol} />
            {bank.customContents?.map((it) => <PaymentRow key={it.id} title={it.key} value={it.value} />)}
          </div>
        </div>
      )}
    </div>
  );
}
