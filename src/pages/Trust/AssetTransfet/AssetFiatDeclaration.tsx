import React, { useEffect } from 'react';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useQueryClient } from '@tanstack/react-query';
import TextField from '../../../components/TextField';
import Button from '../../../components/Button';
import { useFiatListQuery } from '../../../api/trust/trust';
import Dropdown from '../../../components/Dropdown';
import { addSuccessNotification } from '../../../utils/Notification';

export default function AssetFiatDeclaration() {
  const { t } = useTranslation();
  const { trustId } = useParams();
  const fiatListQuery = useFiatListQuery();
  const valid = z.object({
    name: z.string().nonempty(),
    fiatId: z.number(),
    amount: z.coerce.number().gt(0),
    expectedTime: z.string().nonempty(),
    bank: z.string().nonempty(),
    bankCardNo: z.string().optional(),
    address: z.string().optional(),
    remark: z.string().optional(),
  });
  type FormValid = z.infer<typeof valid>;
  const {
    register,
    handleSubmit,
    control,
    resetField,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormValid>({
    resolver: zodResolver(valid),
  });
  const queryClient = useQueryClient();

  useEffect(() => {
    const one = fiatListQuery.data?.data?.[0];
    if (one) {
      setValue('fiatId', one.id);
    }
  }, [fiatListQuery.data?.data]);

  const submit = async (data: FormValid) => {
    await axios.post('/trust/assetDeclare/apply', {
      trustId: Number(trustId),
      payUserName: data.name,
      coinId: data.fiatId,
      estimateTime: data.expectedTime,
      payNo: data.bankCardNo,
      payType: 2,
      bankName: data.bank,
      payAddress: data.address,
      ...data,
    });
    addSuccessNotification({
      title: '提交成功',
    });
    reset();
    await queryClient.invalidateQueries(['trust']);
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <div className="flex flex-col gap-3">
        <div className="font-bold text-[#C2D7C7F6]">{t('Declaration information')}</div>
        <TextField
          requiredLabel
          label={'Payer\'s name'}
          placeholder={t('Please enter the payer\'s name') ?? ''}
          {...register('name')}
          maxLength={100}
        />
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
          maxLength={30}
        />
        <TextField
          requiredLabel
          label={t('payment Bank')}
          placeholder={t('Please enter the payment bank(English)') ?? ''}
          {...register('bank')}
          maxLength={60}
        />
        <TextField
          label={t('Bank card number (optional)')}
          placeholder={t('Please enter your payment card number') ?? ''}
          {...register('bankCardNo')}
          maxLength={60}
        />
        <TextField
          label={t('Payer\'s address (optional)')}
          placeholder={t('Please enter the payer\'s address') ?? ''}
          {...register('address')}
          maxLength={100}
        />
        <TextField
          label={t('Remark (optional)')}
          placeholder={t('Please enter the remark') ?? ''}
          maxLength={100}
          {...register('remark')}
        />
        <div className="mt-4">
          <Button type="submit" block>{t('Submit')}</Button>
        </div>
      </div>
    </form>
  );
}
