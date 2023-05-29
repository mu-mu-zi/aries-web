import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query';
import ModalContainer from '../../../views/ModalContainer';
import ModalNav from '../../../views/ModalContainer/ModalNav';
import Dropdown from '../../../components/Dropdown';
import { BeneficiaryRoleType } from './AddBeneficiary';
import { ProtectorRoleType } from './AddProtector';
import { AccountType } from '../../../interfaces/base';
import Button from '../../../components/Button';
import ContactUsFooter from '../../../views/ContactUsFooter';

export default function EditRole({
  defaultVal,
  trustUserId,
  isBeneficiary,
  onClose,
}: {
  defaultVal: number,
  trustUserId: number,
  isBeneficiary: boolean,
  onClose?(): void
}) {
  const valid = z.object({
    beneficiaryRoleType: z.nativeEnum(BeneficiaryRoleType).optional(),
    protectorRoleType: z.nativeEnum(ProtectorRoleType).optional(),
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
      beneficiaryRoleType: defaultVal,
      protectorRoleType: defaultVal,
    },
  });
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const submit = async (data: FormValid) => {
    axios.request({
      url: '/trust/trust/user/roleUpdate',
      method: 'get',
      params: {
        roleType: isBeneficiary ? data.beneficiaryRoleType : data.protectorRoleType,
        trustUserId,
      },
    }).then(() => {
      onClose?.();
      queryClient.invalidateQueries(['trust']);
    });
  };

  return (
    <ModalContainer>
      <ModalNav title="Edit Role" onClose={onClose} />
      <form onSubmit={handleSubmit(submit)}>
        <div className="flex flex-col gap-4">
          {isBeneficiary && (
            <div className="flex flex-col gap-4">
              <label className="text-[#C2D7C7F6] font-bold text-[16px]">{t('Permissions')}</label>
              <Controller
                render={({ field }) => {
                  const enums = [
                    { value: BeneficiaryRoleType.No, name: t('No') },
                    { value: BeneficiaryRoleType.ReadOnly, name: t('Read Only') },
                  ];

                  return (
                    <Dropdown
                      title={enums.find((x) => x.value === field.value)?.name}
                      items={enums.map((x) => x.name)}
                      onSelected={(idx) => field.onChange(enums[idx].value)}
                    />
                  );
                }}
                name="beneficiaryRoleType"
                control={control}
              />
            </div>
          )}
          {!isBeneficiary && (
            <div className="flex flex-col gap-4">
              <label className="text-[#C2D7C7F6] font-bold text-[16px]">{t('Permissions')}</label>
              <Controller
                render={({ field }) => {
                  const enums = [
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
                name="protectorRoleType"
                control={control}
              />
            </div>
          )}
          <div className="mt-4 self-center max-w-[420px] w-full">
            <Button block>{t('Submit')}</Button>
          </div>
          <div className="flex flex-col gap-5 mt-6">
            <ContactUsFooter />
          </div>
        </div>
      </form>
    </ModalContainer>
  );
}
