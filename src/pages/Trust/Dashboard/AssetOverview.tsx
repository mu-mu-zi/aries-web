import React from 'react';
import classNames from 'classnames';
import { useNavigate, useParams } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import Button from '../../../components/Button';
import bgIcon from '../../../assets/icon/assets_overview_bg.svg';
import { IAssetsOverview } from '../../../interfaces/trust';
import { currencyFormat, currencyUSDTFormat } from '../../../utils/CurrencyFormat';

export default function AssetOverview({ assetOverview }: {
  assetOverview?: IAssetsOverview
}) {
  const navigate = useNavigate();
  // const { t } = useTranslation();
  const { trustId } = useParams();

  return (
    <div className={classNames('gradient-border1', 'p-8', 'rounded-xl', 'overflow-clip', 'font-title font-bold', 'shadow-[-4px_8px_10px_0_#030c08]')}>
      <div className="bg-right-top bg-no-repeat m-[-32px] p-8" style={{ backgroundImage: `url(${bgIcon})` }}>
        <div className="text-[20px]">
          <FormattedMessage defaultMessage="Asset Overview" />
        </div>
        <div className={classNames('mt-8 flex flex-row items-center flex-shrink-0 gap-4')}>
          <div className="text-[40px] text-[#3D3228]">{currencyUSDTFormat(assetOverview?.totalUSDT)}</div>
          <div className="text-[20px]">USD</div>
        </div>
        <div className={classNames('mt-[55px] flex flex-row gap-[20px]')}>
          <Button
            className="flex-1"
            onClick={() => navigate(`/trust/${trustId}/assets`, {
              replace: true,
            })}
          >
            <FormattedMessage defaultMessage="Asset Transfer" />
          </Button>
          <Button
            className="flex-1"
            onClick={() => navigate(`/trust/${trustId}/orders`, {
              replace: true,
            })}
          >
            <FormattedMessage defaultMessage="Investment Order" />
          </Button>
        </div>
      </div>
    </div>
  );
}
