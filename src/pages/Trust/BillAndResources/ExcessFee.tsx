import React, { useMemo, useState } from 'react';
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

export default function ExcessFee() {
  const { trustId } = useParams();
  const [page, setPage] = useState(1);
  const query = useTrustFeeListQuery({
    trustId: Number(trustId),
  });
  // const currentFee = useMemo(() => query.data?.data?.find((x) => x.feeType === 2), [query.data?.data]);
  const years = useFeeYears();
  const [year, setYear] = useState<number>(moment().year());
  const listQuery = useExcessFeeListQuery({
    pageIndex: page,
    pageSize: 10,
    trustId: Number(trustId),
    year,
  });
  const statisticsQuery = useTrustFeeStatisticsQuery({
    trustId: Number(trustId),
    type: 2,
    year,
  });
  const intl = useIntl();
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
              <SectionTitle title={(
                <FormattedMessage
                  defaultMessage="Excess transfer fee: {amount} {coinName}"
                  values={{
                    amount: currencyUSDTFormat(statisticsQuery?.data?.data?.amount),
                    coinName: statisticsQuery?.data?.data?.coinName,
                  }}
                />
              )}
              />
              {statisticsQuery.data?.data && (
                <div className="flex flex-row items-center flex-wrap gap-4 text-[#C2D7C7F6] text-[16px]">
                  <div>
                    <FormattedMessage
                      defaultMessage="Total amount of deposit: {amount} {coinName}"
                      values={{
                        amount: currencyUSDTFormat(statisticsQuery.data?.data.trustAmount),
                        coinName: statisticsQuery.data?.data.coinName,
                      }}
                    />
                  </div>
                  <div>
                    <FormattedMessage
                      defaultMessage="Accumulated transfer amount: {amount} {coinName}"
                      values={{
                        amount: currencyUSDTFormat(statisticsQuery.data.data.totalAmount),
                        coinName: statisticsQuery.data.data.coinName,
                      }}
                    />
                  </div>
                  <div>
                    <FormattedMessage
                      defaultMessage="Exceeding amount: {amount} {coinName}"
                      values={{
                        amount: currencyUSDTFormat(statisticsQuery.data?.data.excessAmount),
                        coinName: statisticsQuery.data.data.coinName,
                      }}
                    />
                  </div>
                </div>
              )}
              {statisticsQuery.data?.data?.billCertificate
                && <ViewCredentials onTap={() => setViewCredentialsVisible(true)} />}
            </div>
            <div className="max-w-[260px] w-full">
              <Dropdown
                title={`${year}`}
                items={years.map((x) => `${x}`)}
                onSelected={(idx) => setYear(years[idx])}
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
                Header: intl.formatMessage({ defaultMessage: 'Trust total amount' }),
                accessor: (x) => `${x.totalTrustAmount} ${x.totalTrustCoinName}`,
              },
              {
                Header: intl.formatMessage({ defaultMessage: 'Cumulative transferred amount' }),
                accessor: (x) => `${x.totalAmount} ${x.totalTrustCoinName}`,
              },
              {
                Header: intl.formatMessage({ defaultMessage: 'Transferred amount' }),
                accessor: (x) => `${x.amount} ${x.coinName}`,
              },
              {
                Header: () => <div className="text-right"><FormattedMessage defaultMessage="Currency Price" /></div>,
                accessor: 'totalAmount',
                // eslint-disable-next-line react/prop-types
                Cell: ({ row }) => (
                  <div
                    className="text-right gradient-text2"
                  >
                    {`1 ${row.original.coinName}≈${row.original.currencyPrice} ${row.original.totalTrustCoinName}`}
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
        title="Excess transfer fee"
        description={[
          intl.formatMessage({ defaultMessage: 'Excess transfer fees refer to the transfer fees incurred when the entrusted assets exceed the set limit during the operation of the trust plan. We charge a handling fee of {ratio} for each excess transfer according to the contract, which will be calculated based on the token price at the time of transfer. ' }, {
            ratio: ratioFormat(ratioQuery.data?.data?.find((x) => x.type === 3)?.expenseRatio),
          }),
          intl.formatMessage({ defaultMessage: 'To facilitate asset maintenance and appreciation for the client, we would like to provide specific information about transfer fees. When the amount of external transfer of entrusted assets exceeds the set limit, we will charge a fee of {ratio} based on the actual transfer amount. It should be noted that this fee is calculated based on the token price at the time of transfer and will be paid annually. At the same time, we will provide accurate information in accordance with the contract to help the client better understand the relevant situation of the transfer fee.' }, {
            ratio: ratioFormat(ratioQuery.data?.data?.find((x) => x.type === 3)?.expenseRatio),
          }),
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
