import React from 'react';
import { Outlet } from 'react-router-dom';
import classNames from 'classnames';
import fullBgIcon from './assets/icon/full_bg.svg';
import Navbar from './views/Navbar';

export default function App() {
  return (
    <div className={classNames('min-h-screen font-text gradient-bg1', 'relative')}>
      <div
        className="bg-cover bg-center bg-no-repeat h-full bg-fixed opacity-20 absolute top-0 left-0 right-0 bottom-0 z-[1]"
        style={{ backgroundImage: `url(${fullBgIcon})` }}
      />
      <div className="absolute top-0 left-0 right-0 bottom-0 z-[2]">
        <Outlet />
      </div>
    </div>
  );
}
