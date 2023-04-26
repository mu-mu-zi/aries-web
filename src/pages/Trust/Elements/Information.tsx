import React from 'react';
import classNames from 'classnames';
import Hr from '../../../components/Hr';

export default function Information() {
  return (
    <div className="flex flex-col gap-4 gradient-bg2 rounded-xl p-8 shadow-block">
      <div className="gradient-text1 font-title font-blod text-[20px]">Trust information</div>
      <Hr />
      <div className="flex flex-row items-start justify-between">
        <InformationCell title="Trust name" value="TZ202304041321" />
        <InformationCell title="Establishment time" value="January 3rd, 2026" />
        <InformationCell title="Principal" value="Lee ***" />
        <InformationCell title="Trust Type" value="Irrevocable" />
        <InformationCell title="Status" value="Effective" alignRight />
      </div>
    </div>
  );
}

function InformationCell({ title, value, alignRight }: {
    title: string,
    value: string,
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
