import React, { useState } from 'react';
import moment from 'moment/moment';
import Button from '../../../components/Button';
import Hr from '../../../components/Hr';
import BlockRow from './BlockRow';
import Modal from '../../../components/Modal';
import AddProtector from './AddProtector';
import { useElementsUserQuery } from '../../../api/trust/elements';
import SimpleTable from '../../../views/SimpleTable';

export default function Protector() {
  const [addProtectorVisible, setAddProtectorVisible] = useState(false);
  const [page, setPage] = useState(1);
  /* todo: 固定 ID */
  const listQuery = useElementsUserQuery({
    pageIndex: page,
    pageSize: 5,
    trustId: 15,
    beneficiary: false,
  });

  return (
    <div className="flex flex-col gap-4 rounded-xl shadow-block p-8 gradient-bg2 h-full">
      <div className="flex flex-row items-center justify-between">
        <div className="gradient-text1 font-title text-[20px]">Protector</div>
        <Button onClick={() => setAddProtectorVisible(true)}>Add</Button>
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
            Header: 'Real name',
            accessor: 'userName',
          },
          {
            Header: 'Account',
            accessor: 'account',
          },
          {
            Header: 'Identity category',
            accessor: '',
          },
          {
            Header: 'Permissions',
            accessor: 'roleTypeName',
          },
          {
            Header: 'KYC certification',
            accessor: 'kycStatusName',
          },
          {
            Header: 'Description',
            accessor: 'remark',
          },
          {
            Header: 'Audit status',
            accessor: 'trustUserStatus',
          },
          {
            Header: 'Add time',
            accessor: (originalRow) => moment.unix(originalRow.createTimeStamp / 1000).format(),
          },
        ]}
        data={listQuery.data?.data?.records ?? []}
      />
      <Modal visible={addProtectorVisible} onClose={() => setAddProtectorVisible(false)}>
        <AddProtector onClose={() => setAddProtectorVisible(false)} />
      </Modal>
    </div>
  );
}
