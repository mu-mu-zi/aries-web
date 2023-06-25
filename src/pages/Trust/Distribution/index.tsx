import React from 'react';
import { useIntl } from 'react-intl';
import Header from './Header';
import AllocationPlan from './AllocationPlan';
import AllocationRecord from './AllocationRecord';
import TrustHeader from '../TrustHeader';
import logo from '../../../assets/icon/distribution_logo.svg';

export default function Distribution() {
  // const { t } = useTranslation();
  const intl = useIntl();

  return (
    <div className="flex flex-col pt-4 gap-6">
      <TrustHeader
        title={intl.formatMessage({ defaultMessage: 'Distribution' })}
        description={intl.formatMessage({ defaultMessage: 'The Settlor can create a statement of intent regarding the distribution of trust assets, which the Trustee can refer to and execute accordingly' })}
        logo={logo}
      />
      <AllocationPlan />
      <AllocationRecord />
    </div>
  );
}
