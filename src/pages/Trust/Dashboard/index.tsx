import React from 'react';
import { css } from '@emotion/react';
import { useLocation, useParams } from 'react-router-dom';
import { useIntl } from 'react-intl';
import Portrait from './Portrait';
import Button from '../../../components/Button';
import AssetOverview from './AssetOverview';
import SimpleNotification from './SimpleNotification';
import BillingRecord from './BillingRecord';
import GradientText from '../../../components/GradientText';
import DigitalAssets from './DigitalAssets';
import FiatAssets from './FiatAssets';
import Navbar from '../../../views/Navbar';
import { useAssetOverviewQuery, useTrustDetailQuery } from '../../../api/trust/trust';
import MiniCell from './MiniCell';
import icon from '../../../assets/icon/dashbaor_thri.svg';
import icon2 from '../../../assets/icon/dashboard_asi.svg';
import { currencyUSDTFormat } from '../../../utils/CurrencyFormat';
import Tooltip from '../../../components/Tooltip';
import { addSuccessNotification } from '../../../utils/Notification';

export default function Dashboard() {
  const location = useLocation();
  // const { t } = useTranslation();
  const intl = useIntl();
  const { trustId } = useParams();
  const trustQuery = useTrustDetailQuery({
    trustId: Number(trustId),
  });
  const assetsOverviewQuery = useAssetOverviewQuery({
    trustId: Number(trustId),
  });

  return (
    <div className="flex min-h-screen flex-row gap-6">
      <div className="flex flex-auto flex-col gap-6">
        {/* <Button onClick={() => addSuccessNotification({ title: '???' })}>Click</Button> */}
        <Portrait
          trustName={trustQuery.data?.data?.trustName}
          description={intl.formatMessage({ defaultMessage: 'has been exclusively established in accordance with your wishes to achieve the purpose of wealth inheritance and planning for your family' })}
        />
        <DigitalAssets assetOverview={assetsOverviewQuery.data?.data} />
        <FiatAssets asset={assetsOverviewQuery.data?.data} />
      </div>
      <div className="flex flex-col w-[402px] flex-shrink-0 gap-6 pb-4">
        <AssetOverview assetOverview={assetsOverviewQuery.data?.data} />
        <SimpleNotification />
        <BillingRecord />
        <MiniCell
          logo={icon2}
          title={intl.formatMessage({ defaultMessage: 'Digital Asset Market' })}
          link="https://coinmarketcap.com"
        />
        <MiniCell
          logo={icon}
          title={intl.formatMessage({ defaultMessage: 'Foreign Exchange Rate' })}
          link="https://www.dbs.com.hk/personal-zh/rates-online/foreign-currency-foreign-exchange.page"
        />
      </div>
    </div>
  );
}
