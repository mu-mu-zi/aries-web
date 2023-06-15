import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { FormattedMessage, useIntl } from 'react-intl';
import Button from '../../../components/Button';
import ModalNav from '../../../views/ModalContainer/ModalNav';
import ModalTitle from '../../../views/ModalContainer/ModalTitle';
import ModalContainer from '../../../views/ModalContainer';
import Divide from '../../../components/Divide';
import ContactUs from '../../SignIn/ContactUs';
import ContactUsFooter from '../../../views/ContactUsFooter';
import GoogleVerify from '../../../views/GoogleVerify';
import Modal from '../../../components/Modal';
import { useValidators } from '../../../utils/zod';
import { addSuccessNotification } from '../../../utils/Notification';

export default function NewPlan({ trustId, onClose, onEnter }: {
  trustId: number,
  onClose?(): void,
  onEnter?(str: string): void,
}) {
  const intl = useIntl();
  const { zodMinStr } = useValidators();
  const valid = z.object({
    planDescription: zodMinStr(),
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
  const [googleVerifyVisible, setGoogleVerifyVisible] = useState(false);
  const [formData, setFormData] = useState<FormValid>();
  // const { t } = useTranslation();

  // const addPlanMutation = useMutation({
  //   mutationFn: async (data: FormValid) => {
  //     await axios.post('/trust/trust/distribution/plan/add', {
  //       trustId,
  //       ...data,
  //     });
  //   },
  //   onSuccess: () => {
  //     onClose?.();
  //     queryClient.invalidateQueries(['trust']);
  //   },
  // });
  const addPlanMutation = useMutation({
    mutationFn: async (data: {
      planDescription: string
      ticker: string
    }) => {
      await axios.post('/trust/trust/distribution/plan/add', {
        trustId,
        ...data,
      });
    },
    onSuccess: async () => {
      addSuccessNotification({
        title: intl.formatMessage({ defaultMessage: 'Submit Successfully' }),
        content: intl.formatMessage({ defaultMessage: 'Trustee is confirming' }),
      });
      await queryClient.invalidateQueries(['trust']);
      onClose?.();
    },
  });

  const submit = async (data: FormValid) => {
    // addPlanMutation.mutate(data);
    // onEnter?.(data.planDescription);
    setFormData(data);
    setGoogleVerifyVisible(true);
  };

  return (
    <ModalContainer>
      <ModalNav title={intl.formatMessage({ defaultMessage: 'New allocation plan added' })} onClose={onClose} />
      <form onSubmit={handleSubmit(submit)}>
        <div className="flex flex-col gap-8">
          <label>
            <div className="flex flex-col gap-4">
              <div className="text-[#C2D7C7F6] text-[16px] font-bold">
                <FormattedMessage defaultMessage="Allocation Plan Explanation" />
              </div>
              <textarea
                maxLength={1000}
                {...register('planDescription')}
                className="bg-[#3B5649] rounded-xl p-4 text-[20px] outline-none h-[158px] placeholder:text-[#99AC9B] resize-none"
                placeholder={intl.formatMessage({ defaultMessage: 'Please enter your distribution plan' })}
              />
              {errors.planDescription?.message
                && <div className="pl-1 text-[#ECA741] text-[14px]">{errors.planDescription.message}</div>}
            </div>
          </label>
          <div className="self-center w-[420px]">
            <Button type="submit" block disabled={addPlanMutation.isLoading}>
              <FormattedMessage defaultMessage="Submit" />
            </Button>
          </div>
        </div>
        <div className="mt-12 self-stretch px-8">
          <ContactUsFooter />
        </div>
      </form>
      <Modal visible={googleVerifyVisible} onClose={() => setGoogleVerifyVisible(false)}>
        {formData && (
          <GoogleVerify
            onClose={() => setGoogleVerifyVisible(false)}
            onEnter={(ticket) => {
              setGoogleVerifyVisible(false);
              addPlanMutation.mutate({
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
