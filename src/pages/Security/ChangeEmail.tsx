import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FormattedMessage, useIntl } from 'react-intl';
import CenterContainer from '../../views/CenterContainer';
import GANavbar from '../SignIn/GANavbar';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
// import { useSendValidateCodeMutation } from '../../api/user/verify';
import SendButton from '../../views/SendButton';
import ContactUsFooter from '../../views/ContactUsFooter';
import { useValidators } from '../../utils/zod';
import { useAppSelector } from '../../state';
import { useUserInfoQuery } from '../../api/user/user';
import { ISendSMSCodeAction, ISendSMSCodeType, userSendSMSCodeInLogin } from '../../api/base/send';

export default function ChangeEmail() {
  const { zodEmail, zodRequired } = useValidators();
  const valid = z.object({
    email: zodEmail(),
    securityCode: zodRequired(),
  });
  type FormValid = z.infer<typeof valid>;
  // const sendValidateCodeMutation = useSendValidateCodeMutation();
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
  const userQuery = useUserInfoQuery();
  // const { t } = useTranslation();
  const intl = useIntl();
  const lan = useAppSelector((state) => state.app.language);

  useEffect(() => clearErrors(), [lan]);

  const sendValidCode = async () => {
    /* 验证账号 */
    try {
      await trigger('email', {
        shouldFocus: true,
      });
      // await axios.post('/user/send/sendSmsCode', {
      //   account: getValues('email'),
      //   type: 3,
      // });
      await userSendSMSCodeInLogin({
        account: getValues('email'),
        type: ISendSMSCodeType.NewEmail,
        action: userQuery.data?.data?.emailAuth ? ISendSMSCodeAction.ChangeEmail : ISendSMSCodeAction.BingEmail,
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
      queryClient.invalidateQueries();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <CenterContainer>
      <GANavbar />
      <form onSubmit={handleSubmit(submit)}>
        <div className="m-auto flex w-[420px] flex-col">
          <div className="text-shadow-block gradient-text1 my-16 text-center font-title text-[32px] font-bold leading-[36px]">
            {userQuery.data?.data?.emailAuth ? (
              <FormattedMessage defaultMessage="Change Email" />
            ) : (
              <FormattedMessage defaultMessage="Bind Email" />
            )}
          </div>
          <div className="flex flex-col gap-4">
            <div className="text-[16px] font-bold text-[#C2D7C7F6]">
              {userQuery?.data?.data?.emailAuth ? (
                <FormattedMessage defaultMessage="New Email" />
              ) : (
                <FormattedMessage defaultMessage="Email" />
              )}
            </div>
            <div className="flex-auto">
              <TextInput
                {...register('email')}
                placeholder={intl.formatMessage({ defaultMessage: 'Please enter the email' })}
                error={errors.email?.message}
              />
            </div>
            <div className="text-[16px] font-bold text-[#C2D7C7F6]">
              {userQuery.data?.data?.emailAuth ? (
                <FormattedMessage defaultMessage="New Email Verification Code" />
              ) : (
                <FormattedMessage defaultMessage="Email Verification Code" />
              )}
            </div>
            <div>
              <TextInput
                {...register('securityCode')}
                suffix={<SendButton onClick={sendValidCode} />}
                placeholder={intl.formatMessage({ defaultMessage: 'Please enter the verification code' })}
                error={errors.securityCode?.message}
              />
            </div>
          </div>
          <div className="mt-10">
            <Button block>
              <FormattedMessage defaultMessage="Confirm" />
            </Button>
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
