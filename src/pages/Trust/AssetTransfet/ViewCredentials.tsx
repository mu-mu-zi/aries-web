import React from 'react';
import { useTranslation } from 'react-i18next';
import closeIcon from '../../../assets/icon/model_close.svg';
import PaymentRow from './PaymentRow';
import { useAssetDeclareDetailQuery } from '../../../api/trust/asset';

export default function ViewCredentials({ onClose, recordId }: {
    onClose?(): void,
  recordId: number
}) {
  const { t } = useTranslation();
  const query = useAssetDeclareDetailQuery({ recordId });

  return (
    <div className="flex flex-col bg-[#1A342F] rounded-xl w-full max-w-[720px] p-8 max-h-[780px]">
      {/* Header */}
      <div className="flex flex-row justify-between items-center">
        <div className="gradient-text1 font-title font-blod text-[32px]">
          {t('View Credentials')}
        </div>
        <div onClick={onClose} className="cursor-pointer">
          <img src={closeIcon} alt="Close" />
        </div>
      </div>
      {/* Content */}
      <div className="mt-8 overflow-auto flex-auto">
        <div className="text-[#C2D7C7F6] font-blod text-[16px]">{t('Bank transfer information')}</div>
        {query.data?.data && (
          <div className="mt-4 flex flex-col gap-4">
            <PaymentRow title="Payee Name" value={query.data?.data?.payUserName} />
            <PaymentRow title="Payment methods" value={query.data.data.payType === 1 ? 'Digital currency payment' : 'Fiat currency payment'} />
            {query.data.data.payType === 1 && (
              <>
                <PaymentRow title="Internet" value={query.data.data.symbol} />
                <PaymentRow title="Payment Amount" value={query.data.data.amount} />
                <PaymentRow title="Estimated transfer time" value={query.data.data.estimateTime} />
                <PaymentRow title="Recipient's address" value={query.data.data.payAddress} />
                <PaymentRow title="Transaction hash" value={query.data.data.payNo} />
              </>
            )}
            {query.data.data.payType === 2 && (
              <>
                <PaymentRow title="Payer's card number" value={query.data.data.payNo} />
                <PaymentRow title="Recipient's address" value={query.data.data.payAddress} />
                <PaymentRow title="Currency" value={query.data.data.symbol} />
                <PaymentRow title="Payment Amount" value={query.data.data.amount} />
                <PaymentRow title="Estimated transfer time" value={query.data.data.estimateTime} />
                <PaymentRow title="Payment Bank" value={query.data.data.bankName} />
                {/* <PaymentRow title="Wire transfer code (SWIFT)" value={query.data.data.symbol} /> */}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
