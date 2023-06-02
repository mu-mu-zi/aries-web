import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
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
    pageSize: 10,
  });
  const { t } = useTranslation();

  return (
    <SimpleTable
      columns={[
        {
          Header: 'Name of Report Document',
          accessor: (e) => e.title,
        },
        {
          Header: () => (<div className="text-right">{t('Operation')}</div>),
          accessor: 'reportFilePath',
          // eslint-disable-next-line react/prop-types
          Cell: ({ row }) => (
            <div className="flex flex-row gap-4 justify-end">
              {/* eslint-disable-next-line react/prop-types */}
              {/* <TextButton onClick={() => window.open(row.original.reportFilePath)}>{t('Check')}</TextButton> */}
              {/* eslint-disable-next-line react/prop-types */}
              <TextButton onClick={() => window.open(row.original.reportFilePath)}>{t('Downloads')}</TextButton>
            </div>
          ),
        },
      ]}
      data={listQuery.data?.data?.records}
      pagination={{
        pageIndex: page,
        pageSize: 10,
        total: listQuery.data?.data?.total ?? 0,
        onPageChanged: (page) => setPage(page),
      }}
    />
  );
}
