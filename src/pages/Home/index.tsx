import React from 'react';
import classNames from 'classnames';
import { Outlet } from 'react-router-dom';
import Navbar from '../../views/Navbar';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-auto flex flex-col">
        <Outlet />
      </div>
    </div>
  );
}
