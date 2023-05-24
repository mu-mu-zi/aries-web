import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import Button from '../../../components/Button';
import ModalNav from '../../../views/ModalContainer/ModalNav';
import ModalTitle from '../../../views/ModalContainer/ModalTitle';
import ModalContainer from '../../../views/ModalContainer';
import Divide from '../../../components/Divide';
import ContactUs from '../../SignIn/ContactUs';

export default function NewPlan({ trustId, onClose }: {
  trustId: number,
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
  });
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const submit = async (data: FormValid) => {
    await axios.post('/trust/trust/distribution/plan/add', {
      trustId,
      ...data,
    });
    onClose?.();
    await queryClient.invalidateQueries(['trust']);
  };

  return (
    <ModalContainer>
      <ModalNav title="New allocation plan added" onClose={onClose} />
      <form onSubmit={handleSubmit(submit)}>
        <div className="flex flex-col gap-8">
          <label>
            <div className="flex flex-col gap-4">
              <div className="text-[#C2D7C7F6] text-[16px]">{t('Allocation Plan Explanation')}</div>
              <textarea
                maxLength={1000}
                {...register('planDescription')}
                className="bg-[#3B5649] rounded-xl p-4 outline-none h-[158px] placeholder:text-[#99AC9B] resize-none"
                placeholder={t('Regarding profit distribution, I want to make it clear that it will be based on the proportion of the beneficiary\'s ownership of the rights and interests. Distribution will be made according to a predetermined ratio and the profits will be directly paid to the beneficiary\'s designated bank account at the end of each quarter.') ?? ''}
              />
            </div>
          </label>
          <div className="self-center w-[420px]">
            <Button type="submit" block>{t('Submit')}</Button>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center gap-9 self-stretch px-8">
          <Divide />
          <ContactUs />
        </div>
      </form>
    </ModalContainer>
  );
}
