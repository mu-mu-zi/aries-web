import React, { useState } from 'react';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import copyIcon from '../../../assets/icon/copy.svg';
import { useInvestmentApprovalRecodeQuery } from '../../../api/trust/investment';
import CopyIcon from '../../../views/CopyIcon';
import editIcon from '../../../assets/icon/icons-edit.svg';
import Modal from '../../../components/Modal';
import ApprovalOpinion from './ApprovalOpinion';

export default function Approval({ trustInvestmentId }: {
  trustInvestmentId: number
}) {
  const [page, setPage] = useState(1);
  const listQuery = useInvestmentApprovalRecodeQuery({
    pageIndex: page,
    pageSize: 5,
    trustInvestmentId,
  });
  const [opinionVisible, setOpinionVisible] = useState(false);
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-4 gradient-bg2 rounded-xl p-8 shadow-block">
      {/* 标题 */}
      <div className="gradient-text1 font-blod text-[20px]">{t('Approval')}</div>
      {/* 分割线 */}
      <div className="h-[1px] bg-[#3B5649]" />
      {/* Table */}
      <table className="table-auto text-[16px] text-[#99AC9B]">
        <thead>
          <tr>
            <th className="text-left py-2">{t('Currency')}</th>
            <th className="text-left">{t('Amount')}</th>
            <th className="text-left">{t('Destination')}</th>
            <th className="text-left">{t('Opponent\'s address')}</th>
            <th className="text-left">{t('Approval Comments')}</th>
            <th className="text-left">{t('Approval time')}</th>
            <th className="text-right">{t('Reconciliation')}</th>
          </tr>
        </thead>
        <tbody>
          {listQuery.data?.data?.records.map((it, idx) => (
            <tr>
              <td>{it.coinName}</td>
              <td><div className="gradient-text1 pr-8">{`${it.amount} ${it.coinName}`}</div></td>
              <td><div className="pr-8">{it.directionName}</div></td>
              <td className="py-2">
                <div className="flex flex-row gap-2 items-center">
                  <div>{it.address}</div>
                  <CopyIcon text={it.address} />
                </div>
              </td>
              <td>
                <div className="flex items-center gap-2">
                  <div>{it.approvalRemark}</div>
                  <div className="cursor-pointer" onClick={() => setOpinionVisible(true)}>
                    <img src={editIcon} />
                  </div>
                </div>
              </td>
              <td>{moment.unix(it.approvalTimeStamp / 1000).format('yyyy-MM-dd HH:mm:ss')}</td>
              {/* todo: 这里缺少审批的操作 */}
              <td className="text-right">{it.approvalStatusName}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal visible={opinionVisible}>
        <ApprovalOpinion />
      </Modal>
    </div>
  );
}
