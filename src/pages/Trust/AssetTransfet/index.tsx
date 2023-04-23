import React from 'react';
import Header from './Header';
import EntrustedDeclaration from './EntrustedDeclaration';

export default function AssetTransfet() {
  return (
    <div className="flex flex-col gap-6">
      <Header />
      <EntrustedDeclaration />
    </div>
  );
}
