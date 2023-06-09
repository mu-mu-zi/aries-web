import React, { useState } from 'react';
import moment from 'moment';
import { Form, useParams } from 'react-router-dom';
import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query';
import { FormattedMessage, useIntl } from 'react-intl';
import Button from '../../../components/Button';
import Hr from '../../../components/Hr';
import BlockRow from './BlockRow';
import Modal from '../../../components/Modal';
import AddBeneficiary from './AddBeneficiary';
import SimpleTable from '../../../views/SimpleTable';
import { useElementsUserQuery } from '../../../api/trust/elements';
import { useTrustDetailQuery } from '../../../api/trust/trust';
import { unixFormatTime } from '../../../utils/DateFormat';
import TextButton from '../../../components/TextButton';
import EditRole from './EditRole';
import { ITrustUser } from '../../../interfaces/trust';
import { trustEditRole } from '../../../utils/trustRole';
import useTrustPermission from '../../../hooks/useTrustRole';
import Confirm from '../../../views/Confirm';
import GoogleVerify from '../../../views/GoogleVerify';

export default function Beneficiary() {
  const { trustId } = useParams();
  const [page, setPage] = useState(1);
  const listQuery = useElementsUserQuery({
    pageIndex: page,
    pageSize: 5,
    trustId: Number(trustId),
    beneficiary: true,
  });
  const [addBeneficiaryVisible, setAddBeneficiaryVisible] = useState(false);
  const [editRoleVisible, setEditRoleVisible] = useState(false);
  const [selected, setSelected] = useState<ITrustUser>();
  // const { t } = useTranslation();
  const intl = useIntl();
  const trustQuery = useTrustDetailQuery({ trustId: Number(trustId) });
  const queryClient = useQueryClient();
  const { settlorPermission, onlySettlorPermission } = useTrustPermission({ trust: trustQuery.data?.data });
  // const [removeConfirmVisible, setRemoveConfirmVisible] = useState(false);
  const [removeWarningVisible, setRemoveWarningVisible] = useState(false);
  const [editWarningVisible, setEditWarningVisible] = useState(false);
  const [googleVerifyVisible, setGoogleVerifyVisible] = useState(false);

  return (
    <div className="gradient-border-container shadow-block">
      <div className="flex flex-col gap-4 rounded-xl p-8 gradient-bg2">
        <div className="flex flex-row items-center justify-between">
          <div className="gradient-text1 font-title font-bold text-[20px]">
            <FormattedMessage defaultMessage="Beneficiary" />
          </div>
          {settlorPermission && (
          <Button onClick={() => setAddBeneficiaryVisible(true)}>
            <FormattedMessage defaultMessage="+ Add" />
          </Button>
          )}
        </div>
        <Hr />
        {/* <div className="flex flex-col gap-4 gradient-block1 shadow-block rounded-xl p-8"> */}
        {/*  <BlockRow title="Real name:" value="Lee ***" /> */}
        {/*  <BlockRow title="Account:" value="314****342" /> */}
        {/*  <BlockRow title="Identity category:" value="The principal himself/herself" /> */}
        {/*  <BlockRow title="Permissions:" value=" No Permissions" /> */}
        {/*  <BlockRow title="KYC certification:" value="Not verified" /> */}
        {/*  <BlockRow title="Description:" value="My unborn..." /> */}
        {/*  <BlockRow title="Audit status:" value="Approved" /> */}
        {/*  <BlockRow title="Add time:" value="03/30/2023" /> */}
        {/*  <div className="self-center mt-8"> */}
        {/*    <Button>Remove</Button> */}
        {/*  </div> */}
        {/* </div> */}
        <SimpleTable
          columns={[
            {
              Header: intl.formatMessage({ defaultMessage: 'Real name' }),
              accessor: (x) => `${x.surname ?? ''} ${x.userName ?? ''}`,
            },
            {
              Header: intl.formatMessage({ defaultMessage: 'Account' }),
              accessor: 'account',
            },
            {
              Header: intl.formatMessage({ defaultMessage: 'Identity category' }),
              accessor: (x) => {
                switch (x.userType) {
                  case 1: return intl.formatMessage({ defaultMessage: 'Principal' });
                  case 2: return intl.formatMessage({ defaultMessage: 'Explicit Beneficiary' });
                  case 3: return intl.formatMessage({ defaultMessage: 'Non-Explicit Beneficiary' });
                  case 4: return intl.formatMessage({ defaultMessage: 'Guardian' });
                  case 5: return intl.formatMessage({ defaultMessage: 'Succession Guardian' });
                  case 6: return intl.formatMessage({ defaultMessage: 'Second Succession Guardia' });
                  case 21: return intl.formatMessage({ defaultMessage: 'Beneficiary Entrustor Himself/Herself' });
                  default: return '--';
                }
              },
            },
            {
              Header: intl.formatMessage({ defaultMessage: 'Permissions' }),
              accessor: (x) => {
                switch (x.roleType) {
                  case 1: return x.userType === 3 ? '--' : intl.formatMessage({ defaultMessage: 'No', description: '无权限' });
                  case 2: return intl.formatMessage({ defaultMessage: 'ReadOnly' });
                  case 3: return intl.formatMessage({ defaultMessage: 'Approval' });
                  default: return '--';
                }
              },
            },
            {
              Header: intl.formatMessage({ defaultMessage: 'KYC certification' }),
              accessor: (x) => {
                if (x.userType === 3) {
                  return '--';
                }
                switch (x.kycStatus) {
                  case 1: return intl.formatMessage({ defaultMessage: 'In progress' });
                  case 2: return intl.formatMessage({ defaultMessage: 'Successful' });
                  case 3: return intl.formatMessage({ defaultMessage: 'Failure' });
                  default: return '--';
                }
              },
            },
            {
              Header: intl.formatMessage({ defaultMessage: 'Description' }),
              accessor: (x) => x.remark ?? '--',
            },
            {
              Header: intl.formatMessage({ defaultMessage: 'Audit status' }),
              accessor: (x) => {
                switch (x.trustUserStatus) {
                  case 0:
                  case 4:
                    return intl.formatMessage({ defaultMessage: 'Pending' });
                  case 1:
                    return intl.formatMessage({ defaultMessage: 'Successful' });
                  case 2:
                    return intl.formatMessage({ defaultMessage: 'Failure' });
                  case 3:
                  case 5:
                    return intl.formatMessage({ defaultMessage: 'Audit failed' });
                  default: return '--';
                }
              },
            },
            {
              Header: intl.formatMessage({ defaultMessage: 'Add time' }),
              accessor: (originalRow) => unixFormatTime(originalRow.createTimeStamp),
            },
            {
              Header: () => <div className="text-right"><FormattedMessage defaultMessage="Action" /></div>,
              accessor: 'action',
              Cell: ({ row }) => (
                <div className="flex gap-4 justify-end">
                  {settlorPermission && ![0, 4].includes(row.original.trustUserStatus) && (
                  <>
                    {/* 权限编辑 */}
                    {![1, 3, 21].includes(row.original.userType) && settlorPermission && (
                    <TextButton onClick={async () => {
                      // if (row.original.auditFlag) {
                      //   setEditWarningVisible(true);
                      // } else {
                      setSelected(row.original);
                      setEditRoleVisible(true);
                      // }
                    }}
                    >
                      <FormattedMessage defaultMessage="Authority" />
                    </TextButton>
                    )}
                    {/* 移除保护人委托人 */}
                    <TextButton onClick={async () => {
                      /* 移除保护人、委托人需要检查是否存在待审核的账单 */
                      // if (row.original.auditFlag) {
                      //   setRemoveWarningVisible(true);
                      // } else {
                      setSelected(row.original);
                      setGoogleVerifyVisible(true);
                      // }
                    }}
                    >
                      <FormattedMessage defaultMessage="Remove" />
                    </TextButton>
                  </>
                  )}
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
        <Modal
          visible={addBeneficiaryVisible}
          onClose={() => setAddBeneficiaryVisible(false)}
        >
          <AddBeneficiary
            trustId={Number(trustId)}
            onClose={() => setAddBeneficiaryVisible(false)}
          />
        </Modal>
        <Modal
          visible={editRoleVisible}
          onClose={() => setEditRoleVisible(false)}
        >
          {selected && (
          <EditRole
            defaultVal={selected.roleType}
            trustUserId={selected?.id}
            isBeneficiary
            onClose={() => setEditRoleVisible(false)}
          />
          )}
        </Modal>
        {/* <Modal visible={removeConfirmVisible} onClose={() => setRemoveConfirmVisible(false)}> */}
        {/*  {selected && ( */}
        {/*    <Confirm */}
        {/*      title={t('You have a current investment order not approved, confirm to remove the Beneficiary?')} */}
        {/*      onOk={async () => { */}
        {/*        await axios.request({ */}
        {/*          url: '/trust/trust/user/delete', */}
        {/*          method: 'post', */}
        {/*          data: { */}
        {/*            trustUserId: selected.id, */}
        {/*          }, */}
        {/*        }); */}
        {/*        await queryClient.invalidateQueries(['trust']); */}
        {/*        setRemoveConfirmVisible(false); */}
        {/*      }} */}
        {/*      onCancel={() => setRemoveConfirmVisible(false)} */}
        {/*    /> */}
        {/*  )} */}
        {/* </Modal> */}
        <Modal visible={googleVerifyVisible} onClose={() => setGoogleVerifyVisible(false)}>
          {selected && (
          <GoogleVerify
            onClose={() => setGoogleVerifyVisible(false)}
            onEnter={async (ticket) => {
              setGoogleVerifyVisible(false);
              await axios.request({
                url: '/trust/trust/user/delete',
                method: 'post',
                data: {
                  trustUserId: selected.id,
                  ticker: ticket,
                },
              });
              await queryClient.invalidateQueries(['trust']);
            }}
          />
          )}
        </Modal>
        {/* <Modal visible={removeWarningVisible}> */}
        {/*  <Confirm */}
        {/*    title={intl.formatMessage({ defaultMessage: 'You currently have unapproved investment instructions, so you cannot remove this beneficiary.' })} */}
        {/*    onOk={() => setRemoveWarningVisible(false)} */}
        {/*  /> */}
        {/* </Modal> */}
        {/* <Modal visible={editWarningVisible}> */}
        {/*  <Confirm */}
        {/*    title={intl.formatMessage({ defaultMessage: 'You currently have unapproved investment instructions, so you cannot change the permissions of this protector.' })} */}
        {/*    onOk={() => setEditWarningVisible(false)} */}
        {/*  /> */}
        {/* </Modal> */}
      </div>
    </div>
  );
}
