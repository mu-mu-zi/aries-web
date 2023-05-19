import React from 'react';
import { useTranslation } from 'react-i18next';
import Header from './Header';
import AllocationPlan from './AllocationPlan';
import AllocationRecord from './AllocationRecord';
import TrustHeader from '../TrustHeader';
import logo from '../../../assets/icon/distribution_logo.svg';

export default function Distribution() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col pt-4 gap-6">
      <TrustHeader
        title={t('Distribution')}
        description={t('The trustee can establish a distribution plan to distribute the trust property to designated beneficiaries according to the wishes and conditions of the grantor.')}
        logo={logo}
      />
      <AllocationPlan />
      <AllocationRecord />
    </div>
  );
}
