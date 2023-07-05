import React, { useState } from 'react';
import classNames from 'classnames';
import { useCollapse } from 'react-collapsed';
import { FormattedMessage } from 'react-intl';
import arrowUp from '../../../assets/icon/arrow_up.svg';
import AssetsProgress from './AssetsProgress';
import { IFiatAssets } from '../../../interfaces/trust';
import sectionIcon from '../../../assets/icon/icon_coin_coinbase.svg';
import { currencyUSDTFormat } from '../../../utils/CurrencyFormat';
import Tooltip from '../../../components/Tooltip';
import { stringShort } from '../../../utils/stringShort';

export default function FiatAssetsCell({ asset }: {
  asset: IFiatAssets
}) {
  // const { t } = useTranslation();
  const [isExpanded, setExpanded] = useState(true);
  const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded });

  return (
    <div className={classNames('gradient-block1', 'shadow-block', 'rounded-xl')}>
      {/* header */}
      <div
        className="flex flex-row gap-4 items-center h-[80px] px-8"
        {...getToggleProps({ onClick: () => setExpanded((x) => !x) })}
      >
        <img src={sectionIcon} />
        <div className="gradient-text1 text-[20px] font-bold flex-auto">{asset.name}</div>
        {(asset.status === 1 || asset.status === 2)
          && <div className="font-bold text-[20px] text-[#708077] break-keep"><FormattedMessage defaultMessage="Opening in progress" /></div>}
        {asset.status === 3 && <div className="gradient-text1 text-[20px] font-bold">{`${currencyUSDTFormat(asset.totalUSDT)} USD`}</div>}
        {asset.details.filter((x) => x.totalAmountUSDT > 0).length > 0
          && <img src={arrowUp} alt="" className={classNames('transition', isExpanded && 'rotate-180')} />}
        {/* {asset.details.length > 0 && <img src={arrowUp} alt="" />} */}
      </div>
      {/* cell */}
      <section {...getCollapseProps()}>
        <div className="flex flex-col px-8 divide-[#3B5649] divide-y gradient-block1 rounded-b-xl">
          {asset.details.filter((x) => x.totalAmountUSDT > 0).map((it) => (
            <div className="flex flex-col gap-4 text-[#AF9467] py-6">
              <div className="font-bold text-[20px]">{it.name}</div>
              <div className="flex items-center justify-between gap-4">
                <div className="w-[70%]">
                  <AssetsProgress scale={it.totalAmountUSDT / Number(asset.totalUSDT)} />
                </div>
                <div className="flex-1 font-bold text-[20px] text-right">
                  {/* {`${currencyUSDTFormat(it.totalAmountUSDT)} USD`} */}
                  {
                    it.cardTypeId === 1
                      ? `${currencyUSDTFormat(it.details?.[0].amount)} ${it.details?.[0].symbol}`
                      : (`${currencyUSDTFormat(it.totalAmountUSDT)} USD`)
                  }
                </div>
              </div>
              {it.details?.filter((x) => x.amount > 0).map((y) => (
                <div className={`flex items-baseline gap-4 text-[16px] ${it.cardTypeId === 1 ? 'hidden' : ''}`}>
                  <Tooltip title={y.name}>
                    <div className="line-clamp-1 break-all overflow-ellipsis">{y.name}</div>
                  </Tooltip>
                  {/* {y.name.length <= 20 && <div>{y.name}</div>} */}
                  {/* {y.name.length > 20 && ( */}
                  {/*  <Tooltip title={y.name}> */}
                  {/*    <div>{stringShort(y.name, 20)}</div> */}
                  {/*  </Tooltip> */}
                  {/* )} */}
                  {y.apr > 0 && <div className="">{`APR (${y.apr}%)`}</div>}
                  <div className="flex-auto" />
                  <div className="">{`${currencyUSDTFormat(y.amount)} ${y.symbol}`}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
