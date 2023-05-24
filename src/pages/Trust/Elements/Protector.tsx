import React, { useState } from 'react';
import moment from 'moment/moment';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Button from '../../../components/Button';
import Hr from '../../../components/Hr';
import BlockRow from './BlockRow';
import Modal from '../../../components/Modal';
import AddProtector from './AddProtector';
import { useElementsUserQuery } from '../../../api/trust/elements';
import SimpleTable from '../../../views/SimpleTable';
import { useTrustDetailQuery } from '../../../api/trust/trust';

export default function Protector() {
  const { trustId } = useParams();
  const { t } = useTranslation();
  const [addProtectorVisible, setAddProtectorVisible] = useState(false);
  const [page, setPage] = useState(1);
  const listQuery = useElementsUserQuery({
    pageIndex: page,
    pageSize: 5,
    trustId: Number(trustId),
    beneficiary: false,
  });
  const trustQuery = useTrustDetailQuery({ trustId: Number(trustId) });

  return (
    <div className="flex flex-col gap-4 rounded-xl shadow-block p-8 gradient-bg2 h-full">
      <div className="flex flex-row items-center justify-between">
        <div className="gradient-text1 font-title text-[20px]">{t('Protector')}</div>
        {trustQuery.data?.data?.roleType! > 2 && <Button onClick={() => setAddProtectorVisible(true)}>{t('Add')}</Button>}
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
            accessor: 'userName',
          },
          {
            Header: t('Account') ?? '',
            accessor: 'account',
          },
          {
            Header: t('Identity category') ?? '',
            accessor: '',
          },
          {
            Header: t('Permissions') ?? '',
            accessor: 'roleTypeName',
          },
          {
            Header: t('KYC certification') ?? '',
            accessor: 'kycStatusName',
          },
          {
            Header: t('Description') ?? '',
            accessor: 'remark',
          },
          {
            Header: t('Audit status') ?? '',
            accessor: 'trustUserStatus',
          },
          {
            Header: t('Add time') ?? '',
            accessor: (originalRow) => moment.unix(originalRow.createTimeStamp / 1000).format(),
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
    </div>
  );
}
