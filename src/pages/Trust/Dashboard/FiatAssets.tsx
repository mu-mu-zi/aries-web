import React from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { IAssetsOverview, IFiatAssets } from '../../../interfaces/trust';
import arrowUp from '../../../assets/icon/arrow_up.svg';
import symbolIcon from '../../../assets/icon/dashboard/icon_usdt.svg';
import { Cell } from './DigitalAssets';

export default function FiatAssets({ asset }: {
  asset?: IFiatAssets
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
        <div>{`${asset?.totalUSDT} USD`}</div>
      </div>
      {asset?.details?.map((it) => (
        <div className={classNames('gradient-block1', 'shadow-block', 'rounded-xl')}>
          <div className="flex flex-row items-center h-[80px] px-8">
            <div className="gradient-text1 text-[20px] font-bold flex-auto">{it.name}</div>
            <div className="gradient-text1 text-[20px] font-bold">{`${it.totalAmountUSDT} USD`}</div>
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
