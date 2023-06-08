import React, { ReactNode } from 'react';
import Hr from '../../../components/Hr';
import TrustContainer from '../TrustContainer';

export default function Section({ children }: {
  children: ReactNode
}) {
  return (
    <TrustContainer>
      <div className="flex flex-col rounded-xl gradient-bg2 gap-4 p-8">
        {children}
      </div>
    </TrustContainer>
  );
}

export function SectionTitle({ title }: {title: string | ReactNode}) {
  return <div className="gradient-text1 font-title font-bold text-[20px]">{title}</div>;
}
