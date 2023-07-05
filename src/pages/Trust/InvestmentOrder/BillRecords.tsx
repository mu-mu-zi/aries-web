import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { list } from 'postcss';
import moment from 'moment';
import { FormattedMessage, useIntl } from 'react-intl';
import copyIcon from '../../../assets/icon/copy.svg';
import Modal from '../../../components/Modal';
import TransactionVoucher from './TransactionVoucher';
import { useInvestmentOrderRecodeQuery } from '../../../api/trust/investment';
import { IInvestmentOrderRecode } from '../../../interfaces/trust';
import SimpleTable from '../../../views/SimpleTable';
import { unixFormatTime } from '../../../utils/DateFormat';
import TextButton from '../../../components/TextButton';
import { numberFormatWithPrefix } from '../../../utils/CurrencyFormat';
import TrustContainer from '../TrustContainer';
import NoCredentials from '../../../views/NoCredentials';
import Tooltip from '../../../components/Tooltip';
import { stringShort } from '../../../utils/stringShort';

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
  // const { t } = useTranslation();
  const [selected, setSelected] = useState<IInvestmentOrderRecode>();
  const intl = useIntl();

  const billTypeTitle = (type: number, customName: string) => {
    // 1-法币转出，2-法币转入，3-数字资产转出，4-数字资产转入，5-兑换交易，6-自定义
    switch (type) {
      case 1: return intl.formatMessage({ defaultMessage: 'Withdrawal of fiat currency', description: '投资指令/账单类型' });
      case 2: return intl.formatMessage({ defaultMessage: 'Fiat currency deposit', description: '投资指令/账单类型' });
      case 3: return intl.formatMessage({ defaultMessage: 'Digital asset transfer out', description: '投资指令/账单类型' });
      case 4: return intl.formatMessage({ defaultMessage: 'Transfer of digital assets', description: '投资指令/账单类型' });
      case 5: return intl.formatMessage({ defaultMessage: 'Exchange transaction', description: '投资指令/账单类型' });
      case 6: return customName ?? '--';
      default: return '--';
    }
  };

  return (
    <TrustContainer>
      <div className="flex flex-col gap-4 gradient-bg2 rounded-xl p-8">
        {/* 标题 */}
        <div className="gradient-text1 font-bold text-[20px] font-title">
          <FormattedMessage defaultMessage="Bill Records" />
        </div>
        {/* 分割线 */}
        <div className="h-[1px] bg-[#3B5649]" />
        <SimpleTable
          columns={[
            // v1.1
            // {
            //   Header: intl.formatMessage({ defaultMessage: 'Type' }),
            //   accessor: (x) => billTypeTitle(x.billType, x.billName),
            //   // accessor: (x) => x.billName ?? '--',
            // },
            {
              Header: intl.formatMessage({ defaultMessage: 'Network' }),
              accessor: 'mainnet',
            },
            {
              Header: intl.formatMessage({ defaultMessage: 'Asset Classes' }),
              accessor: 'coinName',
            },
            {
              Header: () => (<div className="text-right"><FormattedMessage defaultMessage="Amount" /></div>),
              accessor: 'quantity',
              Cell: ({ row }) => (
                <div
                  className="gradient-text1 text-right"
                >
                  {/* {`${numberFormatWithPrefix(row.original.quantity)} ${row.original.coinName}`} */}
                  {`${numberFormatWithPrefix(row.original.quantity)}`}
                </div>
              ),
            },
            {
              Header: () => (<div className="text-right"><FormattedMessage defaultMessage="Time" /></div>),
              accessor: 'time',
              // eslint-disable-next-line react/prop-types
              Cell: ({ row }) => <div className="text-right">{unixFormatTime(row.original.createTimeStamp)}</div>,
            },
            {
              Header: () => (<div className="text-right"><FormattedMessage defaultMessage="remark" description="总账单页面" /></div>),
              accessor: 'remark',
              Cell: ({ row }) => (
                <div className="text-right">
                  <Tooltip
                    title={intl.formatMessage({ defaultMessage: 'remark', description: '总账单页面' })}
                    content={row.original.remark}
                  >
                    <div>{stringShort(row.original.remark, 20)}</div>
                  </Tooltip>
                </div>
              ),
            },
            {
              Header: () => (
                <div className="text-right">
                  <FormattedMessage defaultMessage="Reconciliation" />
                </div>
              ),
              accessor: 'Reconciliation',
              // eslint-disable-next-line react/prop-types
              Cell: ({ row }) => (
                <div className="flex justify-end">
                  {row.original.billCertificate ? (
                    <TextButton
                      className="gradient-text2 text-right cursor-pointer"
                      onClick={() => {
                      // eslint-disable-next-line react/prop-types
                        setSelected(row.original);
                        setTransactionVoucherVisible(true);
                      }}
                    >
                      <FormattedMessage defaultMessage="View credentials" />
                    </TextButton>
                  ) : <NoCredentials />}
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
    </TrustContainer>
  );
}
