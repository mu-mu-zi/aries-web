import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';
import Hr from '../../../components/Hr';
import { useDistributionBillQuery } from '../../../api/trust/distribution';
import SimpleTable from '../../../views/SimpleTable';
import { unixFormatTime } from '../../../utils/DateFormat';
import TextButton from '../../../components/TextButton';
import { IDistributionBill } from '../../../interfaces/trust';
import Modal from '../../../components/Modal';
import RecodeViewCredentials from '../AssetTransfet/RecodeViewCredentials';
import NoCredentials from '../../../views/NoCredentials';

export default function AllocationRecord() {
  const { trustId } = useParams();
  const [page, setPage] = useState(1);
  const listQuery = useDistributionBillQuery({
    trustId: Number(trustId),
    pageIndex: page,
    pageSize: 5,
  });
  const intl = useIntl();
  const [selected, setSelected] = useState<IDistributionBill>();
  const [certificateVisible, setCertificateVisible] = useState(false);

  return (
    <div className="gradient-border-container shadow-block">
      <div className="flex flex-col gap-4 gradient-bg2 rounded-xl p-8">
        <div className="gradient-text1 font-title font-bold text-[20px]">
          <FormattedMessage defaultMessage="Allocation Record" />
        </div>
        <Hr />
        <SimpleTable
          columns={[
            {
              Header: intl.formatMessage({ defaultMessage: 'Beneficiary' }),
              accessor: (x) => {
                if (x.userType === 3) {
                  return intl.formatMessage({ defaultMessage: 'Others ({remark})' }, { remark: x.remark });
                }
                return x.beneficiaryUserName;
              },
            },
            {
              Header: intl.formatMessage({ defaultMessage: 'Time' }),
              accessor: (x) => unixFormatTime(x.createTimeStamp),
            },
            {
              Header: intl.formatMessage({ defaultMessage: 'Network' }),
              accessor: (x) => x.mainnet,
            },
            {
              Header: intl.formatMessage({ defaultMessage: 'Asset Classes' }),
              accessor: (x) => x.coinName,
            },
            {
              Header: () => (
                <div className="text-right">
                  <FormattedMessage defaultMessage="Amount" />
                </div>
              ),
              accessor: 'quantity',
              // eslint-disable-next-line react/prop-types
              Cell: ({ row }) => (
                // eslint-disable-next-line react/prop-types
                <div className="text-right text-[16px] gradient-text2">{row.original.quantity}</div>
              ),
            },
            {
              Header: () => (<div className="text-right"><FormattedMessage defaultMessage="Reconciliation" /></div>),
              accessor: 'reconciliation',
              // eslint-disable-next-line react/prop-types
              Cell: ({ row }) => (
                <div className="flex justify-end">
                  {row.original.billCertificate ? (
                    <TextButton
                      onClick={() => {
                        setSelected(row.original);
                        setCertificateVisible(true);
                      }}
                    >
                      <FormattedMessage defaultMessage="View credentials" />
                    </TextButton>
                  ) : <NoCredentials />}
                </div>
              ),
            },
          ]}
          data={listQuery.data?.data?.records}
          pagination={{
            pageIndex: page,
            pageSize: 5,
            total: listQuery.data?.data?.total ?? 0,
            onPageChanged(page: number) {
              setPage(page);
            },
          }}
        />
      </div>
      <Modal visible={certificateVisible} onClose={() => setCertificateVisible(false)}>
        {selected && (
          <RecodeViewCredentials
            onClose={() => setCertificateVisible(false)}
            images={[selected.billCertificate]}
          />
        )}
      </Modal>
    </div>
  );
}
