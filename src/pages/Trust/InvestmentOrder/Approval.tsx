import React from 'react';
import copyIcon from '../../../assets/icon/copy.svg';

export default function Approval() {
  return (
    <div className="flex flex-col gap-4 gradient-bg2 rounded-xl p-8 shadow-block">
      {/* 标题 */}
      <div className="gradient-text1 font-blod text-[20px]">Approval</div>
      {/* 分割线 */}
      <div className="h-[1px] bg-[#3B5649]" />
      {/* Table */}
      <table className="table-auto text-[16px] text-[#99AC9B]">
        <thead>
          <tr>
            <th className="text-left py-2">Currency</th>
            <th className="text-left">Amount</th>
            <th className="text-left">Destination</th>
            <th className="text-left">{'Opponent\'s address'}</th>
            <th className="text-left">Approval Comments</th>
            <th className="text-left">Approval time</th>
            <th className="text-right">Reconciliation</th>
          </tr>
        </thead>
        <tbody>
          {new Array(5).fill(null).map((it, idx) => (
            <tr>
              <td>BTC</td>
              <td><div className="gradient-text1 pr-8">-5.20 BTC</div></td>
              <td><div className="pr-8">Bank card</div></td>
              <td className="py-2">
                <div className="flex flex-row gap-2 items-center">
                  <div>
                    0xD33Ca668F3FF45b6a629a
                    <br />
                    7db19Fc6318C47370E8
                  </div>
                  <img className="cursor-pointer" src={copyIcon} alt="Copy" />
                </div>
              </td>
              <td>The principal can use the investment instruction feature...</td>
              <td>2023-03-30 12:00:00</td>
              <td className="text-right">Already declined</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
