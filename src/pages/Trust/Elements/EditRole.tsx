import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FormattedMessage, useIntl } from 'react-intl';
import ModalContainer from '../../../views/ModalContainer';
import ModalNav from '../../../views/ModalContainer/ModalNav';
import Dropdown from '../../../components/Dropdown';
import { BeneficiaryRoleType } from './AddBeneficiary';
import { ProtectorRoleType } from './AddProtector';
import { AccountType } from '../../../interfaces/base';
import Button from '../../../components/Button';
import ContactUsFooter from '../../../views/ContactUsFooter';
import GoogleVerify from '../../../views/GoogleVerify';
import Modal from '../../../components/Modal';
import { useTrustUserRoleQuery } from '../../../api/trust/elements';
import Confirm from '../../../views/Confirm';

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
  // const { t } = useTranslation();
  const intl = useIntl();
  const queryClient = useQueryClient();
  const [googleVerifyVisible, setGoogleVerifyVisible] = useState(false);
  const [formData, setFormData] = useState<FormValid>();
  const proRoleType = watch('protectorRoleType');
  const roleTypeQuery = useTrustUserRoleQuery({
    trustUserId,
    roleType: proRoleType,
  });
  const [editWarningVisible, setEditWarningVisible] = useState(false);

  const submitMutation = useMutation({
    mutationFn: (data: FormValid & { ticker: string }) => axios.request({
      url: '/trust/trust/user/roleUpdate',
      method: 'post',
      data: {
        roleType: isBeneficiary ? data.beneficiaryRoleType : data.protectorRoleType,
        trustUserId,
        ticker: data.ticker,
      },
    }),
    onSuccess: async () => {
      onClose?.();
      queryClient.invalidateQueries(['trust']);
    },
  });

  const submit = async (data: FormValid) => {
    if (roleTypeQuery.isSuccess && roleTypeQuery?.data?.data) {
      setEditWarningVisible(true);
    } else {
      setFormData(data);
      setGoogleVerifyVisible(true);
    }

    // axios.request({
    //   url: '/trust/trust/user/roleUpdate',
    //   method: 'post',
    //   data: {
    //     roleType: isBeneficiary ? data.beneficiaryRoleType : data.protectorRoleType,
    //     trustUserId,
    //   },
    // }).then(() => {
    //   onClose?.();
    //   queryClient.invalidateQueries(['trust']);
    // });
  };

  return (
    <ModalContainer>
      <ModalNav title={intl.formatMessage({ defaultMessage: 'Edit Role' })} onClose={onClose} />
      <form onSubmit={handleSubmit(submit)}>
        <div className="flex flex-col gap-4">
          {isBeneficiary && (
            <div className="flex flex-col gap-4">
              <label className="text-[#C2D7C7F6] font-bold text-[16px]">
                <FormattedMessage defaultMessage="Permissions" />
              </label>
              <Controller
                render={({ field }) => {
                  const enums = [
                    { value: BeneficiaryRoleType.No, name: intl.formatMessage({ defaultMessage: 'No' }) },
                    { value: BeneficiaryRoleType.ReadOnly, name: intl.formatMessage({ defaultMessage: 'Read Only' }) },
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
              <label className="text-[#C2D7C7F6] font-bold text-[16px]"><FormattedMessage defaultMessage="Permissions" /></label>
              <Controller
                render={({ field }) => {
                  const enums = [
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
                name="protectorRoleType"
                control={control}
              />
            </div>
          )}
          <div className="mt-4 self-center max-w-[420px] w-full">
            <Button
              block
              disabled={roleTypeQuery.isLoading}
            >
              <FormattedMessage defaultMessage="Submit" />
            </Button>
          </div>
          <div className="flex flex-col gap-5 mt-6">
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
      <Modal visible={editWarningVisible}>
        <Confirm
          title={intl.formatMessage({ defaultMessage: 'You have set another account as approval protector, please change it and reset it!' })}
          onOk={() => setEditWarningVisible(false)}
        />
      </Modal>
    </ModalContainer>
  );
}
