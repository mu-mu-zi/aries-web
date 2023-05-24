import React, { ReactNode } from 'react';

export default function ModalContainer({ children }: {
    children: ReactNode
}) {
  return (
    <div className="bg-[#1A342F] rounded-xl p-8 max-w-[720px] w-full">
      {children}
    </div>
  );
}
