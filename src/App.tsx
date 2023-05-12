import React from 'react';
import { Outlet } from 'react-router-dom';
import classNames from 'classnames';
import fullBgIcon from './assets/icon/full_bg.svg';

export default function App() {
  return (
    <div className={classNames('min-h-screen font-text gradient-bg1', 'relative')}>
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
