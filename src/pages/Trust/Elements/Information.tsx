import React from 'react';
import classNames from 'classnames';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';
import Hr from '../../../components/Hr';
import { useTrustDetailQuery } from '../../../api/trust/trust';
import { CallFormat } from '../../../utils/CallFormat';
import useTrustPermission from '../../../hooks/useTrustRole';
import { unixFormatTime } from '../../../utils/DateFormat';

export default function Information() {
  const { trustId } = useParams();
  // const { t } = useTranslation();
  const detailQuery = useTrustDetailQuery({
    trustId: Number(trustId),
  });
  const { settlorPermission } = useTrustPermission({ trust: detailQuery.data?.data });
  const intl = useIntl();

  const trustEntrustTypeTitle = (type: number) => {
    switch (type) {
      case 1: return intl.formatMessage({ defaultMessage: 'Irrevocable' });
      case 2: return intl.formatMessage({ defaultMessage: 'Revocable' });
      default: return '--';
    }
  };

  const trustStatusTitle = (type: number) => {
    switch (type) {
      case 1: return intl.formatMessage({ defaultMessage: 'To be effective' });
      case 2: return intl.formatMessage({ defaultMessage: 'Effective' });
      default: return '--';
    }
  };

  return (
    <div className="gradient-border-container shadow-block">
      <div className="flex flex-col gap-4 gradient-bg2 rounded-xl p-8">
        <div className="gradient-text1 font-title font-bold text-[20px]">
          <FormattedMessage defaultMessage="Trust information" />
        </div>
        <Hr />
        {
          detailQuery.data?.data && (
            <div className="flex flex-row items-start justify-between">
              <InformationCell
                title={intl.formatMessage({ defaultMessage: 'Trust name' })}
                value={detailQuery.data?.data?.trustName}
              />
              <InformationCell
                title={intl.formatMessage({ defaultMessage: 'Establishment time' })}
                value={unixFormatTime(detailQuery.data.data.createTime)}
              />
              <InformationCell
                title={intl.formatMessage({ defaultMessage: 'Principal' })}
                value={`${detailQuery.data?.data?.surname} ${detailQuery.data?.data?.userName}`}
              />
              <InformationCell
                title={intl.formatMessage({ defaultMessage: 'Trust Type' })}
                value={trustEntrustTypeTitle(detailQuery.data.data.trustEntrustType)}
              />
              <InformationCell
                title={intl.formatMessage({ defaultMessage: 'Status' })}
                value={trustStatusTitle(detailQuery.data.data.trustStatus)}
                alignRight
              />
            </div>
          )
        }
      </div>
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
