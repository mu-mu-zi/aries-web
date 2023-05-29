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
    const trustResp = await axios.get<Trust[]>('/trust/trust/list');
    const trustList = trustResp.data ?? [];
    let navTo = '/';
    /* 无信托 */
    if (trustList.length === 1) {
      /* 进入引导 */
      if (trustList[0].trustStatus === 1) {
        navTo = `/first/${trustList[0].trustId}/KycVerify`;
      } else if (trustList[0].trustStatus === 21) {
        navTo = `/first/${trustList[0].trustId}/welcome`;
      } else if (trustList[0].trustStatus === 2) {
        navTo = '/my';
      }
    } else {
      navTo = '/my';
    }
    navigate(navTo);
  }, [trustListQuery.data?.data]);

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
