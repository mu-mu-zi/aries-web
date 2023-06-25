import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';
import { useTrustReportListQuery } from '../../../api/trust/order';
import SimpleTable from '../../../views/SimpleTable';
import { IReport } from '../../../interfaces/trust';
import TextButton from '../../../components/TextButton';

export default function Report() {
  const { trustId } = useParams();
  const [page, setPage] = useState(1);
  const listQuery = useTrustReportListQuery({
    trustId: Number(trustId),
    pageIndex: page,
    pageSize: 5,
  });
  // const { t } = useTranslation();
  const intl = useIntl();

  return (
    <SimpleTable
      columns={[
        {
          Header: intl.formatMessage({ defaultMessage: 'Name of Report Document' }),
          accessor: (e) => e.title,
        },
        {
          Header: () => (<div className="text-right"><FormattedMessage defaultMessage="Operation" /></div>),
          accessor: 'reportFilePath',
          // eslint-disable-next-line react/prop-types
          Cell: ({ row }) => (
            <div className="flex flex-row gap-4 items-center justify-end">
              {/* eslint-disable-next-line react/prop-types */}
              {/* <TextButton onClick={() => window.open(row.original.reportFilePath)}>{t('Check')}</TextButton> */}
              {/* eslint-disable-next-line react/prop-types */}
              <TextButton onClick={() => window.open(row.original.reportFilePath)}><FormattedMessage defaultMessage="Downloads" /></TextButton>
            </div>
          ),
        },
      ]}
      data={listQuery.data?.data?.records}
      pagination={{
        pageIndex: page,
        pageSize: 5,
        total: listQuery.data?.data?.total ?? 0,
        onPageChanged: (page) => setPage(page),
      }}
    />
  );
}
