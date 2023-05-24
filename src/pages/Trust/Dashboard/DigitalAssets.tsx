import React from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import GradientBox from '../../../components/GradientBox';
import symbolIcon from '../../../assets/icon/dashboard/icon_usdt.svg';
import arrowUp from '../../../assets/icon/arrow_up.svg';
import { IAssetsOverview, IDigitalAssets } from '../../../interfaces/trust';
import { currencyFormat, currencyUSDTFormat } from '../../../utils/CurrencyFormat';

export default function DigitalAssets({ assetOverview }: {
  assetOverview?: IAssetsOverview
}) {
  const { t } = useTranslation();

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
        <div>{t('Digital Assets')}</div>
        {/* todo: 这里的 total 是错误的 */}
        <div>{`${currencyUSDTFormat(assetOverview?.totalUSDT)} USD`}</div>
      </div>
      {assetOverview?.digitalAssets.map((it) => (
        <div className={classNames('gradient-block1', 'shadow-block', 'rounded-xl')}>
          <div className="flex flex-row gap-4 items-center h-[80px] px-8">
            <div className="gradient-text1 text-[20px] font-bold flex-auto">{it.name}</div>
            <div className="gradient-text1 text-[20px] font-bold">{`${currencyUSDTFormat(it.totalUSDT)} USD`}</div>
            {it.details?.filter((x) => x.amount > 0).length > 0 && <img src={arrowUp} alt="" />}
          </div>
          {it.details?.filter((x) => x.amount > 0).length > 0 && (
            <div className="flex flex-col gap-6 p-8 bg-divider rounded-b-xl bg-[#314C40]">
              {it.details?.filter((x) => x.amount > 0).map((d) => (
                <Cell
                  icon={d.image}
                  amount={d.amount}
                  symbol={d.symbol}
                  rate={Number((d.amount * d.price / it.totalUSDT * 100).toFixed(3))}
                />
              ))}
            </div>
          )}
        </div>
      ))}
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
      <img src={icon} width="24px" alt="" className="absolute z-[1] mt-[4px]" />
      <div className="flex-auto ml-[12px] max-w-[60%]">
        <div className={classNames('gradient-border1 shadow-block h-[10px] rounded-full overflow-clip', rate > 0 && `w-[${rate}%]`, rate <= 0 && 'w-0')} />
      </div>
      <div className="flex-1 ml-[36px] gradient-text1 text-[20px] text-right">
        {`${amount} ${symbol}`}
      </div>
    </div>
  );
}
