import React, { useState } from 'react';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Button from '../../../components/Button';
import Hr from '../../../components/Hr';
import BlockRow from './BlockRow';
import Modal from '../../../components/Modal';
import AddBeneficiary from './AddBeneficiary';
import SimpleTable from '../../../views/SimpleTable';
import { useElementsUserQuery } from '../../../api/trust/elements';
import { useTrustDetailQuery } from '../../../api/trust/trust';

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
  const { t } = useTranslation();
  const trustQuery = useTrustDetailQuery({ trustId: Number(trustId) });

  return (
    <div className="flex flex-col gap-4 rounded-xl shadow-block p-8 gradient-bg2">
      <div className="flex flex-row items-center justify-between">
        <div className="gradient-text1 font-title text-[20px]">{t('Beneficiary')}</div>
        {trustQuery.data?.data?.roleType! > 2 && <Button onClick={() => setAddBeneficiaryVisible(true)}>{t('Add')}</Button>}
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
      <Modal
        visible={addBeneficiaryVisible}
        onClose={() => setAddBeneficiaryVisible(false)}
      >
        <AddBeneficiary
          trustId={Number(trustId)}
          onClose={() => setAddBeneficiaryVisible(false)}
        />
      </Modal>
    </div>
  );
}
