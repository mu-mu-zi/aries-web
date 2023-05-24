import React, { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import CancelNav from '../../../views/CancelNav';
import FeeIntroduction from './FeeIntroduction';
import Section, { SectionTitle } from './Section';
import Dropdown from '../../../components/Dropdown';
import Hr from '../../../components/Hr';
import SimpleTable from '../../../views/SimpleTable';
import ViewCredentials from './ViewCredentials';
import { useTrustManageFeeListQuery } from '../../../api/trust/fee';
import { unixFormatTime } from '../../../utils/DateFormat';
import { useTrustFeeListQuery } from '../../../api/trust/order';

export default function ManagerFee() {
  const { trustId } = useParams();
  const [page, setPage] = useState(1);
  const listQuery = useTrustManageFeeListQuery({
    pageIndex: page,
    pageSize: 10,
    trustId: Number(trustId),
    year: 2023,
  });
  const query = useTrustFeeListQuery({
    trustId: Number(trustId),
  });
  const total = useMemo(() => query.data?.data?.find((x) => x.feeType === 1)?.feeAmount, [query.data?.data]);

  return (
    <div className="flex flex-col gap-4">
      <CancelNav />
      <Section>
        <div className="flex flex-col gap-4">
          {/* todo: 金额 */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-4">
              <SectionTitle title={`Trust management fee: ${total} USD`} />
              <ViewCredentials />
            </div>
            <div className="max-w-[260px] w-full">
              <Dropdown
                title="2023"
                items={['2023']}
                block
              />
            </div>
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
                accessor: 'managementFeeApr',
              },
              {
                Header: () => (<div className="text-right">Management fee</div>),
                accessor: 'totalAmount',
                // eslint-disable-next-line react/prop-types
                Cell: ({ row }) => (<div className="text-right gradient-text2">{`${row.original.totalAmount} ${row.original.coinName}`}</div>),
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
        title="Trust management fee"
        description={[
          'Trust management fee refers to the fee charged by the trust company to the settlor for providing custody, risk control, asset management and other services according to the provisions of the trust plan agreement. Our company\'s trust plan management fee is generally collected at a standard annualized rate of 0.6%, and this fee is calculated based on the actual market value of the assets under custody. Please note that we will automatically deduct this amount from your custodial account. By default, we will deduct the corresponding amount of fiat currency, such as RMB, as the management fee from your custodial account. If there is not enough fiat currency in your custodial account, we will deduct assets equivalent to the management fee from your custodial account according to the contract.',
          'Before you make an investment, we need to clearly inform you of the relevant fees and deductions. In addition, we will provide you with regular bills of your investment portfolio and related fees to enable you to have a clear understanding of the asset management fees for a certain period of time in the past. We recommend that you, as the settlor, should be aware of various fees rates and deduction methods associated with the selected trust plan in advance to ensure a clear understanding of your investment costs and accordingly formulate an investment plan. As a settlor, you should always closely monitor your investment and stay informed about the latest information regarding fees and changes in assets, as well as any other issues that may affect your investment results. ',
          'Please note that the collected management fees cannot replace your final investment results. We cannot guarantee that your investment funds will definitely generate profits and provide investment advice accordingly. Any information regarding expected returns, risk analysis, and investment advice should be used for reference purposes only. You should be solely responsible for analyzing and evaluating your investment decisions.',
        ]}
      />
    </div>
  );
}
