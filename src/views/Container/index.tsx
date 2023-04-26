import React, { ReactNode } from 'react';

export default function Container({ children }: {
    children: ReactNode
}) {
  return (
    <div className="flex flex-col items-center justify-start py-8 px-4">
      <div className="max-w-[1200px] w-full">{children}</div>
    </div>
  );
}
