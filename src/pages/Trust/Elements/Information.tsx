import React from 'react';
import classNames from 'classnames';
import moment from 'moment';
import Hr from '../../../components/Hr';
import { useTrustDetailQuery } from '../../../api/trust/trust';

export default function Information() {
  const detailQuery = useTrustDetailQuery({
    trustId: 15,
  });

  return (
    <div className="flex flex-col gap-4 gradient-bg2 rounded-xl p-8 shadow-block">
      <div className="gradient-text1 font-title font-blod text-[20px]">Trust information</div>
      <Hr />
      {
        detailQuery.data?.data && (
        <div className="flex flex-row items-start justify-between">
          <InformationCell title="Trust name" value={detailQuery.data?.data?.trustName} />
          <InformationCell title="Establishment time" value={moment.unix(detailQuery.data.data.createTime / 1000).format()} />
          {/* todo: Principal 属性 */}
          <InformationCell title="Principal" value="Lee ***" />
          <InformationCell title="Trust Type" value={detailQuery.data.data.trustEntrustTypeName} />
          <InformationCell title="Status" value={detailQuery.data.data.trustStatusName} alignRight />
        </div>
        )
      }
    </div>
  );
}

function InformationCell({ title, value, alignRight }: {
    title: string,
    value?: string | number,
    alignRight?: boolean,
}) {
  return (
    <div className={classNames('flex-auto flex flex-col gap-4', {
      'items-end': alignRight,
    })}
    >
      <div className="text-[#99AC9B] text-[16px]">{title}</div>
      <div className="font-bold text-[#C2D7C7F6] text-[20px]">{value}</div>
    </div>
  );
}
