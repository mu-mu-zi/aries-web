import React from 'react';
import Dropdown from '../../../components/Dropdown';

export default function Ledger() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row items-center gap-4">
        <Dropdown title="All" />
        <Dropdown title="All" />
        <Dropdown title="All" />
        <div>Reset</div>
      </div>
      <table className="table-auto w-full text-[#C2D7C7F6] text-left">
        <thead>
          <tr>
            <th className="py-4">Time</th>
            <th>Type</th>
            <th>Currency</th>
            <th className="text-right">Amount</th>
            <th className="text-right">Reconciliation</th>
          </tr>
        </thead>
        <tbody>
          {new Array(5).fill(null).map((it, idx) => (
            <tr>
              <td className="py-4">2023-12-12 12:12:12</td>
              <td>Transfer of digital assets</td>
              <td>USD</td>
              <td className="text-right"><div className="font-title gradient-text1 text-[16px]">-5.20</div></td>
              <td className="text-right"><div className="font-title gradient-text2 text-[14px] font-bold">View credentials</div></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
