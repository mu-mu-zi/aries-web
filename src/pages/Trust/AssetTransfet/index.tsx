import React from 'react';
import { useIntl } from 'react-intl';
import EntrustedDeclaration from './EntrustedDeclaration';
import DeclarationRecord from './DeclarationRecord';
import TrustHeader from '../TrustHeader';
import logo from '../../../assets/icon/trust_assets_logo.png';

export default function AssetTransfet() {
  const intl = useIntl();

  return (
    <div className="flex flex-col gap-6">
      {/* <Header /> */}
      <TrustHeader
        title={intl.formatMessage({ defaultMessage: 'Asset Transfer' })}
        description={intl.formatMessage({ defaultMessage: 'The principal can transfer entrusted assets to the trust through here. Prior to the transfer, an application for transfer must be submitted. Upon verification by the trustee, confirmation will be given that the entrusted assets have been transferred to the trust.' })}
        logo={logo}
      />
      <EntrustedDeclaration />
      <DeclarationRecord />
    </div>
  );
}
