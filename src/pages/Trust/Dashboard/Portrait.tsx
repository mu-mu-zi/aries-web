import React from 'react';
import classNames from 'classnames';
import { useQuery } from '@tanstack/react-query';
import borderImg from '../../../assets/icon/avatar_border.svg';
import GradientText from '../../../components/GradientText';
import { useUserInfoQuery } from '../../../api/user/user';
import LargeAvatar from '../../../components/LargeAvatar';

export default function Portrait() {
  const userQuery = useUserInfoQuery();

  return (
    <div className="flex flex-row gap-8 items-center p-8">
      <LargeAvatar isMale={userQuery.data?.data?.gentr} />
      {/* 昵称描述 */}
      <div className="flex flex-col gap-4">
        {/* todo：缺少 Dear 前缀 */}
        <GradientText className={classNames('text-[40px] font-bold')}>
          Dear Mr. Lin
        </GradientText>
        {/* todo：描述 */}
        <GradientText
          className={classNames('text-[20px] font-normal times leading-[23px]', 'font-title')}
        >
          [Growth Family Trust] has been exclusively established in accordance with your wishes to achieve the purpose
          of wealth inheritance and planning for your family.
        </GradientText>
      </div>
    </div>
  );
}
