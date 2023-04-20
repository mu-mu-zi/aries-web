import React from 'react';
import classNames from 'classnames';
import GradientBox from '../../components/GradientBox';

export default function DigitalAssets() {
  return (
    <div className={classNames('gradient-bg2 rounded-xl p-8', 'flex flex-col gap-6')}>
      <div
        className={classNames(
          'flex flex-row items-center justify-between',
          'gradient-border1',
          'rounded-xl',
          'h-[64px]',
          'px-8',
        )}
      >
        <div>Digital Assets</div>
        <div>100002.122 USD</div>
      </div>
      {/* Custoday */}
      <div className={classNames('flex flex-row items-center justify-between', 'gradient-block1')}>
        <div>Custoday</div>
        <div>100002.122 USD</div>
      </div>
      {/* Coinbase */}
    </div>
  );
}
