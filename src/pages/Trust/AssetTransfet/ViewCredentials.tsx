import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import closeIcon from '../../../assets/icon/model_close.svg';
import PaymentRow from './PaymentRow';
import { useAssetDeclareDetailQuery } from '../../../api/trust/asset';
import Sider from '../../../components/Sider';

export default function ViewCredentials({ onClose, recordId, images }: {
  onClose?(): void,
  recordId: number,
  images: string[]
}) {
  // const { t } = useTranslation();
  const intl = useIntl();
  const query = useAssetDeclareDetailQuery({ recordId });

  return (
    <div className="flex flex-col bg-[#1A342F] rounded-xl w-full max-w-[720px] p-8 max-h-[780px]">
      {/* Header */}
      <div className="flex flex-row justify-between items-center">
        <div className="gradient-text1 font-title font-bold text-[32px]">
          <FormattedMessage defaultMessage="Declaration Details" />
        </div>
        <div onClick={onClose} className="cursor-pointer">
          <img src={closeIcon} alt="" />
        </div>
      </div>
      {/* Content */}
      <div className="mt-8 mx-[-32px] px-8 py-1 overflow-y-auto flex-auto flex flex-col gap-4">
        <div className="text-[#C2D7C7F6] font-bold text-[16px]">
          <FormattedMessage defaultMessage="Declaration Information" />
        </div>
        {query.data?.data && (
          <div className="flex flex-col gap-4">
            <PaymentRow
              title={intl.formatMessage({ defaultMessage: 'Payer Name' })}
              value={query.data?.data?.payUserName}
            />
            <PaymentRow
              title={intl.formatMessage({ defaultMessage: 'Payment methods' })}
              value={query.data.data.payType === 1 ? intl.formatMessage({ defaultMessage: 'Digital currency payment' }) : intl.formatMessage({ defaultMessage: 'Fiat currency payment' })}
            />
            {query.data.data.payType === 1 && (
              <>
                <PaymentRow
                  title={intl.formatMessage({ defaultMessage: 'Internet' })}
                  value={query.data.data.mainnet}
                />
                <PaymentRow
                  title={intl.formatMessage({ defaultMessage: 'Asset' })}
                  value={query.data.data.symbol}
                />
                <PaymentRow
                  title={intl.formatMessage({ defaultMessage: 'Declared Amount' })}
                  value={query.data.data.amount}
                />
                {/* <PaymentRow */}
                {/*  title={intl.formatMessage({ defaultMessage: 'Transferred Amount' })} */}
                {/*  value={query.data.data.amount} */}
                {/* /> */}
                <PaymentRow
                  title={intl.formatMessage({ defaultMessage: 'Estimated transfer time' })}
                  value={query.data.data.estimateTime}
                />
                <PaymentRow
                  title={intl.formatMessage({ defaultMessage: 'Recipient\'s address' })}
                  value={query.data.data.payAddress}
                />
                <PaymentRow
                  title={intl.formatMessage({ defaultMessage: 'Transaction hash' })}
                  value={query.data.data.payNo}
                />
              </>
            )}
            {query.data.data.payType === 2 && (
              <>
                <PaymentRow
                  title={intl.formatMessage({ defaultMessage: 'Payer\'s card number' })}
                  value={query.data.data.payNo}
                />
                <PaymentRow
                  title={intl.formatMessage({ defaultMessage: 'Recipient\'s address' })}
                  value={query.data.data.payAddress}
                />
                <PaymentRow title={intl.formatMessage({ defaultMessage: 'Currency' })} value={query.data.data.symbol} />
                <PaymentRow
                  title={intl.formatMessage({ defaultMessage: 'Payment Amount' })}
                  value={query.data.data.amount}
                />
                <PaymentRow
                  title={intl.formatMessage({ defaultMessage: 'Estimated transfer time' })}
                  value={query.data.data.estimateTime}
                />
                <PaymentRow
                  title={intl.formatMessage({ defaultMessage: 'Payment Bank' })}
                  value={query.data.data.bankName}
                />
                {/* <PaymentRow title="Wire transfer code (SWIFT)" value={query.data.data.symbol} /> */}
              </>
            )}
            {query.data.data.remarks
              && <PaymentRow title={intl.formatMessage({ defaultMessage: 'Remark' })} value={query.data.data.remarks} />}
          </div>
        )}
        {images.length > 0 && (
          <>
            <div className="text-[#C2D7C7F6] font-bold text-[16px]">
              <FormattedMessage defaultMessage="Transfer Voucher" />
            </div>
            <Sider images={images} />
          </>
        )}
      </div>
    </div>
  );
}
