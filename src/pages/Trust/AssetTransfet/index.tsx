import React from 'react';
import Header from './Header';
import EntrustedDeclaration from './EntrustedDeclaration';
import DeclarationRecord from './DeclarationRecord';
import TrustHeader from '../TrustHeader';
import logo from '../../../assets/icon/trust_assets_logo.png';

export default function AssetTransfet() {
  return (
    <div className="flex flex-col gap-6">
      {/* <Header /> */}
      <TrustHeader
        title="Asset Transfer"
        description="The principal can transfer entrusted assets to the trust through here. Prior to the transfer, an
          application for transfer must be submitted. Upon verification by the trustee, confirmation will be
          given that the entrusted assets have been transferred to the trust."
        logo={logo}
      />
      <EntrustedDeclaration />
      <DeclarationRecord />
    </div>
  );
}
