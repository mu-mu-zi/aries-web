import React, { useEffect, useState } from 'react';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FormattedMessage, useIntl } from 'react-intl';
import TextField from '../../../components/TextField';
import Dropdown from '../../../components/Dropdown';
import Button from '../../../components/Button';
import { useAllCoinInMainNetQuery, useAllMainNetsQuery, useTrustDetailQuery } from '../../../api/trust/trust';
import { IMainNet } from '../../../interfaces/base';
import { addSuccessNotification } from '../../../utils/Notification';
import useTrustPermission from '../../../hooks/useTrustRole';
import { useValidators } from '../../../utils/zod';
import { useAppDispatch, useAppSelector } from '../../../state';
import { setAssetTransferSelectedCoinId, setAssetTransferSelectedFiatId } from '../../../state/trust';

export default function AssetDigitalDeclaration() {
  // const { t } = useTranslation();
  const intl = useIntl();
  const lan = useAppSelector((state) => state.app.language);
  const { trustId } = useParams();
  const trustQuery = useTrustDetailQuery({ trustId: Number(trustId) });
  const { settlorPermission } = useTrustPermission({ trust: trustQuery.data?.data });
  const mainNetListQuery = useAllMainNetsQuery();
  const [mainNet, setMainNet] = useState<IMainNet>();
  const mainNetCoinListQuery = useAllCoinInMainNetQuery({
    mainnetId: mainNet?.id,
  });
  const queryClient = useQueryClient();
  const { zodPhone, zodEmail, zodRequired } = useValidators();
  const valid = z.object({
    name: zodRequired(),
    coinId: z.number(),
    amount: z.string().regex(/^[0-9]+.?[0-9]{0,8}$/, intl.formatMessage({ defaultMessage: 'Please enter a number with a maximum precision of 8.' })),
    expectedTime: zodRequired(),
    address: zodRequired(),
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
    clearErrors,
    watch,
  } = useForm<FormValid>({
    resolver: zodResolver(valid),
  });
  const action = useAppDispatch();
  const coinId = watch('coinId');

  /* 切换语言清除错误信息 */
  useEffect(() => clearErrors(), [lan]);

  /* 默认选择主网 */
  useEffect(() => setMainNet(mainNetListQuery.data?.data?.[0]), [mainNetListQuery.data?.data]);

  useEffect(() => {
    const one = mainNetCoinListQuery.data?.data?.[0];
    if (one) {
      setValue('coinId', one.id);
    }
  }, [mainNetCoinListQuery.data?.data]);

  useEffect(() => {
    action(setAssetTransferSelectedCoinId(coinId));
  }, [coinId]);

  const submitMutation = useMutation({
    mutationFn: async (data: FormValid) => {
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
    await submitMutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <div className="flex flex-col gap-3">
        <div className="font-bold text-[#C2D7C7F6]"><FormattedMessage defaultMessage="Declaration Information" /></div>
        <TextField
          requiredLabel
          label={intl.formatMessage({ defaultMessage: "Payer's Name" })}
          placeholder={intl.formatMessage({ defaultMessage: "Please enter the payer's name" })}
          maxLength={30}
          error={errors.name?.message}
          {...register('name')}
        />
        <div className="text-[#C2D7C7F6] font-bold"><FormattedMessage defaultMessage="Network" /></div>
        <Dropdown
          title={mainNet?.name}
          items={mainNetListQuery.data?.data?.map((x) => x.name)}
          onSelected={(idx) => {
            setMainNet(mainNetListQuery.data?.data?.[idx]);
            resetField('coinId');
          }}
        />
        {mainNet && (
          <>
            <div className="text-[#C2D7C7F6] font-bold"><FormattedMessage defaultMessage="Asset Classes" /></div>
            <Controller
              name="coinId"
              control={control}
              render={({ field }) => (
                <Dropdown
                  title={mainNetCoinListQuery.data?.data?.find((x) => x.id === field.value)?.name}
                  items={mainNetCoinListQuery.data?.data?.map((x) => x.name)}
                  onSelected={(idx) => {
                    field.onChange(mainNetCoinListQuery.data?.data?.[idx].id);
                  }}
                />
              )}
            />
          </>
        )}
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
          maxLength={30}
          {...register('expectedTime')}
          error={errors.expectedTime?.message}
        />
        <TextField
          requiredLabel
          label={intl.formatMessage({ defaultMessage: "Payer's Address" })}
          placeholder={intl.formatMessage({ defaultMessage: "Please enter the payer's address" })}
          maxLength={100}
          {...register('address')}
          error={errors.address?.message}
        />
        <TextField
          label={intl.formatMessage({ defaultMessage: 'Transaction Hash (if applicable)' })}
          placeholder={intl.formatMessage({ defaultMessage: 'Please enter the transaction hash' })}
          maxLength={66}
          {...register('hash')}
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
