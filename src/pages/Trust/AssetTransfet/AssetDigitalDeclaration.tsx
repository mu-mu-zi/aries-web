import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import TextField from '../../../components/TextField';
import Dropdown from '../../../components/Dropdown';
import Button from '../../../components/Button';

export default function AssetDigitalDeclaration() {
  const valid = z.object({
    name: z.string().nonempty(),
    chainId: z.number(),
    coinId: z.number(),
    amount: z.number().gt(0),
    expectedTime: z.string().nonempty(),
    address: z.string().optional(),
    hash: z.string().optional(),
  });
  type FormValid = z.infer<typeof valid>;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValid>({
    resolver: zodResolver(valid),
  });

  const submit = async (data: FormValid) => {
    try {
      await axios.post('/trust/assetDeclare/apply', {
        amount: data.amount,
        coinId: 0,
        estimateTime: data.expectedTime,
        payAddress: data.address,
        payType: 1,
        payUserName: data.name,
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <div className="flex flex-col gap-3">
        <div className="font-blod text-[#C2D7C7F6]">Declaration information</div>
        <TextField
          requiredLabel
          label={'Payer\'s name'}
          {...register('name')}
        />
        <Dropdown title="BSC" />
        <Dropdown title="USDT" />
        <TextField
          requiredLabel
          label="Payment amount"
          placeholder="Please enter the amount"
          {...register('amount')}
        />
        <TextField
          requiredLabel
          label="Expected transfer time"
          placeholder="Please enter the expected transfer time"
          {...register('expectedTime')}
        />
        <TextField
          label={'Payer\'s address (optional)'}
          placeholder={'Please enter the payer\'s address'}
          {...register('address')}
        />
        <TextField
          label="Transaction hash (optional)"
          placeholder="Please enter the transaction hash"
          {...register('hash')}
        />
        <div className="mt-4">
          <Button type="submit" block>Submit</Button>
        </div>
      </div>
    </form>
  );
}
