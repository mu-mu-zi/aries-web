import React, { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import CancelNav from '../../../views/CancelNav';
import Section, { SectionTitle } from './Section';
import Dropdown from '../../../components/Dropdown';
import Hr from '../../../components/Hr';
import SimpleTable from '../../../views/SimpleTable';
import FeeIntroduction from './FeeIntroduction';
import ViewCredentials from './ViewCredentials';
import { unixFormatTime } from '../../../utils/DateFormat';
import { useTrustFeeStatisticsQuery, useTrustManageFeeListQuery } from '../../../api/trust/fee';
import { useExcessFeeListQuery, useTrustFeeListQuery } from '../../../api/trust/order';

export default function ExcessFee() {
  const { trustId } = useParams();
  const [page, setPage] = useState(1);
  const listQuery = useExcessFeeListQuery({
    pageIndex: page,
    pageSize: 10,
    trustId: Number(trustId),
    year: 2023,
  });
  const query = useTrustFeeListQuery({
    trustId: Number(trustId),
  });
  const total = useMemo(() => query.data?.data?.find((x) => x.feeType === 2)?.feeAmount, [query.data?.data]);
  const statisticsQuery = useTrustFeeStatisticsQuery({
    trustId: Number(trustId),
    type: 2,
    year: 2023,
  });

  return (
    <div className="flex flex-col gap-4">
      <CancelNav />
      <Section>
        <div className="flex flex-col gap-4">
          {/* todo: 金额 */}
          <div className="flex items-center gap-4 justify-between">
            <div className="flex flex-col gap-4">
              <SectionTitle title={`Excess transfer fee: ${total} USD`} />
              {statisticsQuery.data?.data && (
                <div className="flex flex-row items-center flex-wrap gap-4 text-[#C2D7C7F6] text-[16px]">
                  <div>{`Total amount of deposit: ${statisticsQuery.data?.data.trustAmount} ${statisticsQuery.data?.data.coinName}`}</div>
                  <div>{`Accumulated transfer amount: ${statisticsQuery.data.data.totalAmount} ${statisticsQuery.data.data.coinName}`}</div>
                  <div>{`Exceeding amount: ${statisticsQuery.data?.data.excessAmount} ${statisticsQuery.data.data.coinName}`}</div>
                </div>
              )}
              <ViewCredentials />
            </div>
            <div className="max-w-[260px] w-full"><Dropdown title="2023" items={['2023']} block /></div>
          </div>
          <Hr />
          <SimpleTable
            columns={[
              {
                Header: 'Time',
                accessor: (x) => unixFormatTime(x.createTimeStamp),
              },
              {
                Header: 'Trust total amount',
                accessor: (x) => `${x.totalTrustAmount} ${x.totalTrustCoinName}`,
              },
              {
                Header: 'Cumulative transferred amount',
                accessor: (x) => `${x.totalAmount} ${x.totalTrustCoinName}`,
              },
              {
                Header: 'Transferred amount',
                accessor: (x) => `${x.amount} ${x.coinName}`,
              },
              {
                Header: () => <div className="text-right">Currency Price</div>,
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
          'Excess transfer fees refer to the transfer fees incurred when the entrusted assets exceed the set limit during the operation of the trust plan. We charge a handling fee of 0.03% for each excess transfer according to the contract, which will be calculated based on the token price at the time of transfer. ',
          'To facilitate asset maintenance and appreciation for the client, we would like to provide specific information about transfer fees. When the amount of external transfer of entrusted assets exceeds the set limit, we will charge a fee of 0.03% based on the actual transfer amount. It should be noted that this fee is calculated based on the token price at the time of transfer and will be paid annually. At the same time, we will provide accurate information in accordance with the contract to help the client better understand the relevant situation of the transfer fee.',
        ]}
      />
    </div>
  );
}
