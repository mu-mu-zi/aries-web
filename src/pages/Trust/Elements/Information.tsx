import React from 'react';
import classNames from 'classnames';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Hr from '../../../components/Hr';
import { useTrustDetailQuery } from '../../../api/trust/trust';
import { CallFormat } from '../../../utils/CallFormat';

export default function Information() {
  const { trustId } = useParams();
  const { t } = useTranslation();
  const detailQuery = useTrustDetailQuery({
    trustId: Number(trustId),
  });

  return (
    <div className="flex flex-col gap-4 gradient-bg2 rounded-xl p-8 shadow-block">
      <div className="gradient-text1 font-title font-bold text-[20px]">{t('Trust information')}</div>
      <Hr />
      {
        detailQuery.data?.data && (
          <div className="flex flex-row items-start justify-between">
            <InformationCell title="Trust name" value={detailQuery.data?.data?.trustName} />
            <InformationCell
              title="Establishment time"
              value={moment.unix(detailQuery.data.data.createTime / 1000).format('yyyy-MM-DD')}
            />
            <InformationCell title="Principal" value={`${detailQuery.data?.data?.surname} ${detailQuery.data?.data?.userName}`} />
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
