import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import StepProgress from './StepProgress';
import { IInvestment } from '../../../interfaces/trust';
import Button from '../../../components/Button';
import Approval from './Approval';
import { useTrustDetailQuery } from '../../../api/trust/trust';

export default function OrderCell({ item }: {
  item: IInvestment
}) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { trustId } = useParams();
  const { t } = useTranslation();
  const { trustId: trustInvestmentId } = useParams();
  const trustQuery = useTrustDetailQuery({ trustId: Number(trustId) });

  const cancelInvestment = async () => {
    axios.request({
      url: '/trust/trust/investment/cancel',
      method: 'get',
      params: {
        trustInvestmentId: item.trustInvestmentId,
      },
    }).then((resp) => {
      queryClient.invalidateQueries(['trust']);
    });
  };

  const approveInvestment = async () => {
    await axios.request({
      url: '/trust/trust/investment/bill/check',
      method: 'get',
      params: {
        billId: item.trustInvestmentId,
        status: 2,
      },
    });
    await queryClient.invalidateQueries(['trust']);
  };

  const navTo = () => {
    navigate(`/trust/${trustId}/orders/detail`, {
      state: {
        trustInvestment: item,
      },
    });
  };

  return (
    <div className="flex flex-col gap-4 gradient-block1 rounded-xl shadow-block p-8">
      {/* Header */}
      <div className="flex flex-row items-center gap-2 flex-wrap">
        <div className="text-[#C2D7C7F6] text-[20px] font-bold">
          {`Investment code ${item.investmentCode}`}
        </div>
        {item.benefitFlag && <OrderCellFlag title={t('Beneficiary') ?? ''} />}
        {item.protectionFlag && <OrderCellFlag title={t('Protector') ?? ''} />}
        {item.entrustFlag && <OrderCellFlag title={t('Settlor') ?? ''} />}
      </div>
      {/* Content */}
      <div className="flex-auto flex flex-col gap-2 text-[#99AC9B] text-[16px] leading-[18px]">
        <div className="line-clamp-2">
          {item.investmentSuggestion}
        </div>
        <div>{item.investmentTime}</div>
      </div>
      {/* Step */}
      <div className="mt-4">
        {item.investmentStatus <= 5 && (
          <StepProgress
            items={[
              'Initiated',
              'Under review',
              'Investment in',
              'Verifying',
              'Completed',
            ]}
            current={item.investmentStatus - 1}
          />
        )}
        {item.investmentStatus === 6 && (
          <StepProgress
            items={[
              'Initiated',
              'Verification failed',
              'Investment in',
              'Verifying',
              'Completed',
            ]}
            current={1}
            errorCurrent={2}
          />
        )}
        {(item.investmentStatus === 7 || item.investmentStatus === 8) && (
          <StepProgress
            items={[
              'Initiated',
              'Canceling',
              'Cancelled',
            ]}
            current={item.investmentStatus - 7 + 1}
          />
        )}
      </div>
      {/* 分割线 */}
      <div className="h-[1px] mx-[-32px] bg-[#3B5649]" />
      {/* 操作 */}
      <div className="flex flex-row flex-wrap items-center justify-center gap-4">
        {item.investmentStatus < 7 && trustQuery.data?.data?.roleType! > 2 && (
          <Button size="medium" onClick={cancelInvestment}>{t('Cancel')}</Button>
        )}
        {item.investmentStatus < 7 && trustQuery.data?.data?.roleType! > 2
          && <Button size="medium" onClick={navTo}>{t('Approval')}</Button>}
        <Button
          size="medium"
          onClick={navTo}
        >
          {t('Check')}
        </Button>
      </div>
    </div>
  );
}

function OrderCellFlag({ title }: { title: string }) {
  return (
    <div
      className="font-title text-[14px] text-[#3D3228] px-3 py-[10px] font-bold rounded-xl bg-[#99AC9B]"
    >
      {title}
    </div>
  );
}
