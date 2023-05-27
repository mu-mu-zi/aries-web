import React from 'react';
import { retry } from '@reduxjs/toolkit/query';
import { NavLink, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import alertIcon from '../../../assets/icon/alert.svg';
import { useTrustFeeListQuery } from '../../../api/trust/order';

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

  return (
    <div className="flex flex-col gap-4">
      {query.data?.data?.map((it) => (
        <FeesCell
          title={titleFormat(it.feeType)}
          subtitle={it.feeStatus}
          amount={it.feeAmount}
          suffix="USD"
          to={linkTo(it.feeType)}
        />
      ))}
    </div>
  );
}

function FeesCell({
  title, subtitle, amount, suffix, to,
}: {
  title?: string,
  subtitle: string,
  amount: string,
  suffix: string,
  to: string
}) {
  return (
    <NavLink to={to} className="flex flex-col gap-2 p-8 gradient-block1 rounded-xl">
      <div className="flex flex-row gap-2 items-center">
        <div className="gradient-text1 font-title font-bold">{title}</div>
        <div>
          <img src={alertIcon} width="16px" alt="" />
        </div>
      </div>
      <div className="text-[#708077] text-[16px]">{subtitle}</div>
      <div className="mt-4 flex flex-row items-baseline gap-4 font-title font-bold">
        <div className="gradient-text1 text-[40px]">{amount}</div>
        <div className="gradient-text1 text-[20px]">{suffix}</div>
      </div>
    </NavLink>
  );
}
