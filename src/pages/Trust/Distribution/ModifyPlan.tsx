import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';
import Button from '../../../components/Button';
import ModalNav from '../../../views/ModalContainer/ModalNav';
import ModalContainer from '../../../views/ModalContainer';
import { IDistribution } from '../../../interfaces/trust';
import { unixFormatTime } from '../../../utils/DateFormat';
import GoogleVerify from '../../../views/GoogleVerify';
import Modal from '../../../components/Modal';
import { useValidators } from '../../../utils/zod';

export default function ModifyPlan({ trustId, row, onClose }: {
  trustId: number,
  row: IDistribution
  onClose?(): void
}) {
  const { zodMinStr } = useValidators();
  const valid = z.object({
    planDescription: zodMinStr(),
    planTime: z.string().optional(),
  });
  type FormValid = z.infer<typeof valid>;
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    trigger,
    getValues,
  } = useForm<FormValid>({
    resolver: zodResolver(valid),
    defaultValues: {
      planDescription: row.planDescription,
    },
  });
  const queryClient = useQueryClient();
  // const { t } = useTranslation();
  const intl = useIntl();
  const [googleVerifyVisible, setGoogleVerifyVisible] = useState(false);
  const [formData, setFormData] = useState<FormValid>();

  const updateMutation = useMutation({
    mutationFn: (data: FormValid & { ticker: string }) => axios.post('/trust/trust/distribution/plan/update', {
      trustId: Number(trustId),
      planId: row.planId,
      ...data,
    }),
    onSuccess: () => {
      onClose?.();
      queryClient.invalidateQueries();
    },
  });

  const submit = async (data: FormValid) => {
    setFormData(data);
    setGoogleVerifyVisible(true);
    // await axios.post('/trust/trust/distribution/plan/update', {
    //   trustId: Number(trustId),
    //   planId: row.planId,
    //   ...data,
    // }).then((resp) => {
    //   queryClient.invalidateQueries(['trust']);
    //   onClose?.();
    // });
  };

  const statusTitle = (status: number) => {
    switch (status) {
      case 1: return intl.formatMessage({ defaultMessage: 'Checking' });
      case 2: return intl.formatMessage({ defaultMessage: 'Approved' });
      case 3: return intl.formatMessage({ defaultMessage: 'Rejected' });
      default: return '--';
    }
  };

  return (
    <ModalContainer>
      <ModalNav title={intl.formatMessage({ defaultMessage: 'Modify distribution plan details' })} onClose={onClose} />
      <form onSubmit={handleSubmit(submit)}>
        <div className="flex flex-col gap-4">
          <label>
            <div className="flex flex-col gap-4">
              <div className="text-[#C2D7C7F6] text-[16px]">
                <FormattedMessage
                  defaultMessage="Allocation Plan Explanation"
                />
              </div>
              <textarea
                {...register('planDescription')}
                className="bg-[#3B5649] rounded-xl p-4 outline-none h-[158px] placeholder:text-[#99AC9B] resize-none"
                placeholder={intl.formatMessage({ defaultMessage: 'Regarding profit distribution, I want to make it clear that it will be based on the proportion of the beneficiary\'s ownership of the rights and interests. Distribution will be made according to a predetermined ratio and the profits will be directly paid to the beneficiary\'s designated bank account at the end of each quarter.' })}
              />
              {errors.planDescription?.message
                && <div className="pl-1 text-[#ECA741] text-[14px]">{errors.planDescription.message}</div>}
            </div>
          </label>
          <div className="flex flex-col gap-4">
            <Row
              title={intl.formatMessage({ defaultMessage: 'Update time:' })}
              value={unixFormatTime(row.updateTimeStamp)}
            />
            <Row title={intl.formatMessage({ defaultMessage: 'Approval status:' })} value={statusTitle(row.planStatus)} />
            <Row title={intl.formatMessage({ defaultMessage: 'Note:' })} value={row.remark} />
          </div>
          <div className="mt-8 self-center">
            <Button type="submit" disabled={updateMutation.isLoading}>
              <FormattedMessage defaultMessage="Submit" />
            </Button>
          </div>
        </div>
      </form>
      <Modal visible={googleVerifyVisible} onClose={() => setGoogleVerifyVisible(false)}>
        {formData && (
          <GoogleVerify
            onClose={() => setGoogleVerifyVisible(false)}
            onEnter={(ticket) => {
              setGoogleVerifyVisible(false);
              updateMutation.mutate({
                planDescription: formData.planDescription,
                ticker: ticket,
              });
            }}
          />
        )}
      </Modal>
    </ModalContainer>
  );
}

export function Row({ title, value }: {
  title: string,
  value?: string
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-[16px] text-[#99AC9B]">{title}</div>
      <div className="text-[20px] text-[#C2D7C7F6]">{value ?? '--'}</div>
    </div>
  );
}
