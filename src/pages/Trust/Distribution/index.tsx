import React from 'react';
import Header from './Header';
import AllocationPlan from './AllocationPlan';
import AllocationRecord from './AllocationRecord';
import TrustHeader from '../TrustHeader';
import logo from '../../../assets/icon/distribution_logo.svg';

export default function Distribution() {
  return (
    <div className="flex flex-col pt-4 gap-6">
      <TrustHeader
        title="Distribution"
        description="The trustee can establish a distribution plan to distribute the trust property to designated beneficiaries according to the wishes and conditions of the grantor."
        logo={logo}
      />
      <AllocationPlan />
      <AllocationRecord />
    </div>
  );
}
