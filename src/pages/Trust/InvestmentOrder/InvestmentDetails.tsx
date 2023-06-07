import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { IInvestment } from '../../../interfaces/trust';

export default function InvestmentDetails({ trustInvestment }: {
  trustInvestment: IInvestment
}) {
  // const { t } = useTranslation();
  const { formatMessage } = useIntl();

  const statusText = (status: number) => {
    switch (status) {
      case 1: return formatMessage({ defaultMessage: 'Pending' });
      case 2: return formatMessage({ defaultMessage: 'Pending approval' });
      case 3: return formatMessage({ defaultMessage: 'Investment' });
      case 4: return formatMessage({ defaultMessage: 'Checking' });
      case 5: return formatMessage({ defaultMessage: 'Completed' });
      case 6: return formatMessage({ defaultMessage: 'Approval failed' });
      case 7: return formatMessage({ defaultMessage: 'Cancellation' });
      case 8: return formatMessage({ defaultMessage: 'Cancelled' });
      default: return '--';
    }
  };

  return (
    <div className="flex flex-col gap-4 gradient-bg2 rounded-xl p-8 shadow-block">
      {/* 标题 */}
      <div className="gradient-text1 font-bold font-title text-[20px]">
        <FormattedMessage defaultMessage="Investment Instruction Details" />
      </div>
      {/* 分割线 */}
      <div className="h-[1px] bg-[#3B5649]" />
      {/* 状态 */}
      <div className="flex flex-row justify-between">
        <div className="flex flex-col gap-4">
          <div className="text-[#99ac9b] text-[16px]"><FormattedMessage defaultMessage="Investment number" /></div>
          <div className="font-bold text-[20px] text-[#C2D7C7F6]">{trustInvestment.investmentCode}</div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="text-[#99ac9b] text-[16px]"><FormattedMessage defaultMessage="Investment time" /></div>
          <div className="font-bold text-[20px] text-[#C2D7C7F6]">{trustInvestment.investmentTime}</div>
        </div>
        <div className="flex flex-col gap-4 items-end">
          <div className="text-[#99ac9b] text-[16px]"><FormattedMessage defaultMessage="Status" /></div>
          <div className="font-bold text-[20px] text-[#C2D7C7F6]">{statusText(trustInvestment.investmentStatus)}</div>
        </div>
      </div>
      {/* advice */}
      <div className="mt-8 text-[#99ac9b] text-[16px]"><FormattedMessage defaultMessage="Investment advice" /></div>
      <div className="grid grid-cols-1 gap-4">
        <AdviceCell
          title={formatMessage({ defaultMessage: 'Investment objective:' })}
          description={trustInvestment.investmentSuggestion}
        />
        {/* <AdviceCell */}
        {/*  title="Investment objective:" */}
        {/*  description="To achieve high returns through the stock market, increase assets, and ensure sustainable growth of my assets in the future." */}
        {/* /> */}
        {/* <AdviceCell */}
        {/*  title="Investment target: " */}
        {/*  description="Selecting solidly growing shares of listed companies, with a particular focus on investment opportunities in mid to high market capitalization blue-chip stocks, holding long-term as the primary strategy, and maintaining a certain level of liquidity to ensure timely realization when necessary." */}
        {/* /> */}
        {/* <AdviceCell */}
        {/*  title="Investment scope:" */}
        {/*  description="Choose stocks of listed companies in Hong Kong and international markets as investment targets. Among them, the proportion of Hong Kong market stocks should not be less than 50% of the total investment..." */}
        {/* /> */}
      </div>
    </div>
  );
}

function AdviceCell({ title, description }: {
    title: string,
    description: string
}) {
  return (
    <div className="flex flex-col gap-2 bg-[#344D41] rounded-xl p-8">
      <div className="font-bold text-[16px] text-[#C2D7C7F6]">{title}</div>
      <div className="text-[16px] text-[#99AC9B] leading-[18px] break-words">{description}</div>
    </div>
  );
}
