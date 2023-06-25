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
        description={intl.formatMessage({ defaultMessage: 'To transfer additional assets into the trust, please follow the asset declaration process on this page' })}
        logo={logo}
      />
      <EntrustedDeclaration />
      <DeclarationRecord />
    </div>
  );
}
