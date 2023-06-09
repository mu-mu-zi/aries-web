import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { FormattedMessage, useIntl } from 'react-intl';
import Modal from '../../components/Modal';
import ModalContainer from '../ModalContainer';
import ModalNav from '../ModalContainer/ModalNav';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import TextField from '../../components/TextField';
import ContactUsFooter from '../ContactUsFooter';
import { useValidators } from '../../utils/zod';

export default function GoogleVerify({ onClose, onEnter }: {
  onClose?(): void;
  onEnter?(ticket: string): void
}) {
  const { zodRequired } = useValidators();
  const valid = z.object({
    code: zodRequired(),
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
  const intl = useIntl();

  const verifyMutation = useMutation({
    mutationFn: (data: FormValid) => axios.post('/user/user/securityVerification', {
      verificationType: 3,
      googleCode: data.code,
    }),
    onSuccess: async (resp) => {
      onEnter?.(resp.data.ticker as string);
    },
  });

  const submit = (data: FormValid) => verifyMutation.mutate(data);

  return (
    <ModalContainer>
      <ModalNav
        title={intl.formatMessage({ defaultMessage: 'Google Verify' })}
        onClose={onClose}
      />
      <form onSubmit={handleSubmit(submit)}>
        <div className="flex flex-col gap-4">
          <TextInput
            {...register('code')}
            placeholder={intl.formatMessage({ defaultMessage: 'Please enter the 6-digit Google security code' })}
            maxLength={6}
          />
          <Button block disabled={verifyMutation.isLoading}>
            <FormattedMessage defaultMessage="Submit" />
          </Button>
        </div>
      </form>
      <div className="mt-[40px]">
        <ContactUsFooter />
      </div>
    </ModalContainer>
  );
}
