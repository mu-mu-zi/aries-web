import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Button from '../../../components/Button';
import ModalNav from '../../../views/ModalContainer/ModalNav';
import ModalContainer from '../../../views/ModalContainer';
import { IDistribution } from '../../../interfaces/trust';

export default function ModifyPlan({ trustId, row, onClose }: {
  trustId: number,
  row: IDistribution
  onClose?(): void
}) {
  const valid = z.object({
    planDescription: z.string().nonempty(),
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
  const { t } = useTranslation();

  const submit = async (data: FormValid) => {
    await axios.post('/trust/trust/distribution/plan/update', {
      trustId: Number(trustId),
      planId: row.planId,
      ...data,
    }).then((resp) => {
      queryClient.invalidateQueries(['trust']);
      onClose?.();
    });
  };

  return (
    <ModalContainer>
      <ModalNav title={t('Modify distribution plan details')} onClose={onClose} />
      <form onSubmit={handleSubmit(submit)}>
        <div className="flex flex-col gap-4">
          <label>
            <div className="flex flex-col gap-4">
              <div className="text-[#C2D7C7F6] text-[16px]">{t('Allocation Plan Explanation')}</div>
              <textarea
                {...register('planDescription')}
                className="bg-[#3B5649] rounded-xl p-4 outline-none h-[158px] placeholder:text-[#99AC9B] resize-none"
                placeholder={t('Regarding profit distribution, I want to make it clear that it will be based on the proportion of the beneficiary\'s ownership of the rights and interests. Distribution will be made according to a predetermined ratio and the profits will be directly paid to the beneficiary\'s designated bank account at the end of each quarter.') ?? ''}
              />
            </div>
          </label>
          <div className="flex flex-col gap-4">
            <Row title={t('Update time:')} value={moment.unix(row.updateTimeStamp / 1000).format('yyyy-MM-DD HH:mm:ss')} />
            <Row title={t('Approval status:')} value={row.planStatusName} />
            <Row title={t('Note:')} value={row.remark} />
          </div>
          <div className="mt-8 self-center">
            <Button type="submit">{t('Submit')}</Button>
          </div>
        </div>
      </form>
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
      <div className="text-[20px] text-[#C2D7C7F6]">{value}</div>
    </div>
  );
}
