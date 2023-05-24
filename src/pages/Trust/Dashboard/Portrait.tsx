import React from 'react';
import classNames from 'classnames';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import borderImg from '../../../assets/icon/avatar_border.svg';
import GradientText from '../../../components/GradientText';
import { useUserInfoQuery } from '../../../api/user/user';
import LargeAvatar from '../../../components/LargeAvatar';
import { CallFormat } from '../../../utils/CallFormat';
import { useTrustDetailQuery } from '../../../api/trust/trust';

export default function Portrait() {
  const userQuery = useUserInfoQuery();
  const { t } = useTranslation();
  const { trustId } = useParams();
  const query = useTrustDetailQuery({ trustId: Number(trustId) });

  return (
    <div className="flex flex-row gap-8 items-center p-8">
      <LargeAvatar isMale={!userQuery.data?.data?.gender} />
      {/* 昵称描述 */}
      <div className="flex flex-col gap-4">
        <GradientText className={classNames('text-[40px] font-bold font-title')}>
          {CallFormat(userQuery.data?.data?.userName, userQuery.data?.data?.gender)}
        </GradientText>
        <GradientText
          className={classNames('text-[20px] font-normal leading-[23px]', 'font-title')}
        >
          <span className="font-bold">
            {query.data?.data?.trustName}
            &nbsp;
          </span>
          {t('has been exclusively established in accordance with your wishes to achieve the purpose of wealth inheritance and planning for your family.')}
        </GradientText>
      </div>
    </div>
  );
}
