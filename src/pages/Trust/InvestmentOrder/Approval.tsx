import React, { useState } from 'react';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query';
import { FormattedMessage, useIntl } from 'react-intl';
import copyIcon from '../../../assets/icon/copy.svg';
import { useInvestmentApprovalRecodeQuery } from '../../../api/trust/investment';
import CopyIcon from '../../../views/CopyIcon';
import editIcon from '../../../assets/icon/icons-edit.svg';
import Modal from '../../../components/Modal';
import ApprovalOpinion from './ApprovalOpinion';
import { useTrustDetailQuery } from '../../../api/trust/trust';
import { IInvestmentApproveRecode } from '../../../interfaces/trust';
import { unixFormatTime } from '../../../utils/DateFormat';
import TextButton from '../../../components/TextButton';
import SimpleTable from '../../../views/SimpleTable';
import useTrustPermission from '../../../hooks/useTrustRole';
import { stringShort } from '../../../utils/stringShort';
import Tooltip from '../../../components/Tooltip';
import TrustContainer from '../TrustContainer';

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
  // const { t } = useTranslation();
  const { trustId } = useParams();
  const trustQuery = useTrustDetailQuery({ trustId: Number(trustId) });
  const { protectorPermission, protectorEditAndNotSettlor } = useTrustPermission({ trust: trustQuery.data?.data });
  const queryClient = useQueryClient();
  const [selected, setSelected] = useState<IInvestmentApproveRecode>();
  const intl = useIntl();

  const audit = async (recordId: number, approved: boolean) => {
    await axios.request({
      url: '/trust/trust/investment/approval/record/audit',
      method: 'get',
      params: {
        approvalRecordId: recordId,
        status: approved ? 2 : 3,
      },
    });
    queryClient.invalidateQueries(['trust']);
  };

  const approvalStatusName = (status: number) => {
    // 审批状态状态：1-待审批，2-已通过，3-已拒绝 *!
    switch (status) {
      case 1: return intl.formatMessage({ defaultMessage: 'Pending approval' });
      case 2: return intl.formatMessage({ defaultMessage: 'Already passed' });
      case 3: return intl.formatMessage({ defaultMessage: 'Rejected' });
      default: return null;
    }
  };

  return (
    <TrustContainer>
      <div className="flex flex-col gap-4 gradient-bg2 rounded-xl p-8">
        {/* 标题 */}
        <div className="gradient-text1 font-bold text-[20px] font-title">
          <FormattedMessage defaultMessage="Approval" />
        </div>
        {/* 分割线 */}
        <div className="h-[1px] bg-[#3B5649]" />
        {/* Table */}
        <SimpleTable
          columns={[
            {
              Header: intl.formatMessage({ defaultMessage: 'Currency' }),
              accessor: 'coinName',
            },
            {
              Header: intl.formatMessage({ defaultMessage: 'Amount' }),
              accessor: 'amount',
              // eslint-disable-next-line react/prop-types
              Cell: ({ row }) => (
              // eslint-disable-next-line react/prop-types
                <div className="gradient-text1">{`${row.original.amount} ${row.original.coinName}`}</div>
              ),
            },
            {
              Header: () => (<div className="text-left"><FormattedMessage defaultMessage="Destination" /></div>),
              accessor: 'destination',
              Cell: ({ row }) => {
                switch (row.original.direction) {
                  case 1: return <div className="text-left">{intl.formatMessage({ defaultMessage: 'Exchange' })}</div>;
                  case 2: return <div className="text-left">{intl.formatMessage({ defaultMessage: 'Bank' })}</div>;
                  default: return <div className="text-left">--</div>;
                }
              },
              // accessor: (x) => {
              //   switch (x.direction) {
              //     case 1: return intl.formatMessage({ defaultMessage: 'Exchange' });
              //     case 2: return intl.formatMessage({ defaultMessage: 'Bank' });
              //     default: return '--';
              //   }
              // },
            },
            {
              Header: () => (<div className=""><FormattedMessage defaultMessage={"Opponent's address"} /></div>),
              accessor: 'address',
              // eslint-disable-next-line react/prop-types
              Cell: ({ row }) => (
                <div className="flex items-center gap-2">
                  {/* eslint-disable-next-line react/prop-types */}
                  <div>{row.original.address}</div>
                  {/* eslint-disable-next-line react/prop-types */}
                  <CopyIcon text={row.original.address} />
                </div>
              ),
            },
            {
              Header: () => <div className=""><FormattedMessage defaultMessage="Approval Comments" /></div>,
              accessor: 'approvalRemark',
              Cell: ({ row }) => (
                <div className="flex items-center gap-2">
                  <Tooltip
                    title={intl.formatMessage({ defaultMessage: 'Approval opinion' })}
                    content={row.original.approvalRemark}
                  >
                    <div>{stringShort(row.original.approvalRemark, 20)}</div>
                  </Tooltip>
                  {/* 保护人才能操作审批 */}
                  {protectorEditAndNotSettlor && (
                  <div
                    className="cursor-pointer flex-shrink-0"
                    onClick={() => {
                      setSelected(row.original);
                      setOpinionVisible(true);
                    }}
                  >
                    <img className="flex-shrink-0" src={editIcon} alt="" />
                  </div>
                  )}
                </div>
              ),
            },
            {
              Header: intl.formatMessage({ defaultMessage: 'Approval time' }),
              accessor: (x) => unixFormatTime(x.approvalTimeStamp),
            },
            {
              Header: () => <div className="text-right"><FormattedMessage defaultMessage="Reconciliation" /></div>,
              accessor: 'Reconciliation',
              Cell: ({ row }) => (
                <div className="flex justify-end items-center gap-4">
                  {/* 审批状态状态：1-待审批，2-已通过，3-已拒绝 */}
                  {/* 保护人才能审批 */}
                  {row.original.approvalStatus === 1 && protectorEditAndNotSettlor && (
                  <>
                    <TextButton
                      onClick={() => audit(row.original.id, true)}
                    >
                      <FormattedMessage defaultMessage="Approved" />
                    </TextButton>
                    <TextButton
                      onClick={() => audit(row.original.id, false)}
                    >
                      <FormattedMessage defaultMessage="Refusal" />
                    </TextButton>
                  </>
                  )}
                  {row.original.approvalStatus > 1 && <div>{approvalStatusName(row.original.approvalStatus)}</div>}
                </div>
              ),
            },
          ]}
          data={listQuery.data?.data?.records}
          pagination={{
            total: listQuery.data?.data?.total ?? 0,
            pageSize: 5,
            pageIndex: page,
            onPageChanged(page: number) {
              setPage(page);
            },
          }}
        />
        {/* <table className="table-auto text-[16px] text-[#99AC9B]"> */}
        {/*  <thead> */}
        {/*    <tr> */}
        {/*      <th className="text-left py-2">{t('Currency')}</th> */}
        {/*      <th className="text-left">{t('Amount')}</th> */}
        {/*      <th className="text-left">{t('Destination')}</th> */}
        {/*      <th className="text-left">{t('Opponent\'s address')}</th> */}
        {/*      <th className="text-left">{t('Approval Comments')}</th> */}
        {/*      <th className="text-left">{t('Approval time')}</th> */}
        {/*      <th className="text-right">{t('Reconciliation')}</th> */}
        {/*    </tr> */}
        {/*  </thead> */}
        {/*  <tbody> */}
        {/*    {listQuery.data?.data?.records.map((it, idx) => ( */}
        {/*      <tr> */}
        {/*        <td>{it.coinName}</td> */}
        {/*        <td> */}
        {/*          <div className="gradient-text1 pr-8">{`${-it.amount} ${it.coinName}`}</div> */}
        {/*        </td> */}
        {/*        <td> */}
        {/*          <div className="pr-8">{it.directionName}</div> */}
        {/*        </td> */}
        {/*        <td className="py-2"> */}
        {/*          <div className="flex flex-row gap-2 items-center"> */}
        {/*            <div>{it.address}</div> */}
        {/*            <CopyIcon text={it.address} /> */}
        {/*          </div> */}
        {/*        </td> */}
        {/*        <td> */}
        {/*          <div className="flex items-center gap-2"> */}
        {/*            <div>{it.approvalRemark}</div> */}
        {/*            {trustQuery.data?.data?.roleType! > 2 && ( */}
        {/*            <div */}
        {/*              className="cursor-pointer" */}
        {/*              onClick={() => { */}
        {/*                setSelected(it); */}
        {/*                setOpinionVisible(true); */}
        {/*              }} */}
        {/*            > */}
        {/*              <img src={editIcon} alt="" /> */}
        {/*            </div> */}
        {/*          )} */}
        {/*          </div> */}
        {/*        </td> */}
        {/*        <td>{unixFormatTime(it.approvalTimeStamp)}</td> */}
        {/*        /!* todo: 这里缺少审批的操作 *!/ */}
        {/*        <td> */}
        {/*          <div className="flex justify-end items-center gap-4"> */}
        {/*            /!* 审批状态状态：1-待审批，2-已通过，3-已拒绝 *!/ */}
        {/*            {it.approvalStatus === 1 && ( */}
        {/*            <> */}
        {/*              <TextButton */}
        {/*                onClick={() => audit(it.id, true)} */}
        {/*              > */}
        {/*                Approved */}
        {/*              </TextButton> */}
        {/*              <TextButton */}
        {/*                onClick={() => audit(it.id, false)} */}
        {/*              > */}
        {/*                Refusal */}
        {/*              </TextButton> */}
        {/*            </> */}
        {/*            )} */}
        {/*            {it.approvalStatus > 1 && <div>{it.approvalStatusName}</div>} */}
        {/*          </div> */}
        {/*        </td> */}
        {/*      </tr> */}
        {/*    ))} */}
        {/*  </tbody> */}
        {/* </table> */}
        <Modal visible={opinionVisible} onClose={() => setOpinionVisible(false)}>
          {selected && (
          <ApprovalOpinion
            record={selected}
            onClose={() => setOpinionVisible(false)}
          />
          )}
        </Modal>
      </div>
    </TrustContainer>
  );
}
