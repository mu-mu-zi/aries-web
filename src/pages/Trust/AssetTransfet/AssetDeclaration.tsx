import React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import MethodSwitch from './MethodSwitch';
import TextField from '../../../components/TextField';
import Button from '../../../components/Button';
import Dropdown from '../../../components/Dropdown';
import AssetDigitalDeclaration from './AssetDigitalDeclaration';
import AssetFiatDeclaration from './AssetFiatDeclaration';
import { useAllBankQuery } from '../../../api/assets/assets';
import Opening from './Opening';

export default function AssetDeclaration({ assetModeChange }: {
  assetModeChange?(isDigital: boolean): void
}) {
  const { t } = useTranslation();
  const [isDigital, setIsDigital] = React.useState(true);
  const { trustId } = useParams();
  const bankListQuery = useAllBankQuery({ trustId });

  return (
    <div className="flex flex-col">
      <div className="gradient-text1 font-bold text-[20px] font-title">{t('Asset Transfer Information Declaration')}</div>
      <div className="mt-[40px] flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <div className="font-bold text-[#C2D7C7F6]">{t('Please select a payment method')}</div>
          <MethodSwitch
            titles={['Digital currency', 'Fiat currency']}
            onSelected={(idx) => {
              setIsDigital(idx === 0);
              assetModeChange?.(idx === 0);
            }}
          />
        </div>
        {/* eslint-disable-next-line no-nested-ternary */}
        {isDigital ? <AssetDigitalDeclaration /> : (bankListQuery.data?.data?.length === 0 ? <Opening /> : <AssetFiatDeclaration />)}
      </div>
    </div>
  );
}
