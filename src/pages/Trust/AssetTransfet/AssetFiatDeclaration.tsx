import React from 'react';
import TextField from '../../../components/TextField';
import Button from '../../../components/Button';

export default function AssetFiatDeclaration() {
  <form>
    <div className="flex flex-col gap-3">
      <div className="font-blod text-[#C2D7C7F6]">Declaration information</div>
      <TextField requiredLabel label={'Payer\'s name'} />
      <TextField requiredLabel label="Currency" placeholder="Please enter the currency" />
      <TextField requiredLabel label="Payment amount" placeholder="Please enter the amount" />
      <TextField requiredLabel label="Expected transfer time" placeholder="Please enter the expected transfer time" />
      <TextField label={'Payer\'s address (optional)'} placeholder={'Please enter the payer\'s address'} />
      <TextField label="Transaction hash (optional)" placeholder="Please enter the transaction hash" />
      <div className="mt-4">
        <Button type="submit" block>Submit</Button>
      </div>
    </div>
  </form>;
}
