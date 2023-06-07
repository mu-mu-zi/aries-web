import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';
import { useLedgerOrderListQuery, useTrustLawListQuery } from '../../../api/trust/order';
import SimpleTable from '../../../views/SimpleTable';
import TextButton from '../../../components/TextButton';

export default function LegalText() {
  const { trustId } = useParams();
  const [page, setPage] = useState(1);
  const listQuery = useTrustLawListQuery({
    pageIndex: page,
    pageSize: 10,
    trustId: Number(trustId),
  });
  // const { t } = useTranslation();
  const intl = useIntl();

  return (
    <SimpleTable
      columns={[
        {
          Header: intl.formatMessage({ defaultMessage: 'Name of Legal Document' }),
          accessor: 'title',
        },
        {
          Header: () => (<div className="text-right"><FormattedMessage defaultMessage="Operation" /></div>),
          accessor: 'lawFilePath',
          // eslint-disable-next-line react/prop-types
          Cell: ({ row }) => (
            <div className="flex flex-row gap-4 justify-end">
              {/* eslint-disable-next-line react/prop-types */}
              {/* <TextButton onClick={() => window.open(row.original.lawFilePath)}>{t('Check')}</TextButton> */}
              {/* eslint-disable-next-line react/prop-types */}
              <TextButton onClick={() => window.open(row.original.lawFilePath)}>
                <FormattedMessage defaultMessage="Downloads" />
              </TextButton>
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
