import React, { useMemo, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';
import moment from 'moment';
import CancelNav from '../../../views/CancelNav';
import Section, { SectionTitle } from './Section';
import Dropdown from '../../../components/Dropdown';
import Hr from '../../../components/Hr';
import SimpleTable from '../../../views/SimpleTable';
import FeeIntroduction from './FeeIntroduction';
import ViewCredentials from './ViewCredentials';
import { unixFormatTime } from '../../../utils/DateFormat';
import { useExpenseRatioQuery, useTrustFeeStatisticsQuery, useTrustManageFeeListQuery } from '../../../api/trust/fee';
import { useExcessFeeListQuery, useTrustFeeListQuery } from '../../../api/trust/order';
import { currencyUSDTFormat, ratioFormat } from '../../../utils/CurrencyFormat';
import RecodeViewCredentials from '../AssetTransfet/RecodeViewCredentials';
import Modal from '../../../components/Modal';
import { allYears } from '../../../utils/year';
import useFeeYears from '../../../hooks/useFeeYears';
import useGetDate, { BaseType } from '../../../hooks/useGetDate';

export default function ExcessFee() {
  const { trustId } = useParams();
  const [page, setPage] = useState(1);
  const query = useTrustFeeListQuery({
    trustId: Number(trustId),
  });
  const currentFee = useMemo(() => query.data?.data?.find((x) => x.feeType === 2), [query.data?.data]);
  console.log('currentFee', currentFee);
  const years = useFeeYears();
  const [year, setYear] = useState<number>(moment().year());
  const [selectAy, setSelectAy] = useState<BaseType[]>();
  const [selectVal, setSelectVal] = useState<BaseType>();
  const listQuery = useExcessFeeListQuery({
    pageIndex: page,
    pageSize: 10,
    trustId: Number(trustId),
    year: selectVal?.year,
    month: selectVal?.month,
    quarter: selectVal?.quarter,
  });
  const statisticsQuery = useTrustFeeStatisticsQuery({
    trustId: Number(trustId),
    type: 2,
    year: selectVal?.year,
    month: selectVal?.month,
    quarter: selectVal?.quarter,
  });
  const intl = useIntl();
  const date = useGetDate();
  useEffect(() => {
    if (!currentFee) return;
    let showDate;
    if (currentFee.type === 1) {
      showDate = date.years;
    }
    if (currentFee.type === 2) {
      showDate = date.quarter;
    }
    if (currentFee.type === 3) {
      showDate = date.month;
    }
    setSelectAy(showDate);
    setSelectVal(showDate?.[0]);
  }, [currentFee]);

  const transferType = (time: number | undefined) => {
    switch (time) {
      case 1:
        return intl.formatMessage({
          defaultMessage: 'Transfer Fee for the Current Year: {amount} {coinName}',
        }, {
          amount: currencyUSDTFormat(statisticsQuery?.data?.data?.amount),
          coinName: statisticsQuery?.data?.data?.coinName,
        });
      case 2:
        return intl.formatMessage({ defaultMessage: 'Transfer Fee for the Current Quarter: {amount} {coinName}' }, {
          amount: currencyUSDTFormat(statisticsQuery?.data?.data?.amount),
          coinName: statisticsQuery?.data?.data?.coinName,
        });
      case 3:
        return intl.formatMessage({ defaultMessage: 'Transfer Fee for the Current Month: {amount} {coinName}' }, {
          amount: currencyUSDTFormat(statisticsQuery?.data?.data?.amount),
          coinName: statisticsQuery?.data?.data?.coinName,
        });
      default:
        return '';
    }
  };

  const accumulatedTransferType = (time: number | undefined) => {
    switch (time) {
      case 1:
        return intl.formatMessage({
          defaultMessage: 'Accumulated Transfer Amount for the Current Year: {amount} {coinName}',
        }, {
          amount: currencyUSDTFormat(statisticsQuery?.data?.data.totalAmount),
          coinName: statisticsQuery?.data?.data.coinName,
        });
      case 2:
        return intl.formatMessage({ defaultMessage: 'Accumulated Transfer Amount for the Current Quarter: {amount} {coinName}' }, {
          amount: currencyUSDTFormat(statisticsQuery.data?.data.totalAmount),
          coinName: statisticsQuery.data?.data.coinName,
        });
      case 3:
        return intl.formatMessage({ defaultMessage: 'Accumulated Transfer Amount for the Current Month: {amount} {coinName}' }, {
          amount: currencyUSDTFormat(statisticsQuery.data?.data.totalAmount),
          coinName: statisticsQuery.data?.data.coinName,
        });
      default:
        return '';
    }
  };

  const [viewCredentialsVisible, setViewCredentialsVisible] = useState(false);
  const ratioQuery = useExpenseRatioQuery();

  return (
    <div className="flex flex-col gap-4">
      <CancelNav />
      <Section>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4 justify-between">
            <div className="flex flex-col gap-4">
              {/* <SectionTitle title={`Excess transfer fee: ${currencyUSDTFormat(currentFee?.feeAmount)} ${currentFee?.coinName}`} /> */}
              <SectionTitle title={transferType(currentFee?.type)} />
              {statisticsQuery.data?.data && (
                <div className="flex flex-row items-center flex-wrap gap-4 text-[#C2D7C7F6] text-[16px]">
                  {/* <div> */}
                  {/*  <FormattedMessage */}
                  {/*    defaultMessage="Total amount of deposit: {amount} {coinName}" */}
                  {/*    values={{ */}
                  {/*      amount: currencyUSDTFormat(statisticsQuery.data?.data.trustAmount), */}
                  {/*      coinName: statisticsQuery.data?.data.coinName, */}
                  {/*    }} */}
                  {/*  /> */}
                  {/* </div> */}
                  <div>
                    {accumulatedTransferType(currentFee?.type)}
                  </div>
                  {/* <div> */}
                  {/*  <FormattedMessage */}
                  {/*    defaultMessage="Exceeding amount: {amount} {coinName}" */}
                  {/*    values={{ */}
                  {/*      amount: currencyUSDTFormat(statisticsQuery.data?.data.excessAmount), */}
                  {/*      coinName: statisticsQuery.data.data.coinName, */}
                  {/*    }} */}
                  {/*  /> */}
                  {/* </div> */}
                </div>
              )}
              {statisticsQuery.data?.data?.billCertificate
                && <ViewCredentials onTap={() => setViewCredentialsVisible(true)} />}
            </div>
            <div className="max-w-[260px] w-full">
              <Dropdown
                title={`${selectVal?.title}`}
                items={selectAy?.map((x) => `${x.title}`)}
                onSelected={(idx) => setSelectVal(selectAy?.[idx])}
                block
              />
            </div>
          </div>
          <Hr />
          <SimpleTable
            columns={[
              {
                Header: intl.formatMessage({ defaultMessage: 'Time' }),
                accessor: (x) => unixFormatTime(x.createTimeStamp),
              },
              {
                Header: intl.formatMessage({ defaultMessage: 'Network' }),
                accessor: (x) => x.mainnet,
              },
              {
                Header: intl.formatMessage({ defaultMessage: 'Transfer Amount' }),
                accessor: (x) => `${x.amount} ${x.coinName}`,
              },
              // {
              //   Header: intl.formatMessage({ defaultMessage: 'Cumulative transferred amount' }),
              //   accessor: (x) => `${x.totalAmount} ${x.totalTrustCoinName}`,
              // },
              {
                Header: intl.formatMessage({ defaultMessage: 'Transfer Amount (USD)' }),
                accessor: (x) => `${currencyUSDTFormat(x.amountUSD)} USD`,
              },
              {
                Header: intl.formatMessage({ defaultMessage: 'Transferred Fee (USD)' }),
                accessor: (x) => `${currencyUSDTFormat(x.feeAmount)} USD`,
              },
              {
                Header: () => <div className="text-right"><FormattedMessage defaultMessage="Exchange Rate" /></div>,
                accessor: 'totalAmount',
                // eslint-disable-next-line react/prop-types
                Cell: ({ row }) => (
                  <div
                    className="text-right gradient-text2"
                  >
                    {`1 ${row.original.coinName}≈${currencyUSDTFormat(row.original.currencyPrice)} ${row.original.totalTrustCoinName}`}
                  </div>
                ),
              },
            ]}
            data={listQuery.data?.data?.records}
            pagination={{
              pageIndex: page,
              pageSize: 10,
              total: listQuery.data?.data?.total ?? 0,
              onPageChanged(page: number) {
                setPage(page);
              },
            }}
          />
        </div>
      </Section>
      <FeeIntroduction
        title={intl.formatMessage({ defaultMessage: 'About Transfer Fee' })}
        description={[
          intl.formatMessage({ defaultMessage: 'When transferring digital assets from the custodial account, a transfer fee will be incurred. This fee is calculated as {ratio} of the equivalent value in USD of the digital assets being transferred, calculated on a per transaction basis' }, {
            // ratio: ratioFormat(ratioQuery.data?.data?.find((x) => x.type === 3)?.expenseRatio),
            ratio: ratioFormat(currentFee?.interestRate),
          }),
          intl.formatMessage({ defaultMessage: 'The accumulated transfer fees for this billing cycle will be collected on December 31st of each year/the last day of each quarter/the last day of each month and on the trust termination date' }),
          intl.formatMessage({ defaultMessage: "It's important to note that this transfer fee does not include the gas fees required for blockchain transactions" }),
        ]}
      />
      <Modal
        visible={viewCredentialsVisible}
        onClose={() => setViewCredentialsVisible(false)}
      >
        <RecodeViewCredentials
          images={[statisticsQuery.data?.data?.billCertificate]}
          onClose={() => setViewCredentialsVisible(false)}
        />
      </Modal>
    </div>
  );
}
