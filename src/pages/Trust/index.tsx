import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function Trust() {
  return (
    <div className="flex flex-row h-full p-6 gap-6">
      <div className="w-[318px] flex-shrink-0"><Sidebar /></div>
      <div className="flex-auto overflow-y-auto"><Outlet /></div>
    </div>
  );
}
