import React from 'react';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Await } from 'react-router-dom';
import closeIcon from '../../../assets/icon/model_close.svg';
import Dropdown from '../../../components/Dropdown';
import TextInput from '../../../components/TextInput';
import Button from '../../../components/Button';
import Divide from '../../../components/Divide';
import ContactUs from '../../SignIn/ContactUs';
import ModalContainer from '../../../views/ModalContainer';
import ModalNav from '../../../views/ModalContainer/ModalNav';
import { AccountType, Gender } from '../../../interfaces/base';

enum UserType {
  Protect = 4,
  Succession,
  SecondSuccession
}

enum GuardiansType {
  Other = 1,
  Self
}

enum RoleType {
  No = 1,
  ReadOnly,
  Approval
}

export default function AddProtector({ onClose }: {onClose?(): void}) {
  const valid = z.object({
    userType: z.nativeEnum(UserType),
    guardiansType: z.nativeEnum(GuardiansType).optional(),
    surname: z.string().optional(),
    userName: z.string().optional(),
    gender: z.nativeEnum(Gender).optional(),
    areaCodeId: z.number().optional(),
    userEmail: z.string().email().optional(),
    userMobile: z.string().optional(),
    roleType: z.nativeEnum(RoleType).optional(),
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
    control,
    watch,
  } = useForm<FormValid>({
    resolver: zodResolver(valid),
  });
  const guardiansType = watch('guardiansType');
  const queryClient = useQueryClient();

  const submit = async (data: FormValid) => {
    /* todo: 固定 ID */
    axios.post('/trust/trust/user/add', {
      trustId: 15,
      ...data,
    }).then((resp) => {
      onClose?.();
      queryClient.invalidateQueries(['trust', 'elements']);
    });
  };

  return (
    <ModalContainer>
      <ModalNav title="Add Protector" onClose={onClose} />
      <form onSubmit={handleSubmit(submit)}>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <label className="text-[#C2D7C7F6] font-bold text-[16px]">Identity Category</label>
            <Controller
              render={({ field }) => {
                const enums = [
                  { value: UserType.Protect, name: 'Protector' },
                  { value: UserType.Succession, name: 'Regent protector' },
                  { value: UserType.SecondSuccession, name: 'The Second Successor Protector' },
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
            <label className="text-[#C2D7C7F6] font-bold text-[16px]">Protector</label>
            {/* <TextInput placeholder="Please provide additional instructions" /> */}
            <Controller
              render={({ field }) => {
                const enums = [
                  { value: GuardiansType.Other, name: 'Other' },
                  { value: GuardiansType.Self, name: 'Self' },
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
                  <label className="text-[#C2D7C7F6] font-bold text-[16px]">First Name</label>
                  <TextInput placeholder="" {...register('surname')} />
                </div>
                <div className="flex-1 flex flex-col gap-4">
                  <label className="text-[#C2D7C7F6] font-bold text-[16px]">Last Name</label>
                  <TextInput placeholder="" {...register('userName')} />
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <label className="text-[#C2D7C7F6] font-bold text-[16px]">Gender</label>
                <Controller
                  render={({ field }) => {
                    const enums = [
                      { value: Gender.Male, name: 'Male' },
                      { value: Gender.Female, name: 'Female' },
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
                <label className="text-[#C2D7C7F6] font-bold text-[16px]">Account Type</label>
                <Controller
                  render={({ field }) => {
                    const enums = [
                      { value: AccountType.Email, name: 'Email' },
                      { value: AccountType.Mobile, name: 'Mobile' },
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
                <label className="text-[#C2D7C7F6] font-bold text-[16px]">Email</label>
                <TextInput placeholder="Please provide additional instructions" {...register('userEmail')} />
              </div>
              <div className="flex flex-col gap-4">
                <label className="text-[#C2D7C7F6] font-bold text-[16px]">Permissions</label>
                <Controller
                  render={({ field }) => {
                    const enums = [
                      { value: RoleType.No, name: 'No' },
                      { value: RoleType.ReadOnly, name: 'Read Only' },
                      { value: RoleType.Approval, name: 'Approval' },
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
            <Button block>Submit</Button>
          </div>
          <div className="flex flex-col gap-5 mt-6">
            <Divide />
            <ContactUs />
          </div>
        </div>
      </form>
    </ModalContainer>
  );
}
