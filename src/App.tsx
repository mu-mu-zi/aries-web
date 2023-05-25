import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import classNames from 'classnames';
import { EventSourcePolyfill } from 'event-source-polyfill';
import { ReactNotifications } from 'react-notifications-component';
import { useQueryClient } from '@tanstack/react-query';
import fullBgIcon from './assets/icon/full_bg.svg';
import useUserId from './hooks/useUserId';
import Button from './components/Button';
import { useUserInfoQuery } from './api/user/user';

export default function App() {
  const userQuery = useUserInfoQuery();
  const queryClient = useQueryClient();

  return (
    <div className={classNames('min-h-screen font-text gradient-bg1', 'relative', 'min-w-[1280px] transition')}>
      <ReactNotifications />
      {/* <Button onClick={() => queryClient.invalidateQueries()}>Re</Button> */}
      <div
        className="bg-cover bg-center bg-no-repeat opacity-20 absolute inset-0 z-[1]"
        style={{ backgroundImage: `url(${fullBgIcon})` }}
      />
      <div className="relative z-[2]">
        <Outlet />
      </div>
    </div>
  );
}
