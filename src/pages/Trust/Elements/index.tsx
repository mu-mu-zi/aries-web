import React from 'react';
import { useIntl } from 'react-intl';
import Information from './Information';
import Beneficiary from './Beneficiary';
import Protector from './Protector';
import Portrait from '../Dashboard/Portrait';
import { useUserInfoQuery } from '../../../api/user/user';
import { CallFormat } from '../../../utils/CallFormat';

export default function Elements() {
  const userQuery = useUserInfoQuery();
  const intl = useIntl();

  return (
    <div className="flex flex-col gap-6">
      <Portrait
        description={intl.formatMessage({
          defaultMessage: 'Trust Property Independence established exclusively according to {call} wishes.',
        }, {
          call: CallFormat(userQuery.data?.data?.surname, userQuery.data?.data?.gender, false),
        })}
      />
      <Information />
      <Beneficiary />
      <Protector />
    </div>
  );
}
