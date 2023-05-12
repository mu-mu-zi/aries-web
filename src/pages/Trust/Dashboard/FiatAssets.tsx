import React from 'react';
import { IAssetsOverview } from '../../../interfaces/trust';

export default function FiatAssets({ assetOverview }: {
  assetOverview?: IAssetsOverview
}) {
  return (
    /* todo: 这里接口存在多重 details 嵌套，设计图暂时没法暂时 */
    <div>fiat</div>
  );
}
