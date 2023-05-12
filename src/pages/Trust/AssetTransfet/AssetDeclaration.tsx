import React from 'react';
import MethodSwitch from './MethodSwitch';
import TextField from '../../../components/TextField';
import Button from '../../../components/Button';
import Dropdown from '../../../components/Dropdown';
import AssetDigitalDeclaration from './AssetDigitalDeclaration';

export default function AssetDeclaration() {
  const [isDigital, setIsDigital] = React.useState(true);

  return (
    <div className="flex flex-col">
      <div className="gradient-text1 font-blod text-[20px] font-title">Asset Transfer Information Declaration</div>
      <div className="mt-[40px] flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <div className="font-blod text-[#C2D7C7F6]">Please select a payment method</div>
          <MethodSwitch titles={['Digital currency', 'Fiat currency']} onSelected={(idx) => setIsDigital(idx === 0)} />
        </div>
        {isDigital ? <AssetDigitalDeclaration /> : <AssetDigitalDeclaration />}
      </div>
    </div>
  );
}
