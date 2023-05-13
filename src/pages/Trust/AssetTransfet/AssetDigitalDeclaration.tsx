import React, { useState } from 'react';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import TextField from '../../../components/TextField';
import Dropdown from '../../../components/Dropdown';
import Button from '../../../components/Button';
import { useAllCoinInMainNetQuery, useAllMainNetsQuery } from '../../../api/trust/trust';
import { IMainNet } from '../../../interfaces/base';

export default function AssetDigitalDeclaration() {
  const mainNetListQuery = useAllMainNetsQuery();
  const [mainNet, setMainNet] = useState<IMainNet>();
  const mainNetCoinListQuery = useAllCoinInMainNetQuery({
    mainnetId: mainNet?.id,
  });
  const valid = z.object({
    name: z.string().nonempty(),
    coinId: z.number(),
    amount: z.coerce.number().gt(0),
    expectedTime: z.string().nonempty(),
    address: z.string(),
    hash: z.string().optional(),
  });
  type FormValid = z.infer<typeof valid>;
  const {
    register,
    handleSubmit,
    control,
    resetField,
    formState: { errors },
  } = useForm<FormValid>({
    resolver: zodResolver(valid),
  });

  const submit = async (data: FormValid) => {
    /* todo: 固定 ID */
    try {
      await axios.post('/trust/assetDeclare/apply', {
        trustId: 15,
        amount: data.amount,
        coinId: data.coinId,
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
        <Dropdown
          title={mainNet?.name}
          items={mainNetListQuery.data?.data?.map((x) => x.name)}
          onSelected={(idx) => {
            setMainNet(mainNetListQuery.data?.data?.[idx]);
            resetField('coinId');
          }}
        />
        {mainNet && (
          <Controller
            name="coinId"
            control={control}
            render={({ field }) => (
              <Dropdown
                title={mainNetCoinListQuery.data?.data?.find((x) => x.id === field.value)?.symbol}
                items={mainNetCoinListQuery.data?.data?.map((x) => x.symbol)}
                onSelected={(idx) => {
                  field.onChange(mainNetCoinListQuery.data?.data?.[idx].id);
                }}
              />
            )}
          />
        )}
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
          label={'Payer\'s address'}
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
