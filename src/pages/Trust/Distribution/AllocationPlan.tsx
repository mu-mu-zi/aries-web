import React, { useState } from 'react';
import moment from 'moment';
import Button from '../../../components/Button';
import Hr from '../../../components/Hr';
import Modal from '../../../components/Modal';
import NewPlan from './NewPlan';
import SimpleTable from '../../../views/SimpleTable';
import { useDistributionListQuery } from '../../../api/trust/distribution';
import { IDistribution } from '../../../interfaces/trust';
import ModifyPlan from './ModifyPlan';

export default function AllocationPlan() {
  const [addedVisible, setAddedVisible] = useState(false);
  const [page, setPage] = useState(1);
  const listQuery = useDistributionListQuery({
    pageIndex: page,
    pageSize: 5,
    trustId: 15,
  });
  const [selectRow, setSelectRow] = useState<IDistribution>();
  const [modifyVisible, setModifyVisible] = useState(false);

  // @ts-ignore
  return (
    <div className="flex flex-col p-8 gradient-bg2 rounded-xl shadow-block">
      <div className="flex flex-row items-center justify-between">
        <div className="gradient-text1 text-[20px] font-title">Allocation plan</div>
        <Button size="medium" onClick={() => setAddedVisible(true)}>Add</Button>
      </div>
      <div className="mt-4"><Hr /></div>
      <SimpleTable
        columns={[
          {
            Header: 'Content',
            accessor: 'planDescription',
          },
          {
            Header: 'Update Time',
            accessor: (originalRow) => moment.unix(originalRow.updateTimeStamp / 1000).format('yyyy-MM-DD HH:mm:ss'),
          },
          {
            Header: 'Status',
            accessor: 'planStatusName',
          },
          {
            Header: 'Remark',
            accessor: 'remark',
          },
          {
            id: 'operation',
            Header: 'Operation',
            // eslint-disable-next-line react/prop-types
            Cell: ({ row }) => (
              <div className="flex flex-row gap-4 gradient-text2 font-title text-[14px] font-bold">
                <div className="cursor-pointer">View</div>
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    console.log();
                    // eslint-disable-next-line react/prop-types
                    setSelectRow(row.original);
                    setModifyVisible(true);
                  }}
                >
                  Modify
                </div>
              </div>
            ),
          },
        ]}
        data={listQuery.data?.data?.records ?? []}
      />
      {/* 添加计划 */}
      <Modal visible={addedVisible} onClose={() => setAddedVisible(false)}>
        <NewPlan onClose={() => setAddedVisible(false)} />
      </Modal>
      <Modal visible={modifyVisible} onClose={() => setModifyVisible(false)}>
        {selectRow && <ModifyPlan row={selectRow} onClose={() => setModifyVisible(false)} />}
      </Modal>
    </div>
  );
}
