import React, { ReactNode } from 'react';

export default function ModalTitle({ children }: {
    children: ReactNode
}) {
  return (
    <div className="gradient-text1 font-bold font-title text-[32px]">{children}</div>
  );
}
