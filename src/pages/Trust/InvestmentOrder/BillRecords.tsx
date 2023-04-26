import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import copyIcon from '../../../assets/icon/copy.svg';
import Modal from '../../../components/Modal';
import TransactionVoucher from './TransactionVoucher';

export default function BillRecords() {
  const navigate = useNavigate();
  const [transactionVoucherVisible, setTransactionVoucherVisible] = useState(false);
  const [approvalOpinionVisible, setApprovalOpinionVisible] = useState(false);
  const [investmentInstructionsVisible, setinvestmentInstructionsVisible] = useState(false);

  return (
    <div className="flex flex-col gap-4 gradient-bg2 rounded-xl p-8 shadow-block">
      {/* 标题 */}
      <div className="gradient-text1 font-blod text-[20px]">Bill Records</div>
      {/* 分割线 */}
      <div className="h-[1px] bg-[#3B5649]" />
      <table className="table-auto w-full text-[16px] text-[#99AC9B]">
        <thead>
          <tr>
            <th className="text-left py-2">Type</th>
            <th className="text-left">Currency</th>
            <th className="text-right">Amount</th>
            <th className="text-right">Time</th>
            <th className="text-right">Reconciliation</th>
          </tr>
        </thead>
        <tbody>
          {new Array(5).fill(null).map((it, idx) => (
            <tr>
              <td className="py-2">Reconciliation</td>
              <td>
                <div className="">BTC</div>
              </td>
              <td>
                <div className="gradient-text1 text-right">+0.21 ETH</div>
              </td>
              <td className="text-right">
                2023-03-30 12:00:00
              </td>
              <td>
                <div
                  className="gradient-text2 text-right cursor-pointer"
                  onClick={() => {
                    setTransactionVoucherVisible(true);
                  }}
                >
                  View credentials
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal visible={transactionVoucherVisible}>
        <TransactionVoucher />
      </Modal>
    </div>
  );
}
