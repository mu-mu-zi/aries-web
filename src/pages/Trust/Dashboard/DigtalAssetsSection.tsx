import classNames from 'classnames';
import React, { useState } from 'react';
import { useCollapse } from 'react-collapsed';
import { FormattedMessage } from 'react-intl';
import { currencyUSDTFormat, digitalUSDTFormat } from '../../../utils/CurrencyFormat';
import arrowUp from '../../../assets/icon/arrow_up.svg';
import symbolIcon from '../../../assets/icon/dash_bit_icon.svg';
import { Cell } from './DigitalAssets';
import { IDigitalAssets } from '../../../interfaces/trust';
import sectionIcon from '../../../assets/icon/icon_coin_coinbase.svg';
import safeheronIcon from '../../../assets/icon/icon_coin_safeheron.svg';

export default function DigtalAssetsSection({ asset }: { asset: IDigitalAssets }) {
  const [isExpanded, setExpanded] = useState(true);
  const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded });

  return (
    <div className={classNames('gradient-block1', 'shadow-block', 'rounded-xl')}>
      <div
        className="flex h-[80px] flex-row items-center gap-4 px-8"
        {...getToggleProps({ onClick: () => setExpanded((x) => !x) })}
      >
        {/* 安全路图标特殊点 */}
        <img src={asset.isSafeHeron ? safeheronIcon : sectionIcon} alt={asset.name} />
        {asset.isSafeHeron ? (
          <div className="gradient-text1 flex-auto text-[20px] font-bold">
            <FormattedMessage defaultMessage="Custodial Account" />
          </div>
        ) : (
          <div className="gradient-text1 flex-auto text-[20px] font-bold">{asset.name}</div>
        )}
        {/* 开立中 */}
        {(asset.status === 1 || asset.status === 2) && (
          <div className="break-keep text-[20px] font-bold text-[#708077]">
            <FormattedMessage defaultMessage="Opening in progress" />
          </div>
        )}
        {/* 已开立 */}
        {asset.status === 3 && (
          <div className="gradient-text1 text-[20px] font-bold">{`${digitalUSDTFormat(asset.totalUSDT)} USD`}</div>
        )}
        {asset.details?.filter((x) => x.amount > 0).length > 0 && (
          <img src={arrowUp} alt="" className={classNames('transition', isExpanded && 'rotate-180')} />
        )}
      </div>
      {asset.details?.filter((x) => x.amount > 0).length > 0 && (
        <section {...getCollapseProps()}>
          <div className="flex flex-col gap-6 rounded-b-xl bg-divider p-8">
            {asset.details
              ?.filter((x) => x.amount > 0)
              .map((d) => (
                <Cell
                  icon={symbolIcon}
                  amount={digitalUSDTFormat(d.amount)}
                  symbol={d.symbol}
                  rate={Number((((d.amount * d.price) / asset.totalUSDT) * 100).toFixed(2))}
                />
              ))}
          </div>
        </section>
      )}
    </div>
  );
}
