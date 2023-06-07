import React, { useEffect } from 'react';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FormattedMessage, useIntl } from 'react-intl';
import TextField from '../../../components/TextField';
import Button from '../../../components/Button';
import { useFiatListQuery, useTrustDetailQuery } from '../../../api/trust/trust';
import Dropdown from '../../../components/Dropdown';
import { addSuccessNotification } from '../../../utils/Notification';
import useTrustPermission from '../../../hooks/useTrustRole';

export default function AssetFiatDeclaration() {
  // const { t } = useTranslation();
  const intl = useIntl();
  const { trustId } = useParams();
  const trustQuery = useTrustDetailQuery({ trustId: Number(trustId) });
  const { settlorPermission } = useTrustPermission({ trust: trustQuery.data?.data });
  const fiatListQuery = useFiatListQuery();
  const valid = z.object({
    name: z.string().nonempty(),
    fiatId: z.number(),
    amount: z.string().nonempty().regex(/^[0-9]*.?[0-9]{0,3}$/, intl.formatMessage({ defaultMessage: 'Please enter a number with a maximum precision of 3.' })),
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

  const submitMutation = useMutation({
    mutationFn: async (data: FormValid) => {
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
    },
    onSuccess: async () => {
      addSuccessNotification({
        title: intl.formatMessage({ defaultMessage: 'Submission successful.' }),
      });
      reset();
      await queryClient.invalidateQueries(['trust']);
    },
  });

  const submit = async (data: FormValid) => {
    submitMutation.mutate(data);
    // await axios.post('/trust/assetDeclare/apply', {
    //   trustId: Number(trustId),
    //   payUserName: data.name,
    //   coinId: data.fiatId,
    //   estimateTime: data.expectedTime,
    //   payNo: data.bankCardNo,
    //   payType: 2,
    //   bankName: data.bank,
    //   payAddress: data.address,
    //   ...data,
    // });
    // addSuccessNotification({
    //   title: '提交成功',
    // });
    // reset();
    // await queryClient.invalidateQueries(['trust']);
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <div className="flex flex-col gap-3">
        <div className="font-bold text-[#C2D7C7F6]"><FormattedMessage defaultMessage="Declaration information" /></div>
        <TextField
          requiredLabel
          label={intl.formatMessage({ defaultMessage: "Payer's name" })}
          placeholder={intl.formatMessage({ defaultMessage: "Please enter the payer's name" })}
          {...register('name')}
          maxLength={30}
          error={errors.name?.message}
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
          label={intl.formatMessage({ defaultMessage: 'Payment amount' })}
          placeholder={intl.formatMessage({ defaultMessage: 'Please enter the amount' })}
          {...register('amount')}
          error={errors.amount?.message}
        />
        <TextField
          requiredLabel
          label={intl.formatMessage({ defaultMessage: 'Expected transfer time' })}
          placeholder={intl.formatMessage({ defaultMessage: 'Please enter the expected transfer time' })}
          {...register('expectedTime')}
          maxLength={30}
          error={errors.expectedTime?.message}
        />
        <TextField
          requiredLabel
          label={intl.formatMessage({ defaultMessage: 'payment Bank' })}
          placeholder={intl.formatMessage({ defaultMessage: 'Please enter the payment bank(English)' })}
          {...register('bank')}
          maxLength={100}
          error={errors.bank?.message}
        />
        <TextField
          label={intl.formatMessage({ defaultMessage: 'Bank card number (optional)' })}
          placeholder={intl.formatMessage({ defaultMessage: 'Please enter your payment card number' })}
          {...register('bankCardNo')}
          maxLength={60}
        />
        <TextField
          label={intl.formatMessage({ defaultMessage: "Payer's address (optional)" })}
          placeholder={intl.formatMessage({ defaultMessage: "Please enter the payer's address" })}
          {...register('address')}
          maxLength={100}
        />
        <TextField
          label={intl.formatMessage({ defaultMessage: 'Remark (optional)' })}
          placeholder={intl.formatMessage({ defaultMessage: 'Please enter the remark' })}
          maxLength={100}
          {...register('remark')}
        />
        {settlorPermission && (
          <div className="mt-4">
            <Button type="submit" block disabled={submitMutation.isLoading}>
              <FormattedMessage defaultMessage="Submit" />
            </Button>
          </div>
        )}
      </div>
    </form>
  );
}
