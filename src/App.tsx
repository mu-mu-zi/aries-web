import React, { useEffect } from 'react';
import classNames from 'classnames';
import { ReactNotifications } from 'react-notifications-component';
import { useQueryClient } from '@tanstack/react-query';
import { css } from '@emotion/react';
import fullBgIcon from './assets/icon/full_bg.svg';
import useAuthToken from './hooks/useUserId';
import { useUserInfoQuery } from './api/user/user';
import AppRoutes from './AppRoutes';

export default function App() {
  return (
    <div className={classNames('min-h-screen font-text gradient-bg1', 'relative', 'min-w-[1280px] transition')}>
      <ReactNotifications />
      <div
        className="bg-cover bg-center bg-no-repeat absolute inset-0 z-[0] bg-fixed"
        css={css`
          background-image: url(${fullBgIcon});
        `}
      />
      <div className="relative z-[1] min-h-screen">
        <AppRoutes />
      </div>
    </div>
  );
}
