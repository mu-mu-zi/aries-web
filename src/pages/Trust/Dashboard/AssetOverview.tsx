import React from 'react';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/Button';
import bgIcon from '../../../assets/icon/assets_overview_bg.svg';
import { IAssetsOverview } from '../../../interfaces/trust';

export default function AssetOverview({ assetOverview }: {
  assetOverview?: IAssetsOverview
}) {
  const navigate = useNavigate();

  return (
    <div className={classNames('gradient-border1', 'p-8', 'rounded-xl', 'overflow-clip', 'font-title font-bold', 'shadow-[-4px_8px_10px_0_#030c08]')}>
      <div className="bg-right-top bg-no-repeat m-[-32px] p-8" style={{ backgroundImage: `url(${bgIcon})` }}>
        <div className="text-[20px]">Asset Overview</div>
        <div className={classNames('mt-8 flex flex-row items-center gap-4')}>
          <div className="text-[40px]">{assetOverview?.totalUSDT}</div>
          <div className="text-[20px]">USD</div>
        </div>
        <div className={classNames('mt-[55px] flex flex-row gap-[20px]')}>
          <Button
            className="flex-1"
            onClick={() => navigate('/trust/assets', {
              replace: true,
            })}
          >
            Asset transfer
          </Button>
          <Button
            className="flex-1"
            onClick={() => navigate('/trust/orders', {
              replace: true,
            })}
          >
            Investment Order
          </Button>
        </div>
      </div>
    </div>
  );
}
