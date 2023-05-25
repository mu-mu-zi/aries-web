import React from 'react';
import { css } from '@emotion/react';
import CreatingTrust from './CreatingTrust';
import EnteringTrust from './EnteringTrust';
import { useMyTrustQuery } from '../../api/trust/trust';
import FooterNote from '../../views/FooterNote';

export default function MyTrust() {
  const trustListQuery = useMyTrustQuery();

  return (
    <div>
      <div className="flex-auto flex flex-row justify-center">
        <div
          className="flex flex-row overflow-auto gap-8 px-16 py-3"
          css={css`
            &::-webkit-scrollbar {
              display: none;
            }
          `}
        >
          <CreatingTrust />
          {trustListQuery.data?.data?.map((trust) => (
            <EnteringTrust
              key={trust.trustId}
              trust={trust}
            />
          ))}
        </div>
      </div>
      <FooterNote />
    </div>
  );
}
