import React, { useState } from 'react';
import { useTrustReportListQuery } from '../../../api/trust/order';
import SimpleTable from '../../../views/SimpleTable';
import { IReport } from '../../../interfaces/trust';

export default function Report() {
  const [page, setPage] = useState(1);
  const listQuery = useTrustReportListQuery({
    trustId: 15,
    pageIndex: page,
    pageSize: 10,
  });

  return (
    <SimpleTable
      columns={[
        {
          Header: 'Name of Report Document',
          accessor: (e) => e.title,
        },
        {
          Header: () => (<div className="text-right">Operation</div>),
          accessor: 'reportFilePath',
          // eslint-disable-next-line react/prop-types
          Cell: ({ row }) => (
            <div className="flex flex-row gap-4 justify-end">
              {/* eslint-disable-next-line react/prop-types */}
              <a href={row.original.reportFilePath} target="_blank" className="font-title gradient-text2 text-[14px] font-bold cursor-pointer" rel="noreferrer">Check</a>
              {/* eslint-disable-next-line react/prop-types */}
              <a href={row.original.reportFilePath} target="_blank" className="font-title gradient-text2 text-[14px] font-bold cursor-pointer" rel="noreferrer">Downloads</a>
            </div>
          ),
        },
      ]}
      data={listQuery.data?.data?.records}
    />
  );
}
