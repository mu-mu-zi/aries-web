import React, { useEffect, useState } from 'react';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FormattedMessage, useIntl } from 'react-intl';
import TextField from '../../../components/TextField';
import Button from '../../../components/Button';
import { useFiatCoinsQuery, useFiatListQuery, useTrustDetailQuery } from '../../../api/trust/trust';
import Dropdown from '../../../components/Dropdown';
import { addSuccessNotification } from '../../../utils/Notification';
import useTrustPermission from '../../../hooks/useTrustRole';
import { useValidators } from '../../../utils/zod';
import { useAppDispatch, useAppSelector } from '../../../state';
import { setAssetTransferSelectedFiatId, setAssetTransferselectedFiatBankId } from '../../../state/trust';
import { useAllBankQuery } from '../../../api/assets/assets';
import { IBank } from '../../../interfaces/asset';

export default function AssetFiatDeclaration() {
  // const { t } = useTranslation();
  const intl = useIntl();
  const { trustId } = useParams();
  const action = useAppDispatch();
  const trustQuery = useTrustDetailQuery({ trustId: Number(trustId) });
  const { settlorPermission } = useTrustPermission({ trust: trustQuery.data?.data });
  const [bank, setBank] = useState<IBank>();
  const fiatListQuery = useFiatCoinsQuery({ bankId: Number(bank?.id) });
  // const fiatListQuery = useFiatListQuery({ trustId: Number(trustId) });
  const bankFiatId = useAppSelector((state) => state.trust.assetTransfer.selectedFiatId);
  console.log('bankFiatId', bankFiatId);
  const bankListQuery = useAllBankQuery({
    trustId,
  });

  const { zodRequired } = useValidators();
  const valid = z.object({
    name: zodRequired(),
    fiatId: z.number(),
    amount: z.string().regex(/^[0-9]+.?[0-9]{0,3}$/, intl.formatMessage({ defaultMessage: 'Please enter a number with a maximum precision of 3.' })),
    expectedTime: zodRequired(),
    bank: zodRequired(),
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
    clearErrors,
    watch,
    formState: { errors },
  } = useForm<FormValid>({
    resolver: zodResolver(valid),
  });
  const queryClient = useQueryClient();
  const lan = useAppSelector((state) => state.app.language);

  const faitId = watch('fiatId');
  useEffect(() => {
    action(setAssetTransferSelectedFiatId(faitId));
  }, [faitId]);

  useEffect(() => setBank(bankListQuery.data?.data?.[0]), [bankListQuery.data?.data]);
  useEffect(() => clearErrors(), [lan]);

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
          label={intl.formatMessage({ defaultMessage: "Payer's Name" })}
          placeholder={intl.formatMessage({ defaultMessage: "Please enter the payer's name" })}
          {...register('name')}
          maxLength={30}
          error={errors.name?.message}
        />

        <div className="text-[#C2D7C7F6] font-bold text-[16px]">
          <FormattedMessage defaultMessage="Please select the receiving bank" />
        </div>
        <Dropdown
          title={bank?.bankName}
          items={bankListQuery.data?.data?.map((x) => x.bankName)}
          onSelected={(idx) => {
            console.log('aaaaaaa1', idx);
            setBank(bankListQuery.data?.data?.[idx]);
            action(setAssetTransferselectedFiatBankId(idx));
          }}
        />

        <div className="text-[#C2D7C7F6] font-bold"><FormattedMessage defaultMessage="Currencies" /></div>
        <Controller
          name="fiatId"
          control={control}
          render={({ field }) => (
            <Dropdown
              title={fiatListQuery.data?.data?.find((x) => x.id === field.value)?.symbol}
              items={fiatListQuery.data?.data?.map((x) => x.symbol)}
              onSelected={(idx) => field.onChange(fiatListQuery.data?.data?.[idx].id)}
            />
          )}
        />
        <TextField
          requiredLabel
          label={intl.formatMessage({ defaultMessage: 'Entrusted Amount' })}
          placeholder={intl.formatMessage({ defaultMessage: 'Please enter the amount' })}
          {...register('amount')}
          error={errors.amount?.message}
        />
        <TextField
          requiredLabel
          label={intl.formatMessage({ defaultMessage: 'Expected Transfer Time' })}
          placeholder={intl.formatMessage({ defaultMessage: 'Please enter the expected transfer time' })}
          {...register('expectedTime')}
          maxLength={30}
          error={errors.expectedTime?.message}
        />
        <TextField
          requiredLabel
          label={intl.formatMessage({ defaultMessage: 'Payment Bank' })}
          placeholder={intl.formatMessage({ defaultMessage: 'Please enter the payment bank(English)' })}
          {...register('bank')}
          maxLength={100}
          error={errors.bank?.message}
        />
        <TextField
          label={intl.formatMessage({ defaultMessage: 'Payment Bank Account' })}
          placeholder={intl.formatMessage({ defaultMessage: 'Please enter your payment card number' })}
          {...register('bankCardNo')}
          maxLength={60}
        />
        <TextField
          label={intl.formatMessage({ defaultMessage: "Payer's Address (Optional)" })}
          placeholder={intl.formatMessage({ defaultMessage: "Please enter the payer's address" })}
          {...register('address')}
          maxLength={100}
        />
        <TextField
          label={intl.formatMessage({ defaultMessage: 'Remarks' })}
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
