import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';
import OrderCell from './OrderCell';
import TrustHeader from '../TrustHeader';
import logo from '../../../assets/icon/investment_order_logo.svg';
import Button from '../../../components/Button';
import { useInvestmentOrderQuery } from '../../../api/trust/investment';
import Modal from '../../../components/Modal';
import CreatingCommand from './CreatingCommand';
import Paginate from '../../../components/Paginate';
import { useTrustDetailQuery } from '../../../api/trust/trust';
import Empty from '../../../views/Empty';
import useTrustPermission from '../../../hooks/useTrustRole';

export default function InvestmentOrder() {
  const { trustId } = useParams();
  // const { t } = useTranslation();
  const intl = useIntl();
  const [page, setPage] = useState(1);
  const listQuery = useInvestmentOrderQuery({
    trustId: Number(trustId),
    pageIndex: page,
    pageSize: 4,
  });
  const [creatingVisible, setCreatingVisible] = useState(false);
  const trustDetailQuery = useTrustDetailQuery({ trustId: Number(trustId) });
  const { settlorPermission } = useTrustPermission({ trust: trustDetailQuery.data?.data });

  return (
    <div className="flex flex-col">
      {/* 委托人才有新增按钮 */}
      <TrustHeader
        title={intl.formatMessage({ defaultMessage: 'Investment Order' })}
        description={intl.formatMessage({ defaultMessage: 'The Settlor has the authority to make investments in the trust assets and can send investment orders through this page to be executed by the Trustee' })}
        logo={logo}
        btn={settlorPermission && (
          <Button onClick={() => setCreatingVisible(true)}>
            <FormattedMessage defaultMessage="Creating a command" />
          </Button>
        )}
      />
      <div className="gradient-border-container shadow-block">
        <div className="gradient-bg2 roundex-xl p-8 rounded-xl flex flex-col gap-8">
          {listQuery.data?.data?.records.length === 0 && <Empty />}
          {listQuery.data?.data?.records.length !== 0 && (
            <>
              <div className="grid grid-cols-2 gap-4">
                {listQuery.data?.data?.records.map((it) => <OrderCell item={it} key={it.trustInvestmentId} />)}
              </div>
              {Math.ceil((listQuery.data?.data?.total ?? 0) / 4) > 1 && (
                <div className="w-full flex flex-col items-center">
                  <Paginate
                    page={page}
                    total={listQuery.data?.data?.total ?? 0}
                    pageSize={4}
                    onPageChanged={(page) => setPage(page)}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <Modal
        visible={creatingVisible}
        onClose={() => setCreatingVisible(false)}
      >
        <CreatingCommand onClose={() => setCreatingVisible(false)} />
      </Modal>
    </div>
  );
}
