import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FormattedMessage, useIntl } from 'react-intl';
import StepProgress from './StepProgress';
import { IInvestment } from '../../../interfaces/trust';
import Button from '../../../components/Button';
import Approval from './Approval';
import { useTrustDetailQuery } from '../../../api/trust/trust';
import useTrustPermission from '../../../hooks/useTrustRole';
import { stringShort } from '../../../utils/stringShort';

export default function OrderCell({ item }: {
  item: IInvestment
}) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { trustId } = useParams();
  // const { t } = useTranslation();
  const { formatMessage } = useIntl();
  const { trustId: trustInvestmentId } = useParams();
  const trustQuery = useTrustDetailQuery({ trustId: Number(trustId) });
  const {
    protectorPermission,
    settlorPermission,
    protectorEditAndNotSettlor,
  } = useTrustPermission({ trust: trustQuery.data?.data });

  // const cancelInvestment = async () => {
  //   axios.request({
  //     url: '/trust/trust/investment/cancel',
  //     method: 'get',
  //     params: {
  //       trustInvestmentId: item.trustInvestmentId,
  //     },
  //   }).then((resp) => {
  //     queryClient.invalidateQueries(['trust']);
  //   });
  // };

  const cancelMutation = useMutation({
    mutationFn: () => axios.request({
      url: '/trust/trust/investment/cancel',
      method: 'get',
      params: {
        trustInvestmentId: item.trustInvestmentId,
      },
    }),
    onSuccess: async () => {
      await queryClient.invalidateQueries(['trust']);
    },
  });

  const navTo = () => {
    navigate(`/trust/${trustId}/orders/detail/${item.trustInvestmentId}`, {
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
          {/* {`Investment code ${item.investmentCode}`} */}
          <FormattedMessage
            defaultMessage="Investment code {code}"
            values={{ code: item.investmentCode }}
          />
        </div>
        {item.benefitFlag && <OrderCellFlag title={formatMessage({ defaultMessage: 'Beneficiary' })} />}
        {item.protectionFlag && <OrderCellFlag title={formatMessage({ defaultMessage: 'Protector' })} />}
        {item.entrustFlag && <OrderCellFlag title={formatMessage({ defaultMessage: 'Settlor' })} />}
      </div>
      {/* Content */}
      <div className="flex-auto flex flex-col gap-2 text-[#99AC9B] text-[16px] leading-[18px]">
        {/* <div className="line-clamp-2 text-ellipsis overflow-hidden"> */}
        <div className="break-all">
          {stringShort(item.investmentSuggestion, 50)}
        </div>

        {/* </div> */}
        <div>{item.investmentTime}</div>
      </div>
      {/* Step */}
      <div className="mt-4">
        {item.investmentStatus <= 5 && (
          <StepProgress
            items={[
              formatMessage({ defaultMessage: 'Initiated', description: '投资指令状态' }),
              formatMessage({ defaultMessage: 'Under review', description: '投资指令状态' }),
              formatMessage({ defaultMessage: 'Investment', description: '投资指令状态' }),
              formatMessage({ defaultMessage: 'Verifying', description: '投资指令状态' }),
              formatMessage({ defaultMessage: 'Completed', description: '投资指令状态' }),
            ]}
            current={item.investmentStatus - 1}
          />
        )}
        {item.investmentStatus === 6 && (
          <StepProgress
            items={[
              formatMessage({ defaultMessage: 'Initiated', description: '投资指令状态' }),
              formatMessage({ defaultMessage: 'Verification failed', description: '投资指令状态' }),
              formatMessage({ defaultMessage: 'Investment', description: '投资指令状态' }),
              formatMessage({ defaultMessage: 'Verifying', description: '投资指令状态' }),
              formatMessage({ defaultMessage: 'Completed', description: '投资指令状态' }),
            ]}
            current={1}
            errorCurrent={2}
          />
        )}
        {(item.investmentStatus === 7 || item.investmentStatus === 8) && (
          <StepProgress
            items={[
              formatMessage({ defaultMessage: 'Initiated', description: '投资指令状态' }),
              formatMessage({ defaultMessage: 'Canceling', description: '投资指令状态' }),
              formatMessage({ defaultMessage: 'Cancelled', description: '投资指令状态' }),
            ]}
            current={item.investmentStatus - 7 + 1}
          />
        )}
      </div>
      {/* 分割线 */}
      <div className="h-[1px] mx-[-32px] bg-[#3B5649]" />
      {/* 操作 */}
      <div className="flex flex-row flex-wrap items-center justify-center gap-4">
        {/* 委托人才能取消 */}
        {item.investmentStatus < 2 && settlorPermission && (
          <Button
            disabled={cancelMutation.isLoading}
            onClick={() => cancelMutation.mutate()}
          >
            <FormattedMessage defaultMessage="Cancel" />
          </Button>
        )}
        {/* 保护人才能审批，且保护人不是委托人本人 */}
        {/* {item.investmentStatus < 3 && protectorEditAndNotSettlor && ( */}
        {/*  <Button onClick={navTo}> */}
        {/*    <FormattedMessage defaultMessage="Approval" /> */}
        {/*  </Button> */}
        {/* )} */}
        {/* 任何人都可以查看 */}
        <Button size="medium" onClick={navTo}><FormattedMessage defaultMessage="Check" /></Button>
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
