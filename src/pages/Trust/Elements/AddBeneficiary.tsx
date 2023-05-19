import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { DevTool } from '@hookform/devtools';
import { useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import closeIcon from '../../../assets/icon/model_close.svg';
import TextInput from '../../../components/TextInput';
import Dropdown from '../../../components/Dropdown';
import Button from '../../../components/Button';
import Divide from '../../../components/Divide';
import ContactUs from '../../SignIn/ContactUs';
import ModalContainer from '../../../views/ModalContainer';
import ModalNav from '../../../views/ModalContainer/ModalNav';
import TextArea from '../../../components/TextArea';
import { AccountType } from '../../../interfaces/base';

enum UserType {
  Define = 2,
  NonSpecific = 3,
  Myself = 1
}

enum Gender {
  Male,
  Female
}

enum RoleType {
  No = 1,
  ReadOnly,
  Approval
}

export default function AddBeneficiary({ trustId, onClose }: {
  trustId: number,
  onClose?(): void
}) {
  const valid = z.object({
    userType: z.nativeEnum(UserType),
    accountType: z.nativeEnum(AccountType).optional(),
    surname: z.string().optional(),
    userName: z.string().optional(),
    gender: z.nativeEnum(Gender).optional(),
    remark: z.string().optional(),
    areaCodeId: z.number().optional(),
    userEmail: z.string().email().optional(),
    userMobile: z.string().optional(),
    roleType: z.nativeEnum(RoleType).optional(),
  });
  type FormValid = z.infer<typeof valid>;
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    trigger,
    getValues,
    control,
    watch,
  } = useForm<FormValid>({
    resolver: zodResolver(valid),
  });
  const userType = watch('userType');
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const submit = (data: FormValid) => {
    console.log(data);
    axios.post('/trust/trust/user/add', {
      trustId,
      guardiansType: data.userType === UserType.Myself ? 2 : undefined,
      ...data,
    }).then((resp) => {
      queryClient.invalidateQueries(['trust', 'elements']);
      onClose?.();
    });
  };

  return (
    <ModalContainer>
      <ModalNav
        title={t('Add Beneficiary')}
        onClose={onClose}
      />
      <form onSubmit={handleSubmit(submit)}>
        <div className="flex flex-col gap-4">
          {/* 类型 */}
          <div className="flex flex-col gap-4">
            <label className="text-[#C2D7C7F6] font-bold text-[16px]">{t('Beneficiary')}</label>
            <Controller
              render={({ field }) => {
                const enums = [
                  { value: UserType.Define, title: t('Define') },
                  { value: UserType.NonSpecific, title: t('NonSpecific') },
                  { value: UserType.Myself, title: t('Myself') },
                ];
                return (
                  <Dropdown
                    title={enums.find((x) => x.value === field.value)?.title}
                    items={enums.map((x) => x.title)}
                    onSelected={(idx) => field.onChange(enums[idx].value)}
                  />
                );
              }}
              name="userType"
              control={control}
            />
          </div>
          {/* 明确受益人显示收益人信息 */}
          {userType === UserType.Define && (
            <>
              <div className="flex flex-row gap-4">
                <div className="flex-1 flex flex-col gap-4">
                  <label className="text-[#C2D7C7F6] font-bold text-[16px]">{t('First Name')}</label>
                  <TextInput placeholder="" {...register('surname')} />
                </div>
                <div className="flex-1 flex flex-col gap-4">
                  <label className="text-[#C2D7C7F6] font-bold text-[16px]">{t('Last Name')}</label>
                  <TextInput placeholder="" {...register('userName')} />
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
                <label className="text-[#C2D7C7F6] font-bold text-[16px]">{t('Email')}</label>
                <TextInput placeholder="Please provide additional instructions" {...register('userEmail')} />
              </div>
              <div className="flex flex-col gap-4">
                <label className="text-[#C2D7C7F6] font-bold text-[16px]">{t('Permissions')}</label>
                <Controller
                  render={({ field }) => {
                    const enums = [
                      { value: RoleType.No, name: t('No') },
                      { value: RoleType.ReadOnly, name: t('Read Only') },
                      { value: RoleType.Approval, name: t('Approval') },
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
          {userType === UserType.NonSpecific && (
            <div className="flex flex-col gap-4">
              <label className="text-[#C2D7C7F6] font-bold text-[16px]">{t('Remark')}</label>
              <TextArea {...register('remark')} />
            </div>
          )}
          <div className="mt-4 self-center max-w-[420px] w-full">
            <Button block>{t('Submit')}</Button>
          </div>
          <DevTool control={control} />
          <div className="flex flex-col gap-5 mt-6">
            <Divide />
            <ContactUs />
          </div>
        </div>
      </form>
    </ModalContainer>
  );
}
