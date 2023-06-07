import React, { useState } from 'react';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { FormattedMessage, useIntl } from 'react-intl';
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
import { unixFormatTime } from '../../../utils/DateFormat';
import { trustEditRole } from '../../../utils/trustRole';
import useTrustPermission from '../../../hooks/useTrustRole';
import { stringShort } from '../../../utils/stringShort';
import GoogleVerify from '../../../views/GoogleVerify';

export default function AllocationPlan() {
  // const { t } = useTranslation();
  const intl = useIntl();
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
  const [googleVerifyVisible, setGoogleVerifyVisible] = useState(false);
  const [planDescription, setPlanDescription] = useState('');
  const trustQuery = useTrustDetailQuery({ trustId: Number(trustId) });
  const { settlorPermission } = useTrustPermission({ trust: trustQuery.data?.data });
  const queryClient = useQueryClient();

  const addPlanMutation = useMutation({
    mutationFn: async (data: {
      planDescription: string
      ticker: string
    }) => {
      await axios.post('/trust/trust/distribution/plan/add', {
        trustId,
        ...data,
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(['trust']);
    },
  });

  // @ts-ignore
  return (
    <>
      <div className="flex flex-col p-8 gradient-bg2 rounded-xl shadow-block">
        <div className="flex flex-row items-center justify-between">
          <div className="gradient-text1 text-[20px] font-title font-bold">
            <FormattedMessage defaultMessage="Allocation plan" />
          </div>
          {settlorPermission && (
            <Button
              size="medium"
              onClick={() => setAddedVisible(true)}
            >
              <FormattedMessage defaultMessage="+ Add" />
            </Button>
          )}
        </div>
        <div className="mt-4"><Hr /></div>
        <SimpleTable
          columns={[
            {
              Header: intl.formatMessage({ defaultMessage: 'Content' }),
              accessor: 'planDescription',
              // eslint-disable-next-line react/prop-types
              Cell: ({ row }) => (
                // eslint-disable-next-line react/prop-types
                <div className="pr-2 line-clamp-1 text-ellipsis overflow-hidden">
                  {/* {row.original?.planDescription.length > 40 ? `${row.original?.planDescription.substring(0, 40)}...` : row.original?.planDescription} */}
                  {stringShort(row.original?.planDescription)}
                </div>
              ),
            },
            {
              Header: intl.formatMessage({ defaultMessage: 'Update Time' }),
              accessor: (originalRow) => (
                <div
                  className="break-keep"
                >
                  {/* {moment.unix(originalRow.updateTimeStamp / 1000).format('yyyy-MM-DD HH:mm:ss')} */}
                  {unixFormatTime(originalRow.updateTimeStamp)}
                </div>
              ),
            },
            {
              Header: intl.formatMessage({ defaultMessage: 'Status' }),
              accessor: (x) => {
                switch (x.planStatus) {
                  case 1: return intl.formatMessage({ defaultMessage: 'Checking' });
                  case 2: return intl.formatMessage({ defaultMessage: 'Approved' });
                  case 3: return intl.formatMessage({ defaultMessage: 'Rejected' });
                  default: return '--';
                }
              },
            },
            {
              Header: intl.formatMessage({ defaultMessage: 'Remark' }),
              accessor: (x) => x.remark ?? '--',
            },
            {
              Header: intl.formatMessage({ defaultMessage: 'Operation' }),
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
                    <FormattedMessage defaultMessage="View" />
                  </TextButton>
                  {row.original.planStatus === 1 && settlorPermission && (
                    <TextButton
                      onClick={() => {
                        // eslint-disable-next-line react/prop-types
                        setSelectRow(row.original);
                        setModifyVisible(true);
                      }}
                    >
                      <FormattedMessage defaultMessage="Modify" />
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
          onEnter={(plan) => {
            setAddedVisible(false);
            setPlanDescription(plan);
            setGoogleVerifyVisible(true);
          }}
          onClose={() => setAddedVisible(false)}
        />
      </Modal>
      <Modal visible={googleVerifyVisible} onClose={() => setGoogleVerifyVisible(false)}>
        <GoogleVerify
          onClose={() => setGoogleVerifyVisible(false)}
          onEnter={(ticket) => {
            setGoogleVerifyVisible(false);
            addPlanMutation.mutate({
              planDescription,
              ticker: ticket,
            });
          }}
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
