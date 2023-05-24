import React, { useState } from 'react';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Dropdown from '../../../components/Dropdown';
import { useLedgerOrderListQuery } from '../../../api/trust/order';
import SimpleTable from '../../../views/SimpleTable';
import { unixFormatTime } from '../../../utils/DateFormat';

export default function Ledger() {
  const { trustId } = useParams();
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const listQuery = useLedgerOrderListQuery({
    pageIndex: page,
    pageSize: 10,
    trustId: Number(trustId),
  });

  return (
    <div className="flex flex-col gap-4">
      <form>
        <div className="flex items-center gap-4">
          <div className="flex-auto">
            <Dropdown title="All" />
          </div>
          <div className="flex-auto">
            <Dropdown title="All" />
          </div>
          <div className="flex-auto">
            <Dropdown title="All" />
          </div>
          <div>Reset</div>
        </div>
      </form>
      <SimpleTable
        columns={[
          {
            Header: t('Time') ?? '',
            accessor: (originalRow) => unixFormatTime(originalRow.createTimeStamp),
          },
          {
            Header: t('Type') ?? '',
            accessor: 'billTypeName',
          },
          {
            Header: t('Currency') ?? '',
            accessor: 'coinName',
          },
          {
            Header: t('Amount') ?? '',
            // accessor: 'amount',
            // eslint-disable-next-line react/prop-types
            Cell: ({ row }) => <div className="font-title gradient-text1 text-[16px]">{row.original?.amount}</div>,
          },
          {
            accessor: 'Reconciliation',
            Header: () => (<div className="text-right">{t('Reconciliation')}</div>),
            Cell: ({ }) => <div className="font-title gradient-text2 text-right text-[14px] font-bold cursor-pointer">{t('View credentials')}</div>,
          },
        ]}
        data={listQuery.data?.data?.records}
        pagination={{
          pageIndex: page,
          total: listQuery.data?.data?.total ?? 0,
          pageSize: 10,
          onPageChanged: (page) => setPage(page),
        }}
      />
    </div>
  );
}
