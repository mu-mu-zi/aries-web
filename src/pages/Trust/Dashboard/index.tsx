import React from 'react';
import { css } from '@emotion/react';
import { useLocation } from 'react-router-dom';
import Portrait from './Portrait';
import Button from '../../../components/Button';
import AssetOverview from './AssetOverview';
import SimpleNotification from './SimpleNotification';
import BillingRecord from './BillingRecord';
import GradientText from '../../../components/GradientText';
import DigitalAssets from './DigitalAssets';
import FiatAssets from './FiatAssets';
import Navbar from '../../../views/Navbar';
import { useAssetOverviewQuery } from '../../../api/trust/trust';

export default function Dashboard() {
  const location = useLocation();
  /* todo: 固定 ID */
  const assetsOverviewQuery = useAssetOverviewQuery({
    trustId: 15,
  });

  return (
    <div className="flex min-h-screen flex-row gap-6 pl-6">
      <div className="flex flex-auto flex-col gap-6">
        <Portrait />
        <DigitalAssets assetOverview={assetsOverviewQuery.data?.data} />
        <FiatAssets assetOverview={assetsOverviewQuery.data?.data} />
      </div>
      <div className="flex flex-col w-[402px] flex-shrink-0 gap-6">
        <AssetOverview assetOverview={assetsOverviewQuery.data?.data} />
        <SimpleNotification />
        <BillingRecord />
      </div>
    </div>
  );
}
