import React from 'react';
import MethodSwitch from './MethodSwitch';
import TextField from '../../../components/TextField';
import Button from '../../../components/Button';
import Dropdown from '../../../components/Dropdown';

export default function AssetDeclaration() {
  return (
    <div className="flex flex-col">
      <div className="gradient-text1 font-blod text-[20px] font-title">Asset Transfer Information Declaration</div>
      <div className="mt-[40px] flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <div className="font-blod text-[#C2D7C7F6]">Please select a payment method</div>
          <MethodSwitch titles={['Digital currency', 'Fiat currency']} />
        </div>
        <div className="flex flex-col gap-3">
          <div className="font-blod text-[#C2D7C7F6]">Declaration information</div>
          <TextField requiredLabel label={"Payer's name"} />
          <div className="flex flex-row gap-4">
            <Dropdown title="BSC" />
            <Dropdown title="BSC" />
          </div>
          <TextField requiredLabel label="Payment amount" placeholder="Please enter the amount" />
          <TextField requiredLabel label="Expected transfer time" placeholder="Please enter the expected transfer time" />
          <TextField label={"Payer's address (optional)"} placeholder={"Please enter the payer's address"} />
          <TextField label="Transaction hash (optional)" placeholder="Please enter the transaction hash" />
        </div>
        <Button>Submit</Button>
      </div>
    </div>
  );
}
