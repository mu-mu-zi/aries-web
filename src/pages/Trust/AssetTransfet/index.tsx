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
        description={intl.formatMessage({ defaultMessage: 'The Settlor can submit an application on this page to transfer entrusted assets into the trust. Please note that before proceeding with the asset transfer, please submit the entrusted declaration. Once verified by the Trustee, the entrusted assets will be transferred into the trust' })}
        logo={logo}
      />
      <EntrustedDeclaration />
      <DeclarationRecord />
    </div>
  );
}
