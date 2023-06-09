import React, { useDebugValue, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { DevTool } from '@hookform/devtools';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDebounce } from 'react-use';
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
import ContactUsFooter from '../../../views/ContactUsFooter';
import AreaSelect from '../../../components/AreaSelect';
import GoogleVerify from '../../../views/GoogleVerify';
import Modal from '../../../components/Modal';
import { useCheckUserContainQuery } from '../../../api/user/user';

// import { useAreaCodeListQuery } from '../../../api/base/areaCode';

enum UserType {
  Define = 2,
  NonSpecific = 3,
  Myself = 1
}

enum Gender {
  Male,
  Female
}

export enum BeneficiaryRoleType {
  No = 1,
  ReadOnly,
  Approval
}

export default function AddBeneficiary({ trustId, onClose }: {
  trustId: number,
  onClose?(): void
}) {
  const intl = useIntl();
  const requiredMessage = intl.formatMessage({ defaultMessage: 'Required' });
  const [endAccount, setEndAccount] = useState<string>();

  const valid = z.object({
    userType: z.nativeEnum(UserType),
    accountType: z.nativeEnum(AccountType).optional(),
    surname: z.string().optional(),
    userName: z.string().optional(),
    gender: z.nativeEnum(Gender).optional(),
    remark: z.string().optional(),
    areaCodeId: z.number().optional(),
    account: z.string().optional(),
    roleType: z.nativeEnum(BeneficiaryRoleType).optional(),
  })
    /* 明确对象，帐号必填 */
    .refine((data) => {
      if (data.userType === UserType.Define) { return !!data.account?.trim(); }
      return true;
    }, {
      message: requiredMessage,
      path: ['account'],
    })
    /* 明确对象，名字必填 */
    .refine((data) => {
      if (data.userType === UserType.Define && checkUserQuery.data?.data === false) { return !!data.userName?.trim(); }
      return true;
    }, {
      message: requiredMessage,
      path: ['userName'],
    })
    /* 明确对象，姓必填 */
    .refine((data) => {
      if (data.userType === UserType.Define && checkUserQuery.data?.data === false) { return !!data.surname?.trim(); }
      return true;
    }, {
      message: requiredMessage,
      path: ['surname'],
    })
    /* 非明确对象，备注必填 */
    .refine((data) => {
      if (data.userType === UserType.NonSpecific) { return !!data.remark?.trim(); }
      return true;
    }, {
      message: requiredMessage,
      path: ['remark'],
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
      userType: UserType.Define,
      accountType: AccountType.Email,
      gender: Gender.Male,
      roleType: BeneficiaryRoleType.No,
    },
  });
  const userType = watch('userType');
  const accountType = watch('accountType');
  const account = watch('account');
  const areaCodeId = watch('areaCodeId');
  const checkUserQuery = useCheckUserContainQuery({
    userEmail: accountType === AccountType.Email ? endAccount : undefined,
    userMobile: accountType === AccountType.Mobile ? endAccount : undefined,
    areaCodeId,
  });
  const queryClient = useQueryClient();
  // const { t } = useTranslation();
  const [googleVerifyVisible, setGoogleVerifyVisible] = useState(false);
  const [formData, setFormData] = useState<FormValid>();

  const submitMutation = useMutation({
    mutationFn: (data: FormValid & {
      ticker: string
    }) => axios.post('/trust/trust/user/add', {
      trustId,
      guardiansType: data.userType === UserType.Myself ? 2 : undefined,
      userEmail: data.accountType === AccountType.Email ? data.account : undefined,
      userMobile: data.accountType === AccountType.Mobile ? data.account : undefined,
      ...data,
    }),
    onSuccess: () => {
      onClose?.();
      queryClient.invalidateQueries(['trust']);
    },
  });

  useDebounce(() => setEndAccount(account), 1000, [account]);

  const submit = (data: FormValid) => {
    setFormData(data);
    setGoogleVerifyVisible(true);
  };

  return (
    <ModalContainer>
      <ModalNav
        title={intl.formatMessage({ defaultMessage: 'Add Beneficiary' })}
        onClose={onClose}
      />
      <form onSubmit={handleSubmit(submit)}>
        <div className="flex flex-col gap-4">
          {/* 类型 */}
          <div className="flex flex-col gap-4">
            <label className="text-[#C2D7C7F6] font-bold text-[16px]">
              <FormattedMessage defaultMessage="Beneficiary" />
            </label>
            <Controller
              render={({ field }) => {
                const enums = [
                  { value: UserType.Define, title: intl.formatMessage({ defaultMessage: 'Define' }) },
                  { value: UserType.NonSpecific, title: intl.formatMessage({ defaultMessage: 'NonSpecific' }) },
                  { value: UserType.Myself, title: intl.formatMessage({ defaultMessage: 'Myself' }) },
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
                  {accountType === AccountType.Email ? <FormattedMessage defaultMessage="Email" /> : <FormattedMessage defaultMessage="Mobile" /> }
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
                  )}
                  <div className="flex-auto">
                    <TextInput
                      placeholder={accountType === AccountType.Email ? intl.formatMessage({ defaultMessage: 'Please enter the email' }) : intl.formatMessage({ defaultMessage: 'Please enter the mobile' })}
                      error={errors.account?.message}
                      {...register('account')}
                      // onBlur={(e) => setEndAccount(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              {checkUserQuery.data?.data}
              {!!account && checkUserQuery.data?.data === false && (
                <>
                  <div className="flex flex-row gap-4">
                    <div className="flex-1 flex flex-col gap-4">
                      <label className="text-[#C2D7C7F6] font-bold text-[16px]"><FormattedMessage defaultMessage="First Name" /></label>
                      <TextInput placeholder="" {...register('userName')} error={errors.userName?.message} />
                    </div>
                    <div className="flex-1 flex flex-col gap-4">
                      <label className="text-[#C2D7C7F6] font-bold text-[16px]"><FormattedMessage defaultMessage="Last Name" /></label>
                      <TextInput placeholder="" {...register('surname')} error={errors.surname?.message} />
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    <label className="text-[#C2D7C7F6] font-bold text-[16px]"><FormattedMessage defaultMessage="Gender" /></label>
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
                  <FormattedMessage defaultMessage="Permissions" />
                </label>
                <Controller
                  render={({ field }) => {
                    const enums = [
                      { value: BeneficiaryRoleType.No, name: intl.formatMessage({ defaultMessage: 'No' }) },
                      { value: BeneficiaryRoleType.ReadOnly, name: intl.formatMessage({ defaultMessage: 'Read Only' }) },
                      // { value: RoleType.Approval, name: t('Approval') },
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
              <label className="text-[#C2D7C7F6] font-bold text-[16px]">
                <FormattedMessage defaultMessage="Remark" />
              </label>
              <TextArea
                {...register('remark')}
                error={errors.remark?.message}
                placeholder={intl.formatMessage({ defaultMessage: 'Please provide additional instructions' })}
              />
            </div>
          )}
          <div className="mt-4 self-center max-w-[420px] w-full">
            <Button block>
              <FormattedMessage defaultMessage="Submit" />
            </Button>
          </div>
          {/* <DevTool control={control} /> */}
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
