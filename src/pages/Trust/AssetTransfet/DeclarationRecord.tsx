import React, { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query';
import Modal from '../../../components/Modal';
import ViewCredentials from './ViewCredentials';
import SimpleTable from '../../../views/SimpleTable';
import { useTrustAssetDeclareQuery } from '../../../api/trust/asset';
import { unixFormatTime } from '../../../utils/DateFormat';
import TextButton from '../../../components/TextButton';
import { numberFormatWithPrefix } from '../../../utils/CurrencyFormat';
import RecodeViewCredentials from './RecodeViewCredentials';

export default function DeclarationRecord() {
  const { t } = useTranslation();
  const [detailVisible, setDetailVisible] = useState(false);
  const [page, setPage] = useState(1);
  const { trustId } = useParams();
  const listQuery = useTrustAssetDeclareQuery({
    trustId: Number(trustId),
    pageIndex: page,
    pageSize: 5,
  });
  const queryClient = useQueryClient();
  const [recordId, setRecordId] = useState<number>();
  const [credentials, setCredentials] = useState<string[]>([]);
  const [viewCredentialsVisible, setViewCredentialsVisible] = useState(false);

  const statusTitle = (status: any) => {
    switch (status) {
      case 1:
        return t('To be verified');
      case 2:
        return t('Pending accounting');
      case 3:
        return t('Already recorded in account');
      case 4:
        return t('Verification failed');
      case 5:
        return t('Application for cancellation');
      case 6:
        return t('Cancelled');
      default:
        return '--';
    }
  };

  return (
    <div className="flex flex-col gap-4 gradient-bg2 rounded-xl block-gradient-border shadow-block p-8">
      <div className="gradient-text1 font-bold font-title text-[20px]">{t('Commission declaration record')}</div>
      <div className="h-[1px] bg-[#3B5649]" />
      <SimpleTable
        columns={[
          {
            Header: 'Time',
            accessor: (x) => unixFormatTime(x.createTime),
          },
          {
            Header: 'Type',
            accessor: (x) => (x.payType === 1 ? t('Digital') : t('Fiat')),
          },
          {
            Header: () => <div className="text-right">Amount</div>,
            accessor: 'amount',
            Cell: ({ row }) => (
              <div className="flex items-center gap-2 gradient-text1 justify-end">
                <div>{numberFormatWithPrefix(row.original.amount)}</div>
                <div>{row.original.symbol}</div>
              </div>
            ),
          },
          {
            Header: () => <div className="text-right">Status</div>,
            accessor: 'status',
            Cell: ({ row }) => (
              <div className="text-right">{`${statusTitle(row.original.status)}`}</div>
            ),
          },
          {
            Header: () => (<div className="text-right">Reconciliation</div>),
            accessor: 'reconciliation',
            // eslint-disable-next-line react/prop-types
            Cell: ({ row }) => (
              <div className="flex flex-row gap-4 justify-end">
                <TextButton
                  onClick={() => {
                    // eslint-disable-next-line react/prop-types
                    setRecordId(row.original?.id);
                    setDetailVisible(true);
                  }}
                >
                  {t('View details')}
                </TextButton>
                {row.original.proofs && row.original.proofs.length > 0 && (
                  <TextButton
                    onClick={() => {
                      setCredentials(row.original.proofs ?? []);
                      setViewCredentialsVisible(true);
                    }}
                  >
                    {t('View credentials')}
                  </TextButton>
                )}
                {
                  // eslint-disable-next-line react/prop-types
                  row.original?.status === 1 && (
                    <TextButton
                      onClick={async () => {
                        await axios.post('/trust/assetDeclare/cancel', {
                          id: row.original?.id,
                        });
                        await queryClient.invalidateQueries(['trust']);
                      }}
                    >
                      {t('Cancel')}
                    </TextButton>
                  )
                }
              </div>
            ),
          },
        ]}
        data={listQuery.data?.data?.records}
        pagination={{
          total: listQuery.data?.data?.total,
          pageIndex: page,
          pageSize: 5,
          onPageChanged(page: number) {
            setPage(page);
          },
        }}
      />
      {recordId && (
        <Modal
          visible={detailVisible}
          onClose={() => setDetailVisible(false)}
        >
          <ViewCredentials
            recordId={recordId}
            onClose={() => setDetailVisible(false)}
          />
        </Modal>
      )}

      <Modal
        visible={viewCredentialsVisible}
        onClose={() => setViewCredentialsVisible(false)}
      >
        <RecodeViewCredentials
          images={credentials}
          onClose={() => setViewCredentialsVisible(false)}
        />
      </Modal>
    </div>
  );
}
