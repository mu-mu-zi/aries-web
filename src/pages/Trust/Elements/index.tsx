import React from 'react';
import Information from './Information';
import Beneficiary from './Beneficiary';
import Protector from './Protector';

export default function Elements() {
  return (
    <div className="flex flex-col gap-6">
      <Information />
      <div className="flex flex-row gap-6">
        <div className="flex-1"><Beneficiary /></div>
        <div className="flex-1"><Protector /></div>
      </div>
    </div>
  );
}
