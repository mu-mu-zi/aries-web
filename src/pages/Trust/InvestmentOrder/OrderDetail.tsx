import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import InvestmentDetails from './InvestmentDetails';
import Approval from './Approval';
import BillRecords from './BillRecords';
import CancelNav from '../../../views/CancelNav';

export default function OrderDetail() {
  const location = useLocation();
  const trustInvestment = useMemo(() => location.state?.trustInvestment, [location.state]);

  return (
    <div className="flex flex-col gap-6">
      <CancelNav />
      <InvestmentDetails trustInvestment={trustInvestment} />
      <Approval trustInvestmentId={trustInvestment.trustInvestmentId} />
      <BillRecords trustInvestmentId={trustInvestment.trustInvestmentId} />
    </div>
  );
}
