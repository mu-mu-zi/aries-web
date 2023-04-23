import React from 'react';
import classNames from 'classnames';
import Button from '../../../components/Button';
import bgIcon from '../../../assets/icon/assets_overview_bg.svg';

export default function AssetOverview() {
  return (
    <div className={classNames('gradient-border1', 'p-8', 'rounded-xl', 'overflow-clip', 'font-title font-bold')}>
      <div className="bg-right-top bg-no-repeat m-[-32px] p-8" style={{ backgroundImage: `url(${bgIcon})` }}>
        <div className="text-[20px]">Asset Overview</div>
        <div className={classNames('mt-8 flex flex-row items-center gap-4')}>
          <div className="text-[40px]">1,871,006.058</div>
          <div className="text-[20px]">USD</div>
        </div>
        <div className={classNames('mt-[55px] flex flex-row gap-[20px]')}>
          <Button className="flex-auto">Asset transfer</Button>
          <Button className="flex-auto">Investment Order</Button>
        </div>
      </div>
    </div>
  );
}
