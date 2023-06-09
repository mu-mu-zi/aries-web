import React, { useEffect, useState } from 'react';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Await } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDebounce } from 'react-use';
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
import { useCheckUserContainQuery } from '../../../api/user/user';

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
  const intl = useIntl();
  const requiredMessage = intl.formatMessage({ defaultMessage: 'Required' });
  const [endAccount, setEndAccount] = useState<string>();
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
  })
    /* 明确对象，帐号必填 */
    .refine((data) => {
      if (data.guardiansType === GuardiansType.Other) {
        return !!data.account?.trim();
      }
      return true;
    }, {
      message: requiredMessage,
      path: ['account'],
    })
    /* 明确对象，名字必填 */
    .refine((data) => {
      if (data.guardiansType === GuardiansType.Other && checkUserQuery.data?.data === false) {
        return !!data.userName?.trim();
      }
      return true;
    }, {
      message: requiredMessage,
      path: ['userName'],
    })
    /* 明确对象，姓必填 */
    .refine((data) => {
      if (data.guardiansType === GuardiansType.Other && checkUserQuery.data?.data === false) {
        return !!data.surname?.trim();
      }
      return true;
    }, {
      message: requiredMessage,
      path: ['surname'],
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
  const account = watch('account');
  const guardiansType = watch('guardiansType');
  const queryClient = useQueryClient();
  const accountType = watch('accountType');
  const areaCodeId = watch('areaCodeId');
  const checkUserQuery = useCheckUserContainQuery({
    userEmail: accountType === AccountType.Email ? endAccount : undefined,
    userMobile: accountType === AccountType.Mobile ? endAccount : undefined,
    areaCodeId,
  });
  const [googleVerifyVisible, setGoogleVerifyVisible] = useState(false);
  const [formData, setFormData] = useState<FormValid>();

  useDebounce(() => setEndAccount(account), 1000, [account]);

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
  };

  return (
    <ModalContainer>
      <ModalNav title={intl.formatMessage({ defaultMessage: 'Add Protector' })} onClose={onClose} />
      <form onSubmit={handleSubmit(submit)}>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <label className="text-[#C2D7C7F6] font-bold text-[16px]">
              <FormattedMessage defaultMessage="Identity Category" />
            </label>
            <Controller
              render={({ field }) => {
                const enums = [
                  { value: UserType.Protect, name: intl.formatMessage({ defaultMessage: 'Protector' }) },
                  { value: UserType.Succession, name: intl.formatMessage({ defaultMessage: 'Regent protector' }) },
                  {
                    value: UserType.SecondSuccession,
                    name: intl.formatMessage({ defaultMessage: 'The Second Successor Protector' }),
                  },
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
            <label className="text-[#C2D7C7F6] font-bold text-[16px]">
              <FormattedMessage defaultMessage="Protector" />
            </label>
            {/* <TextInput placeholder="Please provide additional instructions" /> */}
            <Controller
              render={({ field }) => {
                const enums = [
                  { value: GuardiansType.Other, name: intl.formatMessage({ defaultMessage: 'Other' }) },
                  { value: GuardiansType.Self, name: intl.formatMessage({ defaultMessage: 'Self' }) },
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
              <div className="flex flex-col gap-4">
                <label className="text-[#C2D7C7F6] font-bold text-[16px]">
                  <FormattedMessage defaultMessage="Account Type" />
                </label>
                <Controller
                  render={({ field }) => {
                    const enums = [
                      { value: AccountType.Email, name: intl.formatMessage({ defaultMessage: 'Email' }) },
                      { value: AccountType.Mobile, name: intl.formatMessage({ defaultMessage: 'Mobile' }) },
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
                <label
                  className="text-[#C2D7C7F6] font-bold text-[16px]"
                >
                  {accountType === AccountType.Email ? intl.formatMessage({ defaultMessage: 'Email' }) : intl.formatMessage({ defaultMessage: 'Mobile' })}
                </label>
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
                    <TextInput
                      placeholder={accountType === AccountType.Email ? intl.formatMessage({ defaultMessage: 'Please enter the email' }) : intl.formatMessage({ defaultMessage: 'Please enter the mobile' })}
                      error={errors.account?.message}
                      {...register('account')}
                    />
                  </div>
                </div>
              </div>
              {!!account && checkUserQuery.data?.data === false && (
                <>
                  <div className="flex flex-row gap-4">
                    <div className="flex-1 flex flex-col gap-4">
                      <label className="text-[#C2D7C7F6] font-bold text-[16px]">
                        <FormattedMessage defaultMessage="First Name" />
                      </label>
                      <TextInput placeholder="" {...register('userName')} error={errors.userName?.message} />
                    </div>
                    <div className="flex-1 flex flex-col gap-4">
                      <label className="text-[#C2D7C7F6] font-bold text-[16px]">
                        <FormattedMessage defaultMessage="Last Name" />
                      </label>
                      <TextInput placeholder="" {...register('surname')} error={errors.surname?.message} />
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    <label className="text-[#C2D7C7F6] font-bold text-[16px]">
                      <FormattedMessage defaultMessage="Gender" />
                    </label>
                    <Controller
                      render={({ field }) => {
                        const enums = [
                          { value: Gender.Male, name: intl.formatMessage({ defaultMessage: 'Male' }) },
                          { value: Gender.Female, name: intl.formatMessage({ defaultMessage: 'Female' }) },
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
                </>
              )}
              <div className="flex flex-col gap-4">
                <label className="text-[#C2D7C7F6] font-bold text-[16px]">
                  <FormattedMessage
                    defaultMessage="Permissions"
                  />
                </label>
                <Controller
                  render={({ field }) => {
                    const enums = [
                      // { value: RoleType.No, name: t('No') },
                      { value: ProtectorRoleType.ReadOnly, name: intl.formatMessage({ defaultMessage: 'Read Only' }) },
                      { value: ProtectorRoleType.Approval, name: intl.formatMessage({ defaultMessage: 'Approval' }) },
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
            <Button block><FormattedMessage defaultMessage="Submit" /></Button>
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
