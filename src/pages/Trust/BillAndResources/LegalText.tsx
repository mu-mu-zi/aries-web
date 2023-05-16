import React, { useState } from 'react';
import { useLedgerOrderListQuery, useTrustLawListQuery } from '../../../api/trust/order';
import SimpleTable from '../../../views/SimpleTable';

export default function LegalText() {
  const [page, setPage] = useState(1);
  const listQuery = useTrustLawListQuery({
    pageIndex: page,
    pageSize: 10,
    trustId: 15,
  });

  return (
    <SimpleTable
      columns={[
        {
          Header: 'Name of Legal Document',
          accessor: 'title',
        },
        {
          Header: () => (<div className="text-right">Operation</div>),
          accessor: 'lawFilePath',
          // eslint-disable-next-line react/prop-types
          Cell: ({ row }) => (
            <div className="flex flex-row gap-4 justify-end">
              {/* eslint-disable-next-line react/prop-types */}
              <a href={row.original.lawFilePath} target="_blank" className="font-title gradient-text2 text-[14px] font-bold cursor-pointer" rel="noreferrer">Check</a>
              {/* eslint-disable-next-line react/prop-types */}
              <a href={row.original.lawFilePath} target="_blank" className="font-title gradient-text2 text-[14px] font-bold cursor-pointer" rel="noreferrer">Downloads</a>
            </div>
          ),
        },
      ]}
      data={listQuery.data?.data?.records}
    />
  );
}
