import React from 'react';
import Header from './Header';
import AllocationPlan from './AllocationPlan';
import AllocationRecord from './AllocationRecord';

export default function Distribution() {
  return (
    <div className="flex flex-col pt-4 gap-6">
      <Header />
      <AllocationPlan />
      <AllocationRecord />
    </div>
  );
}
