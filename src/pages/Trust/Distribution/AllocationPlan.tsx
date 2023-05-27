import React, { useState } from 'react';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Button from '../../../components/Button';
import Hr from '../../../components/Hr';
import Modal from '../../../components/Modal';
import NewPlan from './NewPlan';
import SimpleTable from '../../../views/SimpleTable';
import { useDistributionListQuery } from '../../../api/trust/distribution';
import { IDistribution } from '../../../interfaces/trust';
import ModifyPlan from './ModifyPlan';
import { useTrustDetailQuery } from '../../../api/trust/trust';
import PlanDetail from './PlanDetail';
import TextButton from '../../../components/TextButton';

export default function AllocationPlan() {
  const { t } = useTranslation();
  const { trustId } = useParams();
  const [addedVisible, setAddedVisible] = useState(false);
  const [page, setPage] = useState(1);
  const listQuery = useDistributionListQuery({
    pageIndex: page,
    pageSize: 5,
    trustId: Number(trustId),
  });
  const [selectRow, setSelectRow] = useState<IDistribution>();
  const [modifyVisible, setModifyVisible] = useState(false);
  const [detailVisible, setDetailVisible] = useState(false);
  const trustQuery = useTrustDetailQuery({ trustId: Number(trustId) });

  // @ts-ignore
  return (
    <>
      <div className="flex flex-col p-8 gradient-bg2 rounded-xl shadow-block">
        <div className="flex flex-row items-center justify-between">
          <div className="gradient-text1 text-[20px] font-title font-bold">{t('Allocation plan')}</div>
          {trustQuery.data?.data?.roleType! > 2 && (
            <Button
              size="medium"
              onClick={() => setAddedVisible(true)}
            >
              {t('Add')}
            </Button>
          )}
        </div>
        <div className="mt-4"><Hr /></div>
        <SimpleTable
          columns={[
            {
              Header: t('Content') ?? '',
              accessor: 'planDescription',
              // eslint-disable-next-line react/prop-types
              Cell: ({ row }) => (
                // eslint-disable-next-line react/prop-types
                <div className="pr-4 line-clamp-1">{row.original?.planDescription}</div>
              ),
            },
            {
              Header: t('Update Time') ?? '',
              accessor: (originalRow) => (
                <div
                  className="break-keep"
                >
                  {moment.unix(originalRow.updateTimeStamp / 1000).format('yyyy-MM-DD HH:mm:ss')}
                </div>
              ),
            },
            {
              Header: t('Status') ?? '',
              accessor: (x) => {
                switch (x.planStatus) {
                  case 1:
                    return 'Checking';
                  case 2:
                    return 'Approved';
                  case 3:
                    return 'Rejected';
                  default:
                    return '--';
                }
              },
            },
            {
              Header: t('Remark') ?? '',
              accessor: (x) => x.remark ?? '--',
            },
            {
              id: 'operation',
              Header: t('Operation') ?? '',
              // eslint-disable-next-line react/prop-types
              Cell: ({ row }) => (
                <div className="flex flex-row gap-4">
                  <TextButton
                    onClick={() => {
                      // eslint-disable-next-line react/prop-types
                      setSelectRow(row.original);
                      setDetailVisible(true);
                    }}
                  >
                    {t('View')}
                  </TextButton>
                  {trustQuery.data?.data?.roleType! > 2 && (
                    <TextButton
                      onClick={() => {
                        console.log();
                        // eslint-disable-next-line react/prop-types
                        setSelectRow(row.original);
                        setModifyVisible(true);
                      }}
                    >
                      {t('Modify')}
                    </TextButton>
                  )}
                </div>
              ),
            },
          ]}
          data={listQuery.data?.data?.records ?? []}
          pagination={{
            pageIndex: page,
            total: listQuery.data?.data?.total ?? 0,
            pageSize: 5,
            onPageChanged: (page) => setPage(page),
          }}
        />
      </div>
      <Modal visible={addedVisible} onClose={() => setAddedVisible(false)}>
        <NewPlan
          trustId={Number(trustId)}
          onClose={() => setAddedVisible(false)}
        />
      </Modal>
      <Modal visible={modifyVisible} onClose={() => setModifyVisible(false)}>
        {selectRow && (
          <ModifyPlan
            trustId={Number(trustId)}
            row={selectRow}
            onClose={() => setModifyVisible(false)}
          />
        )}
      </Modal>
      <Modal visible={detailVisible} onClose={() => setDetailVisible(false)}>
        {selectRow && <PlanDetail detail={selectRow.planDescription} onClose={() => setDetailVisible(false)} />}
      </Modal>
    </>
  );
}
