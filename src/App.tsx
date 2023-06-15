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
    <div className={classNames('gradient-bg1 min-h-screen font-text', 'relative', 'min-w-[1280px] transition')}>
      <ReactNotifications />
      <div
        className="absolute inset-0  z-[0] bg-cover bg-fixed bg-center bg-no-repeat"
        css={css`
          background-image: url(${fullBgIcon});
        `}
      />
      <div className="relative z-[1] min-h-screen"><AppRoutes /></div>
    </div>
  );
}
