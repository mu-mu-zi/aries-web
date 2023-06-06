import React from 'react';
import { retry } from '@reduxjs/toolkit/query';
import { NavLink, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import alertIcon from '../../../assets/icon/alert.svg';
import { useTrustFeeListQuery } from '../../../api/trust/order';
import { currencyUSDTFormat } from '../../../utils/CurrencyFormat';
import Tooltip from '../../../components/Tooltip';

export default function Fees() {
  const { t } = useTranslation();
  const { trustId } = useParams();
  const query = useTrustFeeListQuery({
    trustId: Number(trustId),
  });

  const titleFormat = (type: number) => {
    switch (type) {
      case 1:
        return t('Trust management fee');
      case 2:
        return t('Excess transfer fee');
      case 3:
        return t('Establishment Fee');
      default:
        return '--';
    }
  };

  const linkTo = (type: number) => {
    switch (type) {
      case 1:
        return `/trust/${trustId}/managerFee`;
      case 2:
        return `/trust/${trustId}/excessFee`;
      case 3:
        return `/trust/${trustId}/establishmentFee`;
      default:
        return `/trust/${trustId}`;
    }
  };

  const statusTitle = (type: number, year: number) => {
    switch (type) {
      case 1:
        return `Unbilled in ${year}`;
      case 2:
        return `Unsettled in ${year}`;
      default:
        return '--';
    }
  };

  const tooltipAttr = (type: number) => {
    switch (type) {
      case 1:
        return {
          title: t('Trust Management Fee = Total Amount Entrusted * Trust Management Fee APR'),
          description: t('Note: Trust management fee is calculated at a fixed rate of 0.05% per day and deducted at the end of the year'),
        };
      case 2:
        return {
          title: t('Excess Transfer Fee = Excess Amount * Excess Transfer Fee APR'),
          description: t('Note: The excess transfer fee is calculated at a fixed rate of 0.03% for each excess amount and will be deducted at the end of the year.'),
        };
      case 3:
        return {
          title: t('Additional establishment fee = Transfer amount of each asset declaration * exchange rate * establishment fee APR'),
          description: t('Note: Each additional establishment fee is calculated at a fixed rate of 0.03% and deducted at the end of the year'),
        };
      default:
        return {
          title: '--',
          description: '--',
        };
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {query.data?.data?.map((it) => (
        <FeesCell
          title={titleFormat(it.feeType)}
          subtitle={statusTitle(it.feeStatus, it.year)}
          amount={it.feeAmount}
          suffix="USD"
          to={linkTo(it.feeType)}
          tooltip={tooltipAttr(it.feeType)}
        />
      ))}
    </div>
  );
}

function FeesCell({
  title, subtitle, amount, suffix, to, tooltip,
}: {
  title?: string,
  subtitle: string,
  amount: string,
  suffix: string,
  tooltip: {
    title: string,
    description: string
  },
  to: string
}) {
  return (
    <NavLink to={to} className="flex flex-col gap-2 p-8 gradient-block1 rounded-xl">
      <div className="flex flex-row gap-2 items-center">
        <div className="gradient-text1 font-title font-bold text-[20px]">{title}</div>
        <Tooltip title={tooltip.title} content={tooltip.description}>
          <img src={alertIcon} width="16px" alt="" />
        </Tooltip>
      </div>
      <div className="text-[#708077] text-[16px]">{subtitle}</div>
      <div className="mt-4 flex flex-row items-baseline gap-4 font-title font-bold">
        <div className="gradient-text1 text-[40px]">{currencyUSDTFormat(amount)}</div>
        <div className="gradient-text1 text-[20px]">{suffix}</div>
      </div>
    </NavLink>
  );
}
