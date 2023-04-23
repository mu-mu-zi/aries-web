import React, { ReactNode } from 'react';

export default function CenterContainer({ children }: {
  children: ReactNode;
}) {
  return (
    <div className="max-w-[1200px] w-full min-h-[800px] gradient-bg2 overflow-clip rounded-xl mt-[38px]">
      {children}
    </div>
  );
}
