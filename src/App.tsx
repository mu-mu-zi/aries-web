import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import classNames from 'classnames';
import { EventSourcePolyfill } from 'event-source-polyfill';
import fullBgIcon from './assets/icon/full_bg.svg';
import useUserId from './hooks/useUserId';

export default function App() {
  return (
    <div className={classNames('min-h-screen font-text gradient-bg1', 'relative', 'min-w-[1200px]')}>
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
