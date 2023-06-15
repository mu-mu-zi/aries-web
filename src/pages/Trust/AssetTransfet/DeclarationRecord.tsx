import React, { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query';
import { FormattedMessage, useIntl } from 'react-intl';
import Modal from '../../../components/Modal';
import ViewCredentials from './ViewCredentials';
import SimpleTable from '../../../views/SimpleTable';
import { useTrustAssetDeclareQuery } from '../../../api/trust/asset';
import { unixFormatTime } from '../../../utils/DateFormat';
import TextButton from '../../../components/TextButton';
import { numberFormatWithPrefix } from '../../../utils/CurrencyFormat';
import RecodeViewCredentials from './RecodeViewCredentials';
import useTrustPermission from '../../../hooks/useTrustRole';
import { useTrustDetailQuery } from '../../../api/trust/trust';

export default function DeclarationRecord() {
  // const { t } = useTranslation();
  const intl = useIntl();
  const [detailVisible, setDetailVisible] = useState(false);
  const [page, setPage] = useState(1);
  const { trustId } = useParams();
  const trustQuery = useTrustDetailQuery({ trustId: Number(trustId) });
  const listQuery = useTrustAssetDeclareQuery({
    trustId: Number(trustId),
    pageIndex: page,
    pageSize: 5,
  });
  const queryClient = useQueryClient();
  const [recordId, setRecordId] = useState<number>();
  const [credentials, setCredentials] = useState<string[]>([]);
  const [viewCredentialsVisible, setViewCredentialsVisible] = useState(false);
  const { settlorPermission } = useTrustPermission({ trust: trustQuery.data?.data });

  const statusTitle = (status: any) => {
    switch (status) {
      case 1: return intl.formatMessage({ defaultMessage: 'To be verified', description: '资产申报状态' });
      case 2: return intl.formatMessage({ defaultMessage: 'Pending accounting', description: '资产申报状态' });
      case 3: return intl.formatMessage({ defaultMessage: 'Already recorded in account', description: '资产申报状态' });
      case 4: return intl.formatMessage({ defaultMessage: 'Verification failed', description: '资产申报状态' });
      case 5: return intl.formatMessage({ defaultMessage: 'Application for cancellation', description: '资产申报状态' });
      case 6: return intl.formatMessage({ defaultMessage: 'Cancelled', description: '资产申报状态' });
      default: return '--';
    }
  };

  return (
    <div className="gradient-border-container shadow-block">
      <div className="flex flex-col gap-4 gradient-bg2 rounded-xl p-8">
        <div className="gradient-text1 font-bold font-title text-[20px]">
          <FormattedMessage defaultMessage="Commission declaration record" />
        </div>
        <div className="h-[1px] bg-[#3B5649]" />
        <SimpleTable
          columns={[
            {
              Header: intl.formatMessage({ defaultMessage: 'Declaration time' }),
              accessor: (x) => unixFormatTime(x.createTime),
            },
            {
              Header: intl.formatMessage({ defaultMessage: 'Type' }),
              accessor: (x) => (x.payType === 1 ? intl.formatMessage({ defaultMessage: 'Digital' }) : intl.formatMessage({ defaultMessage: 'Fiat' })),
            },
            {
              Header: intl.formatMessage({ defaultMessage: 'Network' }),
              accessor: (x) => x.mainnet,
            },
            {
              Header: intl.formatMessage({ defaultMessage: 'Asset Classes' }),
              accessor: (x) => x.symbol,
            },
            {
              Header: () => <div className="text-right"><FormattedMessage defaultMessage="Amount" /></div>,
              accessor: 'amount',
              Cell: ({ row }) => (
                <div className="flex items-center gap-2 gradient-text1 justify-end">
                  <div>{numberFormatWithPrefix(row.original.amount)}</div>
                  {/* <div>{row.original.symbol}</div> */}
                </div>
              ),
            },
            {
              Header: () => <div className="text-right"><FormattedMessage defaultMessage="Status" /></div>,
              accessor: 'status',
              Cell: ({ row }) => (
                <div className="text-right">{`${statusTitle(row.original.status)}`}</div>
              ),
            },
            {
              Header: () => (<div className="text-right"><FormattedMessage defaultMessage="Reconciliation" /></div>),
              accessor: 'reconciliation',
              // eslint-disable-next-line react/prop-types
              Cell: ({ row }) => (
                <div className="flex flex-row gap-4 justify-end">
                  <TextButton
                    // disabled
                    onClick={() => {
                      // eslint-disable-next-line react/prop-types
                      setRecordId(row.original?.id);
                      setCredentials(row.original.proofs ?? []);
                      setDetailVisible(true);
                    }}
                  >
                    <FormattedMessage defaultMessage="View details" />
                  </TextButton>
                  {/* {row.original.proofs && row.original.proofs.length > 0 && ( */}
                  {/*  <TextButton */}
                  {/*    onClick={() => { */}
                  {/*      setCredentials(row.original.proofs ?? []); */}
                  {/*      setViewCredentialsVisible(true); */}
                  {/*    }} */}
                  {/*  > */}
                  {/*    <FormattedMessage defaultMessage="View credentials" /> */}
                  {/*  </TextButton> */}
                  {/* )} */}
                  {
                    // eslint-disable-next-line react/prop-types
                    settlorPermission && row.original?.status === 1 && (
                      <TextButton
                        onClick={async () => {
                          await axios.post('/trust/assetDeclare/cancel', {
                            id: row.original?.id,
                          });
                          await queryClient.invalidateQueries(['trust']);
                        }}
                      >
                        <FormattedMessage defaultMessage="Cancel" />
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
              images={credentials}
              onClose={() => setDetailVisible(false)}
            />
          </Modal>
        )}

        {/* <Modal */}
        {/*  visible={viewCredentialsVisible} */}
        {/*  onClose={() => setViewCredentialsVisible(false)} */}
        {/* > */}
        {/*  <RecodeViewCredentials */}
        {/*    images={credentials} */}
        {/*    onClose={() => setViewCredentialsVisible(false)} */}
        {/*  /> */}
        {/* </Modal> */}
      </div>
    </div>
  );
}
