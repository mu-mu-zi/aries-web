import React, { useState } from 'react';
import OrderCell from './OrderCell';
import TrustHeader from '../TrustHeader';
import logo from '../../../assets/icon/investment_order_logo.svg';
import Button from '../../../components/Button';
import { useInvestmentOrderQuery } from '../../../api/trust/investment';
import Modal from '../../../components/Modal';
import CreatingCommand from './CreatingCommand';

export default function InvestmentOrder() {
  const [page, setPage] = useState(1);
  const listQuery = useInvestmentOrderQuery({
    trustId: 15,
    pageIndex: page,
  });
  const [creatingVisible, setCreatingVisible] = useState(false);

  return (
    <div className="flex flex-col">
      <TrustHeader
        title="Investment Order"
        description="The principal can use the investment instruction function to indicate investment intentions and directions to Aries Digital Group, and request investment operations to be carried out according to the principal's instructions. Throughout the process, the principal can adjust investment instructions based on market fluctuations and investment directions."
        logo={logo}
        btn={<Button onClick={() => setCreatingVisible(true)}>Creating a command</Button>}
      />
      <div
        className="gradient-bg2 roundex-xl shadow-block grid grid-cols-2 md:grid-cols-1 gap-4 p-8 rounded-xl"
      >
        {listQuery.data?.data?.records.map((it) => <OrderCell item={it} key={it.trustInvestmentId} />)}
      </div>
      <Modal visible={creatingVisible}>
        <CreatingCommand onClose={() => setCreatingVisible(false)} />
      </Modal>
    </div>
  );
}
