import React, { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Modal from '../../../components/Modal';
import ViewCredentials from './ViewCredentials';

export default function DeclarationRecord() {
  const [detailVisible, setDetailVisible] = useState(false);

  return (
    <div className="flex flex-col gap-4 gradient-bg2 rounded-xl shadow-block p-8">
      <div className="gradient-text1 font-blod text-[20px]">Commission declaration record</div>
      <div className="h-[1px] bg-[#3B5649]" />
      <table className="text-[#99AC9B]">
        <thead>
          <tr className="text-[16px]">
            <th className="text-left py-2">Time</th>
            <th className="text-left">Type</th>
            <th className="text-right">Amount</th>
            <th className="text-right">Status</th>
            <th className="text-right">Reconciliation</th>
          </tr>
        </thead>
        <tbody>
          {new Array(5).fill(null).map((it, idx) => (
            <tr>
              <td className="text-left py-2">2023-03-30 12:00:00</td>
              <td className="text-left">Wallet address</td>
              <td className="text-right">
                <div className="gradient-text1">+10 BTC</div>
              </td>
              <td className="text-right">Verification in progress</td>
              <td className="text-right">
                <div className="flex flex-row gap-4 justify-end font-title font-bold">
                  <div
                    className="gradient-text2 cursor-pointer"
                    onClick={() => setDetailVisible(true)}
                  >
                    View details
                  </div>
                  <div className="gradient-text2 cursor-pointer">Apply for cancellation</div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        visible={detailVisible}
        onClose={() => setDetailVisible(false)}
      >
        <ViewCredentials onClose={() => setDetailVisible(false)} />
      </Modal>
    </div>
  );
}
