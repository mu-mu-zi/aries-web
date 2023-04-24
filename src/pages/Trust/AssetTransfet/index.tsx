import React from 'react';
import Header from './Header';
import EntrustedDeclaration from './EntrustedDeclaration';
import DeclarationRecord from './DeclarationRecord';

export default function AssetTransfet() {
  return (
    <div className="flex flex-col gap-6">
      <Header />
      <EntrustedDeclaration />
      <DeclarationRecord />
    </div>
  );
}
