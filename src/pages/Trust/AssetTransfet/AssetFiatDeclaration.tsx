import React from 'react';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import TextField from '../../../components/TextField';
import Button from '../../../components/Button';
import { useFiatListQuery } from '../../../api/trust/trust';
import Dropdown from '../../../components/Dropdown';

export default function AssetFiatDeclaration() {
  const { t } = useTranslation();
  const { trustId } = useParams();
  const fiatListQuery = useFiatListQuery();
  const valid = z.object({
    name: z.string().nonempty(),
    fiatId: z.number(),
    amount: z.coerce.number().gt(0),
    expectedTime: z.string().nonempty(),
    bank: z.string(),
    bankCardNo: z.string().optional(),
    address: z.string().optional(),
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
    await axios.post('/trust/assetDeclare/apply', {
      trustId: Number(trustId),
      payUserName: data.name,
      amount: data.amount,
      coinId: data.fiatId,
      estimateTime: data.expectedTime,
      payNo: data.bankCardNo,
      payType: 2,
      bankName: data.bank,
      payAddress: data.address,
    });
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <div className="flex flex-col gap-3">
        <div className="font-blod text-[#C2D7C7F6]">{t('Declaration information')}</div>
        <TextField requiredLabel label={'Payer\'s name'} {...register('name')} />
        <Controller
          name="fiatId"
          control={control}
          render={({ field }) => (
            <Dropdown
              title={fiatListQuery.data?.data?.find((x) => x.id === field.value)?.symbol}
              items={fiatListQuery.data?.data?.map((x) => x.symbol)}
              onSelected={(idx) => {
                field.onChange(fiatListQuery.data?.data?.[idx].id);
              }}
            />
          )}
        />
        <TextField
          requiredLabel
          label={t('Payment amount')}
          placeholder={t('Please enter the amount') ?? ''}
          {...register('amount')}
        />
        <TextField
          requiredLabel
          label={t('Expected transfer time')}
          placeholder={t('Please enter the expected transfer time') ?? ''}
          {...register('expectedTime')}
        />
        <TextField
          requiredLabel
          label={t('payment Bank')}
          placeholder={t('Please enter the payment bank(English)') ?? ''}
          {...register('bank')}
        />
        <TextField
          label={t('Bank card number (optional)')}
          placeholder={t('Please enter your payment card number') ?? ''}
          {...register('bank')}
        />
        <TextField
          label={t('Payer\'s address (optional)')}
          placeholder={t('Please enter the payer\'s address') ?? ''}
          {...register('address')}
        />
        <div className="mt-4">
          <Button type="submit" block>{t('Submit')}</Button>
        </div>
      </div>
    </form>
  );
}
