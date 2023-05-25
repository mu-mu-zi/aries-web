import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import OrderCell from './OrderCell';
import TrustHeader from '../TrustHeader';
import logo from '../../../assets/icon/investment_order_logo.svg';
import Button from '../../../components/Button';
import { useInvestmentOrderQuery } from '../../../api/trust/investment';
import Modal from '../../../components/Modal';
import CreatingCommand from './CreatingCommand';
import Paginate from '../../../components/Paginate';
import { useTrustDetailQuery } from '../../../api/trust/trust';

export default function InvestmentOrder() {
  const { trustId } = useParams();
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const listQuery = useInvestmentOrderQuery({
    trustId: Number(trustId),
    pageIndex: page,
    pageSize: 4,
  });
  const [creatingVisible, setCreatingVisible] = useState(false);
  const trustDetailQuery = useTrustDetailQuery({ trustId: Number(trustId) });

  return (
    <div className="flex flex-col">
      <TrustHeader
        title={t('Investment Order')}
        description={t('The principal can use the investment instruction function to indicate investment intentions and directions to Aries Digital Group, and request investment operations to be carried out according to the principal\'s instructions. Throughout the process, the principal can adjust investment instructions based on market fluctuations and investment directions.') ?? ''}
        logo={logo}
        btn={(trustDetailQuery.data?.data?.roleType ?? 0) > 2 && <Button onClick={() => setCreatingVisible(true)}>{t('Creating a command')}</Button>}
      />
      <div
        className="gradient-bg2 roundex-xl shadow-block p-8 rounded-xl flex flex-col gap-8"
      >
        <div className="grid grid-cols-2 gap-4">
          {listQuery.data?.data?.records.map((it) => <OrderCell item={it} key={it.trustInvestmentId} />)}
        </div>
        <div className="w-full flex flex-col items-center">
          <Paginate
            page={page}
            total={listQuery.data?.data?.total ?? 0}
            pageSize={4}
            onPageChanged={(page) => setPage(page)}
          />
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
