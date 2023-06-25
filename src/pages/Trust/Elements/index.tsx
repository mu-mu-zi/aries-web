import React from 'react';
import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';
import Information from './Information';
import Beneficiary from './Beneficiary';
import Protector from './Protector';
import Portrait from '../Dashboard/Portrait';
import { useUserInfoQuery } from '../../../api/user/user';
import { CallFormat } from '../../../utils/CallFormat';
import { useTrustDetailQuery } from '../../../api/trust/trust';

export default function Elements() {
  const { trustId } = useParams();
  const trustQuery = useTrustDetailQuery({ trustId: Number(trustId) });
  const userQuery = useUserInfoQuery();
  const intl = useIntl();

  return (
    <div className="flex flex-col gap-6">
      {/* <Portrait */}
      {/*  description={intl.formatMessage({ */}
      {/*    defaultMessage: 'Trust Property Independence established exclusively according to {call} wishes.', */}
      {/*  }, { */}
      {/*    call: CallFormat(trustQuery.data?.data?.surname, trustQuery.data?.data?.gender, false), */}
      {/*  })} */}
      {/* /> */}
      <Portrait
        description={intl.formatMessage({
          defaultMessage:
            "The Settlor can view trust information and designate beneficiaries for the trust here. If the Beneficiary's identity is clear, it is necessary to complete the Beneficiary's identity verification process before proceeding",
        })}
      />
      <Information />
      <Beneficiary />
      <Protector />
    </div>
  );
}
