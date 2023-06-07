import React from 'react';
import classNames from 'classnames';
import { css } from '@emotion/react';
import BigNumber from 'bignumber.js';
import { FormattedMessage, useIntl } from 'react-intl';
import GradientBox from '../../../components/GradientBox';
import symbolIcon from '../../../assets/icon/dash_bit_icon.svg';
import arrowUp from '../../../assets/icon/arrow_up.svg';
import { IAssetsOverview, IDigitalAssets } from '../../../interfaces/trust';
import { currencyFormat, currencyUSDTFormat } from '../../../utils/CurrencyFormat';
import DigtalAssetsSection from './DigtalAssetsSection';
import Empty from '../../../views/Empty';

export default function DigitalAssets({ assetOverview }: {
  assetOverview?: IAssetsOverview
}) {
  // const { t } = useTranslation();
  const intl = useIntl();

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
        <div><FormattedMessage defaultMessage="Digital Assets" /></div>
        {/* {assetOverview?.digitalAssets.reduce((x, y) => x + Number(y.totalUSDT), 0)} */}
        <div>
          {`${currencyUSDTFormat(assetOverview?.digitalAssets.reduce((x, y) => BigNumber(y.totalUSDT).plus(x), BigNumber(0)).toFixed())} USD`}
        </div>
      </div>
      {assetOverview?.digitalAssets.map((it) => <DigtalAssetsSection asset={it} key={it.name} />)}
      {assetOverview?.digitalAssets.length === 0 && <Empty />}
    </div>
  );
}

export function Cell({
  icon, amount, symbol, rate,
}: {
  icon: string,
  amount: string | number,
  symbol: string,
  rate: number
}) {
  return (
    <div className="flex flex-row items-center relative">
      <img src={icon} width="24px" alt="" className="absolute z-[1]" />
      <div className="ml-[12px] w-[70%]">
        <div
          className={classNames('gradient-border1 shadow-block h-[10px] rounded-full overflow-clip', rate <= 0 && 'w-0')}
          css={css`
            width: ${Math.max(rate, 5)}%;
          `}
        />
      </div>
      {/* {rate} */}
      <div className="flex-auto ml-[36px] gradient-text1 text-[20px] text-right">
        {`${amount} ${symbol}`}
      </div>
    </div>
  );
}
