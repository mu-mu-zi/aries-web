import React from 'react';
import OrderCell from './OrderCell';

export default function InvestmentOrder() {
  return (
    <div className="flex flex-col">
      <div>Investment Order</div>
      <div
        className="gradient-bg2 roundex-xl shadow-block grid grid-cols-2 gap-4 p-8 rounded-xl"
      >
        <OrderCell />
        <OrderCell />
        <OrderCell />
        <OrderCell />
      </div>
    </div>
  );
}
