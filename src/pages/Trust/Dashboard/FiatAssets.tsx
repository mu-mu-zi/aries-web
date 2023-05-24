import React from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { IAssetsOverview, IFiatAssets } from '../../../interfaces/trust';
import arrowUp from '../../../assets/icon/arrow_up.svg';
import symbolIcon from '../../../assets/icon/dashboard/icon_usdt.svg';
import { Cell } from './DigitalAssets';
import { currencyUSDTFormat } from '../../../utils/CurrencyFormat';

export default function FiatAssets({ asset }: {
  asset?: IFiatAssets
}) {
  const { t } = useTranslation();
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
        <div>{asset?.name}</div>
        {/* todo: 这里的 total 是错误的 */}
        <div>{`${currencyUSDTFormat(asset?.totalUSDT)} USD`}</div>
      </div>
      {asset?.details?.map((it) => (
        <div key={it.name} className={classNames('gradient-block1', 'shadow-block', 'rounded-xl')}>
          <div className="flex flex-row gap-4 items-center h-[80px] px-8">
            <div className="gradient-text1 text-[20px] font-bold flex-auto">{it.name}</div>
            <div className="gradient-text1 text-[20px] font-bold">{`${currencyUSDTFormat(it.totalAmountUSDT)} USD`}</div>
            {it.details?.filter((x) => x.amount > 0).length > 0 && <img src={arrowUp} alt="" />}
          </div>
          {it.details?.filter((x) => x.amount > 0).length > 0 && (
            <div className="flex flex-col gap-6 p-8 bg-divider rounded-b-xl">
              {it.details?.filter((x) => x.amount > 0).map((d) => (
                <Cell
                  icon={d.image}
                  amount={d.amount}
                  symbol={d.symbol}
                  rate={Number((d.amount / it.totalAmountUSDT * 100).toFixed(3))}
                />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
