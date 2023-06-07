import React, { useMemo } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import InvestmentDetails from './InvestmentDetails';
import Approval from './Approval';
import BillRecords from './BillRecords';
import CancelNav from '../../../views/CancelNav';
import { useInvestmentDetailQuery } from '../../../api/trust/investment';

export default function OrderDetail() {
  const location = useLocation();
  const { investmentId } = useParams();
  const useTrustDetailQuery = useInvestmentDetailQuery({
    trustInvestmentId: Number(investmentId),
  });
  const trustInvestment = useMemo(() => location.state?.trustInvestment, [location.state]);

  return (
    <div className="flex flex-col gap-6">
      <CancelNav />
      <InvestmentDetails trustInvestment={useTrustDetailQuery.data?.data ?? trustInvestment} />
      <Approval trustInvestmentId={Number(investmentId)} />
      <BillRecords trustInvestmentId={Number(investmentId)} />
    </div>
  );
}
