import React from 'react';
import InvestmentDetails from './InvestmentDetails';
import Approval from './Approval';
import BillRecords from './BillRecords';

export default function OrderDetail() {
  return (
    <div className="flex flex-col gap-6">
      <InvestmentDetails />
      <Approval />
      <BillRecords />
    </div>
  );
}
