import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FormattedMessage, useIntl } from 'react-intl';
import CenterContainer from '../../views/CenterContainer';
import GANavbar from '../SignIn/GANavbar';
import Dropdown from '../../components/Dropdown';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import { useSendValidateCodeMutation } from '../../api/user/verify';
import SendButton from '../../views/SendButton';
import ContactUsFooter from '../../views/ContactUsFooter';

export default function ChangeEmail() {
  const valid = z.object({
    email: z.string().email().nonempty(),
    securityCode: z.string().nonempty(),
  });
  type FormValid = z.infer<typeof valid>;
  const sendValidateCodeMutation = useSendValidateCodeMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    trigger,
    getValues,
    setValue,
    control,
  } = useForm<FormValid>({
    resolver: zodResolver(valid),
  });
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  // const { t } = useTranslation();
  const intl = useIntl();

  const sendValidCode = async () => {
    /* 验证账号 */
    try {
      await trigger('email', {
        shouldFocus: true,
      });
      await axios.post('/user/send/sendSmsCode', {
        account: getValues('email'),
        type: 3,
      });
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  };

  const submit = async (data: FormValid) => {
    try {
      await axios.post('/user/user/updateCheck', data);
      navigate('/personal/verify', {
        state: {
          account: data.email,
        },
        replace: true,
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <CenterContainer>
      <GANavbar title={intl.formatMessage({ defaultMessage: 'Cancel' })} />
      <form onSubmit={handleSubmit(submit)}>
        <div className="m-auto flex flex-col w-[420px]">
          <div
            className="text-shadow-block font-bold gradient-text1 text-center font-title text-[32px] leading-[36px] my-16"
          >
            <FormattedMessage defaultMessage="Binding email verification" />
          </div>
          <div className="flex flex-col gap-4">
            <div className="text-[#C2D7C7F6] text-[16px] font-bold">{intl.formatMessage({ defaultMessage: 'New Email' })}</div>
            <div className="flex-auto">
              <TextInput
                {...register('email')}
                placeholder={intl.formatMessage({ defaultMessage: 'Please enter the new email' })}
              />
            </div>
            <div className="text-[#C2D7C7F6] text-[16px] font-bold">{intl.formatMessage({ defaultMessage: 'New Email Verification Code' })}</div>
            <div>
              <TextInput
                {...register('securityCode')}
                suffix={(<SendButton onClick={sendValidCode} />)}
                placeholder={intl.formatMessage({ defaultMessage: 'Please enter the verification code' })}
              />
            </div>
          </div>
          <div className="mt-10">
            <Button block><FormattedMessage defaultMessage="Confirm" /></Button>
          </div>
        </div>
      </form>
      <div className="flex-auto" />
      <div className="pb-16">
        <ContactUsFooter />
      </div>
    </CenterContainer>
  );
}
