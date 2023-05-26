import React, { useState } from 'react';
import { NavLink, Outlet, useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import Header from './Header';
import Switch from './Switch';
import Ledger from './Ledger';
import Fees from './Fees';
import LegalText from './LegalText';
import Report from './Report';
import TrustHeader from '../TrustHeader';
import logo from '../../../assets/icon/trust_bill_logo.png';
import Hr from '../../../components/Hr';

const Link = styled(NavLink)`
  color: #99AC9B;

  &[aria-current="page"] {
    background: linear-gradient(90deg, #BE9D66 -4.08%, #E8D2A3 100%);
    background-clip: text;
    -webkit-text-fill-color: transparent;
    color: transparent;  
  }
`;

export default function BillAndResources() {
  const { trustId } = useParams();
  const [selected, setSelected] = useState(0);

  return (
    <div className="flex flex-col">
      <TrustHeader
        title="Bill and Resources"
        description="Here, you can access all the information about changes in trust property and make inquiries."
        logo={logo}
      />
      <div className="p-8 gradient-bg2 shadow-block rounded-xl flex flex-col gap-4">
        {/* <Switch */}
        {/*  titles={['General ledger', 'Trust fees', 'Legal text', 'Report']} */}
        {/*  onSelect={setSelected} */}
        {/* /> */}
        <div className="flex gap-4 font-title font-bold text-[20px]">
          <Link to={`/trust/${trustId}/billAndResources/`}>General ledger</Link>
          <Link to={`/trust/${trustId}/billAndResources/fees`}>Trust fees</Link>
          <Link to={`/trust/${trustId}/billAndResources/legalText`}>Legal text</Link>
          <Link to={`/trust/${trustId}/billAndResources/report`}>Report</Link>
        </div>
        <Hr />
        <div className="mt-2">
          <Outlet />
          {/* {selected === 0 && <Ledger />} */}
          {/* {selected === 1 && <Fees />} */}
          {/* {selected === 2 && <LegalText />} */}
          {/* {selected === 3 && <Report />} */}
        </div>
      </div>
    </div>
  );
}
