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
        <div className="mt-4 flex flex-col gap-4">
          <PaymentRow title="Payee Name" value={query.data?.data.name} />
          {/* {new Array(20).fill(null).map((it, idx) => ( */}
          {/*  <PaymentRow title="Payee Name" value="Mr. Lin" /> */}
          {/* ))} */}
        </div>
      </div>
    </div>
  );
}
