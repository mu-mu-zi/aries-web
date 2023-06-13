import React, { useEffect } from 'react';
import { css } from '@emotion/react';
import { useAsync } from 'react-use';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CreatingTrust from './CreatingTrust';
import EnteringTrust from './EnteringTrust';
import { useMyTrustQuery } from '../../api/trust/trust';
import FooterNote from '../../views/FooterNote';
import { Trust } from '../../interfaces/trust';

export default function MyTrust() {
  const trustListQuery = useMyTrustQuery();
  const navigate = useNavigate();

  useAsync(async () => {
    const trustList = trustListQuery.data?.data ?? [];
    /* 无信托 */
    if (trustList.length === 1) {
      /* 进入引导 */
      if (trustList[0].trustStatus === 1) {
        navigate(`/first/${trustList[0].trustId}/KycVerify`);
      } else if (trustList[0].trustStatus === 21) {
        navigate(`/first/${trustList[0].trustId}/welcome`);
      }
    }
  }, [trustListQuery.data?.data]);

  return (
    <div>
      <div className="flex flex-auto flex-row justify-center">
        <div className="scrollbar-none flex flex-row gap-8 overflow-auto px-16 py-3">
          <CreatingTrust />
          {/* <CreatingTrust /> */}
          {/* <CreatingTrust /> */}
          {/* <CreatingTrust /> */}
          {trustListQuery.data?.data?.map((trust) => (
            <EnteringTrust key={trust.trustId} trust={trust} />
          ))}
        </div>
      </div>
      <FooterNote />
    </div>
  );
}
