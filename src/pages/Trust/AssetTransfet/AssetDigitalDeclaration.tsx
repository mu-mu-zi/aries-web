import React, { useEffect, useState } from 'react';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useQueryClient } from '@tanstack/react-query';
import TextField from '../../../components/TextField';
import Dropdown from '../../../components/Dropdown';
import Button from '../../../components/Button';
import { useAllCoinInMainNetQuery, useAllMainNetsQuery } from '../../../api/trust/trust';
import { IMainNet } from '../../../interfaces/base';
import { addSuccessNotification } from '../../../utils/Notification';

export default function AssetDigitalDeclaration() {
  const { t } = useTranslation();
  const { trustId } = useParams();
  const mainNetListQuery = useAllMainNetsQuery();
  const [mainNet, setMainNet] = useState<IMainNet>();
  const mainNetCoinListQuery = useAllCoinInMainNetQuery({
    mainnetId: mainNet?.id,
  });
  const queryClient = useQueryClient();
  const valid = z.object({
    name: z.string().nonempty(),
    coinId: z.number(),
    amount: z.coerce.number().gt(0),
    expectedTime: z.string().nonempty(),
    address: z.string(),
    hash: z.string().optional(),
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

  useEffect(() => setMainNet(mainNetListQuery.data?.data?.[0]), [mainNetListQuery.data?.data]);
  useEffect(() => {
    const one = mainNetCoinListQuery.data?.data?.[0];
    if (one) {
      setValue('coinId', one.id);
    }
  }, [mainNetCoinListQuery.data?.data]);

  const submit = async (data: FormValid) => {
    try {
      await axios.post('/trust/assetDeclare/apply', {
        trustId: Number(trustId),
        estimateTime: data.expectedTime,
        payAddress: data.address,
        payType: 1,
        payUserName: data.name,
        remarks: data.remark,
        payNo: data.hash,
        ...data,
      });
      addSuccessNotification({
        title: '提交成功',
      });
      reset();
      await queryClient.invalidateQueries(['trust']);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <div className="flex flex-col gap-3">
        <div className="font-blod text-[#C2D7C7F6]">{t('Declaration information')}</div>
        <TextField
          requiredLabel
          label={t('Payer\'s name')}
          placeholder={t('Please enter the payer\'s name') ?? ''}
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
                onSelected={(idx) => field.onChange(mainNetCoinListQuery.data?.data?.[idx].id)}
              />
            )}
          />
        )}
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
          label={t('Payer\'s address')}
          placeholder={t('Please enter the payer\'s address') ?? ''}
          {...register('address')}
        />
        <TextField
          label={t('Transaction hash (optional)')}
          placeholder={t('Please enter the transaction hash') ?? ''}
          {...register('hash')}
        />
        <TextField
          label={t('Remark (optional)')}
          placeholder={t('Please enter the remark') ?? ''}
          {...register('remark')}
        />
        <div className="mt-4">
          <Button type="submit" block>{t('Submit')}</Button>
        </div>
      </div>
    </form>
  );
}
