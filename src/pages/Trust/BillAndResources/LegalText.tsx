import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLedgerOrderListQuery, useTrustLawListQuery } from '../../../api/trust/order';
import SimpleTable from '../../../views/SimpleTable';

export default function LegalText() {
  const { trustId } = useParams();
  const [page, setPage] = useState(1);
  const listQuery = useTrustLawListQuery({
    pageIndex: page,
    pageSize: 10,
    trustId: Number(trustId),
  });
  const { t } = useTranslation();

  return (
    <SimpleTable
      columns={[
        {
          Header: t('Name of Legal Document') ?? '',
          accessor: 'title',
        },
        {
          Header: () => (<div className="text-right">{t('Operation')}</div>),
          accessor: 'lawFilePath',
          // eslint-disable-next-line react/prop-types
          Cell: ({ row }) => (
            <div className="flex flex-row gap-4 justify-end">
              {/* eslint-disable-next-line react/prop-types */}
              <a href={row.original.lawFilePath} target="_blank" className="font-title gradient-text2 text-[14px] font-bold cursor-pointer" rel="noreferrer">{t('Check')}</a>
              {/* eslint-disable-next-line react/prop-types */}
              <a href={row.original.lawFilePath} target="_blank" className="font-title gradient-text2 text-[14px] font-bold cursor-pointer" rel="noreferrer">{t('Downloads')}</a>
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
