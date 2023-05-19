import React from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import GradientBox from '../../../components/GradientBox';
import symbolIcon from '../../../assets/icon/dashboard/icon_usdt.svg';
import arrowUp from '../../../assets/icon/arrow_up.svg';
import { IAssetsOverview, IDigitalAssets } from '../../../interfaces/trust';

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
        <div>{`${assetOverview?.totalUSDT} USD`}</div>
      </div>
      {assetOverview?.digitalAssets.map((it) => (
        <div className={classNames('gradient-block1', 'shadow-block', 'rounded-xl')}>
          <div className="flex flex-row items-center h-[80px] px-8">
            <div className="gradient-text1 text-[20px] font-bold flex-auto">{it.name}</div>
            <div className="gradient-text1 text-[20px] font-bold">{`${it.totalUSDT} USD`}</div>
            <img src={arrowUp} alt="" />
          </div>
          {it.details?.length > 0 && (
            <div className="flex flex-col gap-6 p-8 bg-divider rounded-b-xl">
              {it.details?.map((d) => <Cell icon={symbolIcon} amount={d.amount} symbol={d.symbol} />)}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export function Cell({
  icon, amount, symbol,
}: {
  icon: string,
  amount: string | number,
  symbol: string
}) {
  return (
    <div className="flex flex-row items-center relative">
      {/* todo: 设计图图标带阴影，需要删除 */}
      <img src={symbolIcon} width="24px" alt="" className="absolute z-[1] mt-[4px]" />
      <div className="flex-1 ml-[12px]">
        <div className="gradient-border1 shadow-block w-[50%] h-[10px] rounded-full overflow-clip" />
      </div>
      <div className="ml-[36px] gradient-text1 text-[20px]">100,672.122 USD</div>
    </div>
  );
}
