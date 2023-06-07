import React from 'react';
import classNames from 'classnames';
import BigNumber from 'bignumber.js';
import { FormattedMessage } from 'react-intl';
import { IAssetsOverview, IFiatAssets } from '../../../interfaces/trust';
import arrowUp from '../../../assets/icon/arrow_up.svg';
import symbolIcon from '../../../assets/icon/dashboard/icon_usdt.svg';
import { Cell } from './DigitalAssets';
import { currencyUSDTFormat } from '../../../utils/CurrencyFormat';
import FiatAssetsCell from './FiatAssetsCell';
import Empty from '../../../views/Empty';

export default function FiatAssets({ asset }: {
  asset?: IAssetsOverview
}) {
  const [expandState, setExpandState] = React.useState({});

  return (
    <div className={classNames('gradient-bg2 rounded-xl p-8', 'flex flex-col gap-6')}>
      <div
        className={classNames(
          'flex flex-row items-center justify-between',
          'gradient-border1',
          'rounded-xl',
          'h-[64px]',
          'px-8',
          'font-bold text-[24px] font-title text-t4',
        )}
      >
        <div><FormattedMessage defaultMessage="Fiat Assets" /></div>
        <div>{`${currencyUSDTFormat(asset?.fiatAssets.reduce((x, y) => BigNumber(y.totalUSDT).plus(x), BigNumber(0)).toFixed())} USD`}</div>
      </div>
      {asset?.fiatAssets.map((it) => (<FiatAssetsCell key={it.name} asset={it} />))}
      {asset?.fiatAssets.length === 0 && <Empty />}
    </div>
  );
}
