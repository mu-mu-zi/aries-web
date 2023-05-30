import React, { useState } from 'react';
import moment from 'moment/moment';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query';
import Button from '../../../components/Button';
import Hr from '../../../components/Hr';
import BlockRow from './BlockRow';
import Modal from '../../../components/Modal';
import AddProtector from './AddProtector';
import { useElementsUserQuery } from '../../../api/trust/elements';
import SimpleTable from '../../../views/SimpleTable';
import { useTrustDetailQuery } from '../../../api/trust/trust';
import { unixFormatTime } from '../../../utils/DateFormat';
import EditRole from './EditRole';
import { ITrustUser } from '../../../interfaces/trust';
import TextButton from '../../../components/TextButton';

export default function Protector() {
  const { trustId } = useParams();
  const { t } = useTranslation();
  const [addProtectorVisible, setAddProtectorVisible] = useState(false);
  const [editRoleVisible, setEditRoleVisible] = useState(false);
  const [page, setPage] = useState(1);
  const listQuery = useElementsUserQuery({
    pageIndex: page,
    pageSize: 5,
    trustId: Number(trustId),
    beneficiary: false,
  });
  const trustQuery = useTrustDetailQuery({ trustId: Number(trustId) });
  const [selected, setSelected] = useState<ITrustUser>();
  const queryClient = useQueryClient();

  return (
    <div className="flex flex-col gap-4 rounded-xl shadow-block p-8 gradient-bg2 h-full">
      <div className="flex flex-row items-center justify-between">
        <div className="gradient-text1 font-title font-bold text-[20px]">{t('Protector')}</div>
        {trustQuery.data?.data?.roleType! > 2
          && <Button onClick={() => setAddProtectorVisible(true)}>{t('+ Add')}</Button>}
      </div>
      <Hr />
      {/* <div className="flex-1 flex flex-col gap-4 gradient-block1 shadow-block rounded-xl p-8"> */}
      {/*  <BlockRow title="Real name:" value="Lee ***" /> */}
      {/*  <BlockRow title="Account:" value="314****342" /> */}
      {/*  <BlockRow title="Identity category:" value="The principal himself/herself" /> */}
      {/*  <BlockRow title="Permissions:" value=" No Permissions" /> */}
      {/*  <BlockRow title="KYC certification:" value="Not verified" /> */}
      {/*  <BlockRow title="Modify review status.:" value="My unborn..." /> */}
      {/*  <BlockRow title="Add time:" value="03/30/2023" /> */}
      {/*  <div className="flex-1" /> */}
      {/*  <div className="self-center mt-8"> */}
      {/*    <Button>Remove</Button> */}
      {/*  </div> */}
      {/* </div> */}
      <SimpleTable
        columns={[
          {
            Header: t('Real name') ?? '',
            accessor: (x) => `${x.surname} ${x.userName}`,
          },
          {
            Header: t('Account') ?? '',
            accessor: 'account',
          },
          {
            Header: t('Identity category') ?? '',
            accessor: (x) => {
              switch (x.userType) {
                case 1:
                  return 'Principal';
                case 2:
                  return 'Explicit Beneficiary';
                case 3:
                  return 'Non-Explicit Beneficiary';
                case 4:
                  return 'Guardian';
                case 5:
                  return 'Succession Guardian';
                case 6:
                  return 'Second Succession Guardia';
                case 21:
                  return 'Beneficiary Entrustor Himself/Herself';
                default:
                  return '--';
              }
            },
          },
          {
            Header: t('Permissions') ?? '',
            accessor: (x) => {
              switch (x.roleType) {
                case 1:
                  return 'No';
                case 2:
                  return 'ReadOnly';
                case 3:
                  return 'Approval';
                default:
                  return '--';
              }
            },
          },
          {
            Header: t('KYC certification') ?? '',
            accessor: (x) => {
              switch (x.kycStatus) {
                case 1:
                  return 'In progress';
                case 2:
                  return 'Successful';
                case 3:
                  return 'Failure';
                default:
                  return '--';
              }
            },
          },
          {
            Header: t('Description') ?? '',
            accessor: 'remark',
          },
          {
            Header: t('Audit status') ?? '',
            accessor: (x) => {
              switch (x.trustUserStatus) {
                case 0:
                  return 'Pending';
                case 1:
                  return 'Successful';
                case 2:
                  return 'Failure';
                default:
                  return '--';
              }
            },
          },
          {
            Header: t('Add time') ?? '',
            accessor: (originalRow) => unixFormatTime(originalRow.createTimeStamp),
          },
          {
            Header: () => <div className="text-right">{t('Action')}</div>,
            accessor: 'action',
            Cell: ({ row }) => (
              <div className="flex gap-4 justify-end">
                {/* 移除保护人委托人 */}
                <TextButton onClick={async () => {
                  await axios.request({
                    url: '/trust/trust/user/delete',
                    method: 'get',
                    params: {
                      trustUserId: row.original.id,
                    },
                  });
                  await queryClient.invalidateQueries(['trust']);
                }}
                >
                  Remove
                </TextButton>
                {/* 权限编辑 */}
                <TextButton onClick={async () => {
                  setSelected(row.original);
                  setEditRoleVisible(true);
                }}
                >
                  Edit
                </TextButton>
              </div>
            ),
          },
        ]}
        data={listQuery.data?.data?.records ?? []}
        pagination={{
          pageIndex: page,
          pageSize: 5,
          total: listQuery.data?.data?.total ?? 0,
          onPageChanged: (page) => setPage(page),
        }}
      />
      <Modal visible={addProtectorVisible} onClose={() => setAddProtectorVisible(false)}>
        <AddProtector
          trustId={Number(trustId)}
          onClose={() => setAddProtectorVisible(false)}
        />
      </Modal>
      <Modal
        visible={editRoleVisible}
        onClose={() => setEditRoleVisible(false)}
      >
        {selected && (
          <EditRole
            defaultVal={selected.roleType}
            isBeneficiary={false}
            onClose={() => setEditRoleVisible(false)}
            trustUserId={selected.id}
          />
        )}
      </Modal>
    </div>
  );
}
