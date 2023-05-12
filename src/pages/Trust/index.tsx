import React, { useEffect } from 'react';
import { Outlet, redirect, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function Trust() {
  const location = useLocation();

  return (
    <div className="flex flex-row h-full py-6 pl-6 gap-6 h-screen">
      <div className="w-[318px] flex-shrink-0"><Sidebar /></div>
      <div className="flex-auto overflow-y-auto pr-6"><Outlet /></div>
    </div>
  );
}
