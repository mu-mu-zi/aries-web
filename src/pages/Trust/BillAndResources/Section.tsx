import React, { ReactNode } from 'react';
import Hr from '../../../components/Hr';

export default function Section({ children }: {
  children: ReactNode
}) {
  return (
    <div className="flex flex-col rounded-xl gradient-bg2 gap-4 p-8 shadow-block">
      {children}
    </div>
  );
}

export function SectionTitle({ title }: {title: string | ReactNode}) {
  return <div className="gradient-text1 font-title font-bold text-[20px]">{title}</div>;
}
