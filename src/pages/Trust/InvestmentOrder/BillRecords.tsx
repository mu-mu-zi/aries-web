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
import SimpleTable from '../../../views/SimpleTable';
import { unixFormatTime } from '../../../utils/DateFormat';
import TextButton from '../../../components/TextButton';
import { numberFormatWithPrefix } from '../../../utils/CurrencyFormat';

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

  const billTypeTitle = (type: number) => {
    // 1-法币转出，2-法币转入，3-数字资产转出，4-数字资产转入，5-兑换交易，6-自定义
    switch (type) {
      case 1:
        return t('Withdrawal of fiat currency');
      case 2:
        return t('Fiat currency deposit');
      case 3:
        return t('Transfer of digital assets');
      case 4:
        return t('Transfer of digital assets');
      case 5:
        return t('Exchange transaction');
      case 6:
        return t('Customization');
      default:
        return '--';
    }
  };

  return (
    <div className="flex flex-col gap-4 gradient-bg2 rounded-xl p-8 shadow-block">
      {/* 标题 */}
      <div className="gradient-text1 font-bold text-[20px] font-title">{t('Bill Records')}</div>
      {/* 分割线 */}
      <div className="h-[1px] bg-[#3B5649]" />
      <SimpleTable
        columns={[
          {
            Header: 'Type',
            accessor: (x) => billTypeTitle(x.billType),
          },
          {
            Header: 'Currency',
            accessor: 'coinName',
          },
          {
            Header: () => (<div className="text-right">Amount</div>),
            accessor: 'quantity',
            // eslint-disable-next-line react/prop-types
            Cell: ({ row }) => (
              <div
                className="gradient-text1 text-right"
              >
                {`${numberFormatWithPrefix(row.original.quantity)} ${row.original.coinName}`}
              </div>
            ),
          },
          {
            Header: () => (<div className="text-right">Time</div>),
            accessor: 'time',
            // eslint-disable-next-line react/prop-types
            Cell: ({ row }) => <div className="text-right">{unixFormatTime(row.original.createTimeStamp)}</div>,
          },
          {
            Header: () => <div className="text-right">Reconciliation</div>,
            accessor: 'Reconciliation',
            // eslint-disable-next-line react/prop-types
            Cell: ({ row }) => (
              <div className="flex justify-end">
                {row.original.billCertificate && (
                  <TextButton
                    className="gradient-text2 text-right cursor-pointer"
                    onClick={() => {
                      // eslint-disable-next-line react/prop-types
                      setSelected(row.original);
                      setTransactionVoucherVisible(true);
                    }}
                  >
                    {t('View credentials')}
                  </TextButton>
                )}
              </div>
            ),
          },
        ]}
        data={listQuery.data?.data?.records}
        pagination={{
          pageIndex: page,
          pageSize: 5,
          total: listQuery.data?.data?.total ?? 0,
          onPageChanged(page: number) {
            setPage(page);
          },
        }}
      />
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
