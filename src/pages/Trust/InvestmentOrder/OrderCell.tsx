import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query';
import StepProgress from './StepProgress';
import { IInvestment } from '../../../interfaces/trust';
import Button from '../../../components/Button';
import Approval from './Approval';

export default function OrderCell({ item }: {
  item: IInvestment
}) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const cancelInvestment = async () => {
    axios.request({
      url: '/trust/trust/investment/cancel',
      method: 'get',
      params: {
        trustInvestmentId: item.trustInvestmentId,
      },
    }).then((resp) => {
      queryClient.invalidateQueries(['trust', 'investment']);
    });
  };

  return (
    <div className="flex flex-col gap-4 gradient-block1 rounded-xl shadow-block p-8">
      {/* Header */}
      <div className="flex flex-row items-center gap-2">
        <div className="text-[#C2D7C7F6] text-[20px] font-blod">
          {item.investmentCode}
        </div>
        {item.benefitFlag && <OrderCellFlag title="Principal" />}
        {item.protectionFlag && <OrderCellFlag title="Protector" />}
        {item.entrustFlag && <OrderCellFlag title="Entrust" />}
      </div>
      {/* Content */}
      <div className="flex flex-col gap-2 text-[#99AC9B] text-[16px] leading-[18px]">
        <div>
          {item.investmentSuggestion}
        </div>
        <div>{item.investmentTime}</div>
      </div>
      {/* Step */}
      <div className="mt-4">
        <StepProgress investment={item} />
      </div>
      {/* 分割线 */}
      <div className="h-[1px] mx-[-32px] bg-[#3B5649]" />
      {/* 操作 */}
      <div className="flex flex-row items-center justify-center gap-4">
        <Button size="medium" onClick={cancelInvestment}>Cancel</Button>
        <Button
          size="medium"
          onClick={() => navigate('/trust/orders/detail', {
            state: {
              trustInvestment: item,
            },
          })}
        >
          Approval
        </Button>
        {/* todo：缺少点击事件 */}
        <Button size="medium">Check</Button>
      </div>
    </div>
  );
}

function OrderCellFlag({ title }: {title: string}) {
  return <div className="font-title text-[14px] text-[#3D3228] px-3 py-[10px] font-bold rounded-xl bg-[#99AC9B]">{title}</div>;
}
