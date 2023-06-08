import { ReactNode } from 'react';

export default function TrustContainer({ children }: {
  children: ReactNode
}) {
  return (
    <div className="gradient-border-container shadow-block">
      {children}
    </div>
  );
}
