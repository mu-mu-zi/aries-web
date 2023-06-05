import React, { useEffect, useState } from 'react';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Await } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import closeIcon from '../../../assets/icon/model_close.svg';
import Dropdown from '../../../components/Dropdown';
import TextInput from '../../../components/TextInput';
import Button from '../../../components/Button';
import Divide from '../../../components/Divide';
import ContactUs from '../../SignIn/ContactUs';
import ModalContainer from '../../../views/ModalContainer';
import ModalNav from '../../../views/ModalContainer/ModalNav';
import { AccountType, Gender } from '../../../interfaces/base';
import FooterNote from '../../../views/FooterNote';
import ContactUsFooter from '../../../views/ContactUsFooter';
import AreaSelect from '../../../components/AreaSelect';
import { BeneficiaryRoleType } from './AddBeneficiary';
import GoogleVerify from '../../../views/GoogleVerify';
import Modal from '../../../components/Modal';
// import { useAreaCodeListQuery } from '../../../api/base/areaCode';

enum UserType {
  Protect = 4,
  Succession,
  SecondSuccession
}

enum GuardiansType {
  Other = 1,
  Self
}

export enum ProtectorRoleType {
  No = 1,
  ReadOnly,
  Approval
}

export default function AddProtector({ trustId, onClose }: {
  trustId: number,
  onClose?(): void
}) {
  const valid = z.object({
    userType: z.nativeEnum(UserType),
    guardiansType: z.nativeEnum(GuardiansType).optional(),
    surname: z.string().optional(),
    userName: z.string().optional(),
    gender: z.nativeEnum(Gender).optional(),
    areaCodeId: z.number().optional(),
    userEmail: z.string().optional(),
    userMobile: z.string().optional(),
    account: z.string().optional(),
    roleType: z.nativeEnum(ProtectorRoleType).optional(),
    accountType: z.nativeEnum(AccountType).optional(),
  });
  type FormValid = z.infer<typeof valid>;
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    trigger,
    getValues,
    setValue,
    control,
    watch,
  } = useForm<FormValid>({
    resolver: zodResolver(valid),
    defaultValues: {
      userType: UserType.Protect,
      guardiansType: GuardiansType.Other,
      accountType: AccountType.Email,
      gender: Gender.Male,
      roleType: ProtectorRoleType.ReadOnly,
    },
  });
  const guardiansType = watch('guardiansType');
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const accountType = watch('accountType');
  const [googleVerifyVisible, setGoogleVerifyVisible] = useState(false);
  const [formData, setFormData] = useState<FormValid>();
  // const areaCodeListQuery = useAreaCodeListQuery();

  const submitMutation = useMutation({
    mutationFn: (data: FormValid & {
      ticker: string
    }) => axios.post('/trust/trust/user/add', {
      trustId,
      ...data,
      userEmail: data.accountType === AccountType.Email ? data.account : undefined,
      userMobile: data.accountType === AccountType.Mobile ? data.account : undefined,
    }),
    onSuccess: async () => {
      onClose?.();
      await queryClient.invalidateQueries(['trust']);
    },
  });

  const submit = async (data: FormValid) => {
    setFormData(data);
    setGoogleVerifyVisible(true);
    // axios.post('/trust/trust/user/add', {
    //   trustId,
    //   ...data,
    //   userEmail: data.accountType === AccountType.Email ? data.account : undefined,
    //   userMobile: data.accountType === AccountType.Mobile ? data.account : undefined,
    // }).then((resp) => {
    //   onClose?.();
    //   queryClient.invalidateQueries(['trust']);
    // });
  };

  // useEffect(() => {
  //   setValue('areaCodeId', areaCodeListQuery.data?.data?.[0].id);
  // }, [areaCodeListQuery.data?.data]);

  return (
    <ModalContainer>
      <ModalNav title={t('Add Protector')} onClose={onClose} />
      <form onSubmit={handleSubmit(submit)}>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <label className="text-[#C2D7C7F6] font-bold text-[16px]">{t('Identity Category')}</label>
            <Controller
              render={({ field }) => {
                const enums = [
                  { value: UserType.Protect, name: t('Protector') },
                  { value: UserType.Succession, name: t('Regent protector') },
                  { value: UserType.SecondSuccession, name: t('The Second Successor Protector') },
                ];
                return (
                  <Dropdown
                    title={enums.find((x) => x.value === field.value)?.name}
                    items={enums.map((x) => x.name)}
                    onSelected={(idx) => field.onChange(enums[idx].value)}
                  />
                );
              }}
              name="userType"
              control={control}
            />
          </div>
          <div className="flex flex-col gap-4">
            <label className="text-[#C2D7C7F6] font-bold text-[16px]">{t('Protector')}</label>
            {/* <TextInput placeholder="Please provide additional instructions" /> */}
            <Controller
              render={({ field }) => {
                const enums = [
                  { value: GuardiansType.Other, name: t('Other') },
                  { value: GuardiansType.Self, name: t('Self') },
                ];
                return (
                  <Dropdown
                    title={enums.find((x) => x.value === field.value)?.name}
                    items={enums.map((x) => x.name)}
                    onSelected={(idx) => field.onChange(enums[idx].value)}
                  />
                );
              }}
              name="guardiansType"
              control={control}
            />
          </div>
          {guardiansType === GuardiansType.Other && (
            <>
              <div className="flex flex-row gap-4">
                <div className="flex-1 flex flex-col gap-4">
                  <label className="text-[#C2D7C7F6] font-bold text-[16px]">{t('First Name')}</label>
                  <TextInput placeholder="" {...register('userName')} />
                </div>
                <div className="flex-1 flex flex-col gap-4">
                  <label className="text-[#C2D7C7F6] font-bold text-[16px]">{t('Last Name')}</label>
                  <TextInput placeholder="" {...register('surname')} />
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <label className="text-[#C2D7C7F6] font-bold text-[16px]">{t('Gender')}</label>
                <Controller
                  render={({ field }) => {
                    const enums = [
                      { value: Gender.Male, name: t('Male') },
                      { value: Gender.Female, name: t('Female') },
                    ];
                    return (
                      <Dropdown
                        title={enums.find((x) => x.value === field.value)?.name}
                        items={enums.map((x) => x.name)}
                        onSelected={(idx) => field.onChange(enums[idx].value)}
                      />
                    );
                  }}
                  name="gender"
                  control={control}
                />
              </div>
              <div className="flex flex-col gap-4">
                <label className="text-[#C2D7C7F6] font-bold text-[16px]">{t('Account Type')}</label>
                <Controller
                  render={({ field }) => {
                    const enums = [
                      { value: AccountType.Email, name: t('Email') },
                      { value: AccountType.Mobile, name: t('Mobile') },
                    ];
                    return (
                      <Dropdown
                        title={enums.find((x) => x.value === field.value)?.name}
                        items={enums.map((x) => x.name)}
                        onSelected={(idx) => field.onChange(enums[idx].value)}
                      />
                    );
                  }}
                  name="accountType"
                  control={control}
                />
              </div>
              <div className="flex flex-col gap-4">
                <label className="text-[#C2D7C7F6] font-bold text-[16px]">{accountType === AccountType.Email ? t('Email') : t('Mobile')}</label>
                <div className="flex gap-4 items-center">
                  {accountType === AccountType.Mobile && (
                    <Controller
                      render={({ field }) => (
                        <AreaSelect defaultId={field.value} onSelected={(e) => field.onChange(e.id)} />
                      )}
                      name="areaCodeId"
                      control={control}
                    />
                    // <div className="w-[160px]">
                    //   <Controller
                    //     render={({ field }) => (
                    //       <Dropdown
                    //         block
                    //         items={areaCodeListQuery.data?.data?.map((x) => `+${x.code}`) ?? []}
                    //         title={`+${areaCodeListQuery.data?.data?.find((x) => x.id === field.value)?.code}` ?? ''}
                    //         onSelected={(idx) => field.onChange(areaCodeListQuery.data?.data?.[idx].id)}
                    //       />
                    //     )}
                    //     name="areaCodeId"
                    //     control={control}
                    //   />
                    // </div>
                  )}
                  <div className="flex-auto">
                    <TextInput placeholder={accountType === AccountType.Email ? 'Please enter the email' : 'Please enter the mobile'} {...register('account')} />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <label className="text-[#C2D7C7F6] font-bold text-[16px]">{t('Permissions')}</label>
                <Controller
                  render={({ field }) => {
                    const enums = [
                      // { value: RoleType.No, name: t('No') },
                      { value: ProtectorRoleType.ReadOnly, name: t('Read Only') },
                      { value: ProtectorRoleType.Approval, name: t('Approval') },
                    ];
                    return (
                      <Dropdown
                        title={enums.find((x) => x.value === field.value)?.name}
                        items={enums.map((x) => x.name)}
                        onSelected={(idx) => field.onChange(enums[idx].value)}
                      />
                    );
                  }}
                  name="roleType"
                  control={control}
                />
              </div>
            </>
          )}
          <div className="mt-4 self-center max-w-[420px] w-full">
            <Button block>{t('Submit')}</Button>
          </div>
          <div className="flex flex-col gap-5 mt-6">
            {/* <Divide /> */}
            {/* <ContactUs /> */}
            <ContactUsFooter />
          </div>
        </div>
      </form>
      <Modal visible={googleVerifyVisible} onClose={() => setGoogleVerifyVisible(false)}>
        {formData && (
          <GoogleVerify
            onClose={() => setGoogleVerifyVisible(false)}
            onEnter={(ticket) => {
              setGoogleVerifyVisible(false);
              submitMutation.mutate({
                ...formData,
                ticker: ticket,
              });
            }}
          />
        )}
      </Modal>
    </ModalContainer>
  );
}
