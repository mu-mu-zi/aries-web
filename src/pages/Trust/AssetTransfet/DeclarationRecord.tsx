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

  const statusTitle = (status: any) => {
    switch (status) {
      case 1:
        return t('待核实');
      case 2:
        return t('待上账');
      case 3:
        return t('已上账');
      case 4:
        return t('核实失败');
      case 5:
        return t('申请取消');
      case 6:
        return t('已取消');
      default:
        return undefined;
    }
  };

  return (
    <div className="flex flex-col gap-4 gradient-bg2 rounded-xl shadow-block p-8">
      <div className="gradient-text1 font-blod text-[20px]">{t('Commission declaration record')}</div>
      <div className="h-[1px] bg-[#3B5649]" />
      <SimpleTable
        columns={[
          {
            Header: 'Time',
            accessor: (x) => unixFormatTime(x.createTime),
          },
          {
            Header: 'Type',
            accessor: (x) => (x.payType === 1 ? t('数字资产') : t('法币')),
          },
          {
            Header: 'Amount',
            accessor: (x) => x.amount,
          },
          {
            Header: 'Status',
            accessor: (x) => statusTitle(x.status),
          },
          {
            Header: () => (<div className="text-right">Reconciliation</div>),
            accessor: 'reconciliation',
            // eslint-disable-next-line react/prop-types
            Cell: ({ row }) => (
              <div className="flex flex-row gap-4 gradient-text2 justify-end font-title text-[14px] font-bold">
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    // eslint-disable-next-line react/prop-types
                    setRecordId(row.original?.id);
                    setDetailVisible(true);
                  }}
                >
                  {t('View details')}
                </div>
                {
                  // eslint-disable-next-line react/prop-types
                  row.original?.status === 1 && (
                    <div
                      className="cursor-pointer"
                      onClick={async () => {
                        await axios.post('/trust/assetDeclare/cancel', {
                          // eslint-disable-next-line react/prop-types
                          id: row.original?.id,
                        });
                        await queryClient.invalidateQueries(['trust']);
                      }}
                    >
                      {t('Apply for cancellation')}
                    </div>
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
    </div>
  );
}
