import classNames from 'classnames';
import React, { useState } from 'react';
import { useCollapse } from 'react-collapsed';
import { FormattedMessage } from 'react-intl';
import { currencyUSDTFormat } from '../../../utils/CurrencyFormat';
import arrowUp from '../../../assets/icon/arrow_up.svg';
import symbolIcon from '../../../assets/icon/dash_bit_icon.svg';
import { Cell } from './DigitalAssets';
import { IDigitalAssets } from '../../../interfaces/trust';
import sectionIcon from '../../../assets/icon/icon_coin_coinbase.svg';
import safeheronIcon from '../../../assets/icon/icon_coin_safeheron.svg';

export default function DigtalAssetsSection({ asset }: {
  asset: IDigitalAssets
}) {
  // const { t } = useTranslation();
  const [isExpanded, setExpanded] = useState(true);
  const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded });

  return (
    <div className={classNames('gradient-block1', 'shadow-block', 'rounded-xl')}>
      <div
        className="flex flex-row gap-4 items-center h-[80px] px-8"
        {...getToggleProps({ onClick: () => setExpanded((x) => !x) })}
      >
        <img src={asset.name === 'SafeHeron' ? safeheronIcon : sectionIcon} alt="" />
        <div className="gradient-text1 text-[20px] font-bold flex-auto">{asset.name}</div>
        {(asset.status === 1 || asset.status === 2)
          && <div className="font-bold text-[20px] text-[#708077] break-keep"><FormattedMessage defaultMessage="Opening in progress" /></div>}
        {asset.status === 3
          && <div className="gradient-text1 text-[20px] font-bold">{`${currencyUSDTFormat(asset.totalUSDT)} USD`}</div>}
        {asset.details?.filter((x) => x.amount > 0).length > 0 && (
          <img src={arrowUp} alt="" className={classNames('transition', isExpanded && 'rotate-180')} />)}
      </div>
      {asset.details?.filter((x) => x.amount > 0).length > 0 && (
        <section {...getCollapseProps()}>
          <div className="flex flex-col gap-6 p-8 bg-divider rounded-b-xl bg-[#314C40]">
            {asset.details?.filter((x) => x.amount > 0).map((d) => (
              <Cell
                icon={symbolIcon}
                amount={d.amount}
                symbol={d.symbol}
                rate={Number((d.amount * d.price / asset.totalUSDT * 100).toFixed(2))}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
