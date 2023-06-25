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

export default function DigitalAssets({ assetOverview }: { assetOverview?: IAssetsOverview }) {
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
          'font-title text-[24px] font-bold text-t4',
        )}
      >
        <div>
          <FormattedMessage defaultMessage="Digital Assets" />
        </div>
        {/* {assetOverview?.digitalAssets.reduce((x, y) => x + Number(y.totalUSDT), 0)} */}
        <div>
          {`${currencyUSDTFormat(
            assetOverview?.digitalAssets.reduce((x, y) => BigNumber(y.totalUSDT).plus(x), BigNumber(0)).toFixed(),
          )} USD`}
        </div>
      </div>
      {assetOverview?.digitalAssets.map((it) => (
        <DigtalAssetsSection asset={it} key={it.name} />
      ))}
      {assetOverview?.digitalAssets.length === 0 && <Empty />}
      <div className="gradient-text1 px-1">
        <FormattedMessage defaultMessage="* The USD price of digital assets is referenced from a third-party authoritative institution and is updated every 5 minutes" />
      </div>
    </div>
  );
}

export function Cell({
  icon,
  amount,
  symbol,
  rate,
}: {
  icon: string;
  amount: string | number;
  symbol: string;
  rate: number;
}) {
  return (
    <div className="relative flex flex-row items-center">
      <img src={icon} width="24px" alt="" className="absolute z-[1]" />
      <div className="ml-[12px] w-[70%]">
        <div
          className={classNames(
            'gradient-border1 h-[10px] overflow-clip rounded-full shadow-block',
            rate <= 0 && 'w-0',
          )}
          css={css`
            width: ${Math.max(rate, 5)}%;
          `}
        />
      </div>
      {/* {rate} */}
      <div className="gradient-text1 ml-[36px] flex-auto text-right text-[20px]">{`${amount} ${symbol}`}</div>
    </div>
  );
}
