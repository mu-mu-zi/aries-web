import React from 'react';
import { css } from '@emotion/react';
import Portrait from './Portrait';
import Button from '../../../components/Button';
import AssetOverview from './AssetOverview';
import Notification from './Notification';
import BillingRecord from './BillingRecord';
import GradientText from '../../../components/GradientText';
import DigitalAssets from './DigitalAssets';
import FiatAssets from './FiatAssets';
import Navbar from '../../../views/Navbar';

export default function Dashboard() {
  return (
    <div className="flex min-h-screen flex-row gap-6 px-6">
      <div className="flex flex-auto flex-col gap-6">
        <Portrait />
        <DigitalAssets />
        <FiatAssets />
      </div>
      <div className="flex flex-col w-[402px] flex-shrink-0 gap-6">
        <AssetOverview />
        <Notification />
        <BillingRecord />
      </div>
    </div>
  );
}
