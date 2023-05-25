import React from 'react';
import Information from './Information';
import Beneficiary from './Beneficiary';
import Protector from './Protector';
import Portrait from '../Dashboard/Portrait';
import { useUserInfoQuery } from '../../../api/user/user';
import { CallFormat } from '../../../utils/CallFormat';

export default function Elements() {
  const userQuery = useUserInfoQuery();

  return (
    <div className="flex flex-col gap-6">
      <Portrait description={`Trust Property Independence established exclusively according to ${CallFormat(userQuery.data?.data?.surname, userQuery.data?.data?.gender, false)} wishes.`} />
      <Information />
      <Beneficiary />
      <Protector />
      {/* <div className="flex flex-row gap-6"> */}
      {/*  <div className="flex-1"><Beneficiary /></div> */}
      {/*  <div className="flex-1"><Protector /></div> */}
      {/* </div> */}
    </div>
  );
}
