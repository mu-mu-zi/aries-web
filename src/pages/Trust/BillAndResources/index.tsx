import React, { useState } from 'react';
import Header from './Header';
import Switch from './Switch';
import Ledger from './Ledger';
import Fees from './Fees';
import LegalText from './LegalText';
import Report from './Report';
import TrustHeader from '../TrustHeader';
import logo from '../../../assets/icon/trust_bill_logo.png';

export default function BillAndResources() {
  const [selected, setSelected] = useState(0);

  return (
    <div className="flex flex-col">
      <TrustHeader
        title="Bill and Resources"
        description="Here, you can access all the information about changes in trust property and make inquiries."
        logo={logo}
      />
      <div className="p-8 gradient-bg2 shadow-block rounded-xl flex flex-col gap-4">
        <Switch
          titles={['General ledger', 'Trust fees', 'Legal text', 'Report']}
          onSelect={setSelected}
        />
        <hr />
        <div className="mt-2">
          {selected === 0 && <Ledger />}
          {selected === 1 && <Fees />}
          {selected === 2 && <LegalText />}
          {selected === 3 && <Report />}
        </div>
      </div>
    </div>
  );
}
