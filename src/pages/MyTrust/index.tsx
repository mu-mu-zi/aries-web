import React from 'react';
import CreatingTrust from './CreatingTrust';
import EnteringTrust from './EnteringTrust';
import { useMyTrustQuery } from '../../api/trust/trust';

export default function MyTrust() {
  const trustListQuery = useMyTrustQuery();

  return (
    <div className="flex-auto flex flex-row justify-center">
      <div className="flex flex-row overflow-auto gap-8 px-16">
        {trustListQuery.data?.data && trustListQuery.data.data.length > 0 ? (
          <>
            {trustListQuery.data.data.map((trust) => (
              <EnteringTrust
                key={trust.trustId}
                trust={trust}
              />
            ))}
          </>
        ) : <CreatingTrust />}
      </div>
    </div>
  );
}
