import React from 'react';
import Button from '../../../components/Button';
import Hr from '../../../components/Hr';

export default function AllocationPlan() {
  return (
    <div className="flex flex-col p-8 gradient-bg2 rounded-xl shadow-block">
      <div className="flex flex-row items-center justify-between">
        <div className="gradient-text1 text-[20px] font-title">Allocation plan</div>
        <Button size="medium">Add</Button>
      </div>
      <div className="mt-4"><Hr /></div>
    </div>
  );
}
