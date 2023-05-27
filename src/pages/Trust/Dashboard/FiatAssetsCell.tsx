import React from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import arrowUp from '../../../assets/icon/arrow_up.svg';
import AssetsProgress from './AssetsProgress';
import { IFiatAssets } from '../../../interfaces/trust';

export default function FiatAssetsCell({ asset }: {
  asset: IFiatAssets
}) {
  const { t } = useTranslation();

  return (
    <div className={classNames('gradient-block1', 'shadow-block', 'rounded-xl')}>
      {/* header */}
      <div className="flex flex-row gap-4 items-center h-[80px] px-8">
        <div className="gradient-text1 text-[20px] font-bold flex-auto">{asset.name}</div>
        {(asset.status === 1 || asset.status === 2) && <div className="font-bold text-[20px] text-[#708077] break-keep">{t('Opening in progress')}</div>}
        {asset.status === 3 && <div className="gradient-text1 text-[20px] font-bold">{`${asset.totalUSDT} USD`}</div>}
        {/* {asset.details.filter((x) => x.amount).length > 0 && <img src={arrowUp} alt="" />} */}
        {asset.details.length > 0 && <img src={arrowUp} alt="" />}
      </div>
      {/* cell */}
      <div className="flex flex-col px-8 divide-[#3B5649] divide-y gradient-block1 rounded-b-xl">
        {/* {asset.details.filter((x) => x.amount > 0).map((it) => ( */}
        {asset.details.map((it) => (
          <div className="flex flex-col gap-4 text-[#AF9467] py-6">
            <div className="font-bold text-[20px]">{it.name}</div>
            <div className="flex items-center justify-between gap-4">
              <div className="w-3/5">
                <AssetsProgress
                  scale={it.totalAmountUSDT / asset.totalUSDT}
                />
              </div>
              <div className="flex-1 font-bold text-[20px] text-right">
                {`${it.totalAmountUSDT} USD`}
              </div>
            </div>
            {it.details.map((y) => (
              <div className="flex items-baseline justify-between text-[16px]">
                <div>{y.name}</div>
                <div>{`${y.apr}%`}</div>
                <div>{`${y.amount} ${y.symbol}`}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
