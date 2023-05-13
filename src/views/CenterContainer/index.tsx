import React, { ReactNode } from 'react';

export default function CenterContainer({ children }: {
  children: ReactNode;
}) {
  return (
    <div className="grid place-items-center py-[38px] px-8">
      <div className="flex flex-col max-w-[1200px] w-full min-h-[800px] gradient-bg2 overflow-clip rounded-xl">
        {children}
      </div>
    </div>
  );
}
