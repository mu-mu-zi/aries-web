import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';
import Hr from '../../../components/Hr';
import { useDistributionBillQuery } from '../../../api/trust/distribution';
import SimpleTable from '../../../views/SimpleTable';
import { unixFormatTime } from '../../../utils/DateFormat';
import TextButton from '../../../components/TextButton';

export default function AllocationRecord() {
  const { trustId } = useParams();
  const [page, setPage] = useState(1);
  const listQuery = useDistributionBillQuery({
    trustId: Number(trustId),
    pageIndex: page,
    pageSize: 5,
  });
  const intl = useIntl();

  return (
    <div className="flex flex-col gap-4 gradient-bg2 rounded-xl p-8">
      <div className="gradient-text1 font-title font-bold text-[20px]">
        <FormattedMessage defaultMessage="Allocation Record" />
      </div>
      <Hr />
      <SimpleTable
        columns={[
          {
            Header: intl.formatMessage({ defaultMessage: 'Beneficiary' }),
            accessor: 'beneficiaryUserName',
          },
          {
            Header: intl.formatMessage({ defaultMessage: 'Time' }),
            accessor: (x) => unixFormatTime(x.createTimeStamp),
          },
          {
            Header: intl.formatMessage({ defaultMessage: 'Currency' }),
            accessor: (x) => x.coinName,
          },
          {
            Header: () => (
              <div className="text-right">
                <FormattedMessage defaultMessage="Amount" />
              </div>
            ),
            accessor: 'quantity',
            // eslint-disable-next-line react/prop-types
            Cell: ({ row }) => (
              // eslint-disable-next-line react/prop-types
              <div className="text-right text-[16px] gradient-text2">{row.original.quantity}</div>
            ),
          },
          {
            Header: () => (<div className="text-right"><FormattedMessage defaultMessage="Reconciliation" /></div>),
            accessor: 'reconciliation',
            // eslint-disable-next-line react/prop-types
            Cell: ({ row }) => (
              <div className="flex justify-end">
                <TextButton><FormattedMessage defaultMessage="View credentials" /></TextButton>
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
    </div>
  );
}
