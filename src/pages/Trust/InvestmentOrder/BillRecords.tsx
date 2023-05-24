import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { list } from 'postcss';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import copyIcon from '../../../assets/icon/copy.svg';
import Modal from '../../../components/Modal';
import TransactionVoucher from './TransactionVoucher';
import { useInvestmentOrderRecodeQuery } from '../../../api/trust/investment';
import { IInvestmentOrderRecode } from '../../../interfaces/trust';

export default function BillRecords({ trustInvestmentId }: {
  trustInvestmentId: number
}) {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const listQuery = useInvestmentOrderRecodeQuery({
    pageIndex: page,
    pageSize: 5,
    trustInvestmentId,
  });
  const [transactionVoucherVisible, setTransactionVoucherVisible] = useState(false);
  const [approvalOpinionVisible, setApprovalOpinionVisible] = useState(false);
  const [investmentInstructionsVisible, setinvestmentInstructionsVisible] = useState(false);
  const { t } = useTranslation();
  const [selected, setSelected] = useState<IInvestmentOrderRecode>();

  return (
    <div className="flex flex-col gap-4 gradient-bg2 rounded-xl p-8 shadow-block">
      {/* 标题 */}
      <div className="gradient-text1 font-blod text-[20px]">{t('Bill Records')}</div>
      {/* 分割线 */}
      <div className="h-[1px] bg-[#3B5649]" />
      <table className="table-auto w-full text-[16px] text-[#99AC9B]">
        <thead>
          <tr>
            <th className="text-left py-2">{t('Type')}</th>
            <th className="text-left">{t('Currency')}</th>
            <th className="text-right">{t('Amount')}</th>
            <th className="text-right">{t('Time')}</th>
            <th className="text-right">{t('Reconciliation')}</th>
          </tr>
        </thead>
        <tbody>
          {listQuery.data?.data?.records.map((it, idx) => (
            <tr key={it.billId}>
              <td className="py-2">{it.billTypeName}</td>
              <td>
                <div className="">{it.coinName}</div>
              </td>
              <td>
                <div className="gradient-text1 text-right">{`${it.quantity} ${it.coinName}`}</div>
              </td>
              <td className="text-right">
                {moment.unix(it.createTimeStamp / 1000).format('yyyy-MM-DD HH:mm:ss')}
              </td>
              <td>
                <div
                  className="gradient-text2 text-right cursor-pointer"
                  onClick={() => {
                    setSelected(it);
                    setTransactionVoucherVisible(true);
                  }}
                >
                  {t('View credentials')}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        visible={transactionVoucherVisible}
        onClose={() => setTransactionVoucherVisible(false)}
      >
        {selected && (
          <TransactionVoucher
            selected={selected}
            onClose={() => setTransactionVoucherVisible(false)}
          />
        )}
      </Modal>
    </div>
  );
}
