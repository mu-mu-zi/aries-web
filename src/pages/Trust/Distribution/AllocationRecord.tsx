import React from 'react';
import Hr from '../../../components/Hr';

export default function AllocationRecord() {
  return (
    <div className="flex flex-col gap-4 gradient-bg2 rounded-xl p-8">
      <div className="gradient-text1 font-title font-blod text-[20px]">Allocation Record</div>
      <div><Hr /></div>
      <table>
        <thead>
          <tr>
            <th>Beneficiary</th>
            <th>Time</th>
            <th>Currency</th>
            <th>Amount</th>
            <th>Reconciliation</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Lee ***</td>
            <td>2023-03-30 12:00:00</td>
            <td>BTC</td>
            <td>-5.20 BTC</td>
            <td>View credentials</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
