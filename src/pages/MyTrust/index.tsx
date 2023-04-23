import React from 'react';
import CreatingTrust from './CreatingTrust';
import EnteringTrust from './EnteringTrust';

export default function MyTrust() {
  return (
    <div className="flex flex-row items-center justify-center h-full gap-8">
      <CreatingTrust />
      <EnteringTrust />
    </div>
  );
}
