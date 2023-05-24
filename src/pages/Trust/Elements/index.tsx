import React from 'react';
import Information from './Information';
import Beneficiary from './Beneficiary';
import Protector from './Protector';
import Portrait from '../Dashboard/Portrait';

export default function Elements() {
  return (
    <div className="flex flex-col gap-6">
      <Portrait />
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
