import React from 'react';
import classNames from 'classnames';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import moreIcon from '../../../assets/icon/arrow_r.svg';
import cellIcon from '../../../assets/icon/money_small_icon.svg';
import { useLedgerOrderListQuery } from '../../../api/trust/order';
import { unixFormatTime } from '../../../utils/DateFormat';

export default function BillingRecord() {
  const { trustId } = useParams();
  const listQuery = useLedgerOrderListQuery({
    trustId: Number(trustId),
    pageIndex: 1,
    pageSize: 2,
  });
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div
      className={classNames('flex flex-col', 'p-8', 'rounded-xl', 'gradient-bg2', 'shadow-[-4px_8px_10px_0_#030c08]')}
    >
      <div className={classNames('item-center flex flex-row justify-between')}>
        <div className="gradient-text1 font-bold text-[20px]">{t('Billing Record')}</div>
        <div
          className="flex cursor-pointer flex-row items-center gap-2"
          onClick={() => navigate(`/trust/${trustId}/billAndResources`)}
        >
          <div className="gradient-text1 font-bold text-[16px]">{t('More')}</div>
          <img src={moreIcon} width="24px" alt="" />
        </div>
      </div>
      <div className="my-6 h-[1px] bg-[#3B5649]" />
      <div className="flex flex-col gap-6">
        {listQuery.data?.data?.records.map((x) => (
          <RecordCell
            title={x.billTypeName}
            datetime={unixFormatTime(x.createTimeStamp)}
            amount={x.amount}
            status={x.billStatusName}
          />
        ))}
      </div>
    </div>
  );
}

function RecordCell({
  title,
  datetime,
  amount,
  status,
}: {
  title: string;
  datetime: string;
  amount: string;
  status: string;
}) {
  return (
    <div className="flex flex-row items-center gap-4">
      <img src={cellIcon} width="32px" alt="" />
      <div className="flex flex-1 flex-col gap-2">
        <div className="font-bold text-[16px] text-t2">{title}</div>
        <div className="text-[16px] text-[#99ac9b]">{datetime}</div>
      </div>
      <div className="flex flex-col items-end gap-2 text-[16px]">
        <div className="gradient-text1">{amount}</div>
        <div className="text-[#99ac9b]">{status}</div>
      </div>
    </div>
  );
}
