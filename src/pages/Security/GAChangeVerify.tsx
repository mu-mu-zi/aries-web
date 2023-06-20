import React, { useEffect } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';
import CenterContainer from '../../views/CenterContainer';
import GANavbar from '../SignIn/GANavbar';
import TextInput from '../../components/TextInput';
import SendButton from '../../views/SendButton';
import Button from '../../components/Button';
// import { useSendValidateCodeMutation } from '../../api/user/verify';
import { useUserInfoQuery } from '../../api/user/user';
// import { useAreaCodeListQuery } from '../../api/base/areaCode';
import ContactUsFooter from '../../views/ContactUsFooter';
import { useValidators } from '../../utils/zod';
import { useAppSelector } from '../../state';
import { ISendSMSCodeAction, ISendSMSCodeType, userSendSMSCodeInLogin } from '../../api/base/send';
import { addSuccessNotification } from '../../utils/Notification';

export default function GAChangeVerify() {
  // const { t } = useTranslation();
  const intl = useIntl();
  const { zodRequired } = useValidators();
  const valid = z.object({
    userEmailCode: z.string().optional(),
    userMobileCode: z.string().optional(),
    googleCode: zodRequired(),
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
  const userQuery = useUserInfoQuery();
  const navigate = useNavigate();
  const location = useLocation();
  const lan = useAppSelector((state) => state.app.language);

  useEffect(() => clearErrors(), [lan]);

  const submit = async (data: FormValid) => {
    try {
      await axios.post('/user/user/verificationMethod', {
        isReset: true,
        ticket: location.state?.ticket,
        ...data,
      });
      navigate(-2);
      addSuccessNotification({
        title: intl.formatMessage({ defaultMessage: 'Submit Successfully' }),
      });
      queryClient.invalidateQueries();
    } catch (e) {
      console.log(e);
    }
  };

  const emailSend = async () => {
    try {
      // await axios.post('/user/send/sendSmsCode', {
      //   type: 1,
      // });
      await userSendSMSCodeInLogin({
        type: ISendSMSCodeType.OldEmail,
        action: ISendSMSCodeAction.ChangeGA,
      });
      return true;
    } catch (e) {
      return false;
    }
  };

  const mobileSend = async () => {
    try {
      // await axios.post('/user/send/sendSmsCode', {
      //   type: 2,
      // });
      await userSendSMSCodeInLogin({
        type: ISendSMSCodeType.OldMobile,
        action: ISendSMSCodeAction.ChangeGA,
      });
      return true;
    } catch (e) {
      return false;
    }
  };

  return (
    <CenterContainer>
      <GANavbar title={intl.formatMessage({ defaultMessage: 'Change Google Authenticator' })} />
      <div className="flex flex-auto flex-col ">
        <div className="gradient-text1 text-shadow-block my-16 text-center font-title text-[32px] font-bold">
          <FormattedMessage defaultMessage="Change Google Authenticator" />
        </div>
        <form onSubmit={handleSubmit(submit)}>
          <div className="mx-auto flex max-w-[420px] flex-auto flex-col gap-4">
            {userQuery.data?.data?.emailAuth && (
              <>
                <div className="text-[16px] font-bold text-[#C2D7C7F6]">
                  <FormattedMessage defaultMessage="Email verification code" />
                </div>
                <TextInput
                  {...register('userEmailCode')}
                  placeholder={intl.formatMessage({ defaultMessage: 'Please enter the verification code' })}
                  suffix={<SendButton onClick={emailSend} />}
                />
                <div className="text-[14px] text-[#708077]">
                  <FormattedMessage
                    defaultMessage="Please enter the verification code received in your Aries trust {email} email."
                    values={{
                      email: userQuery.data?.data?.userEmail,
                    }}
                  />
                </div>
              </>
            )}
            {userQuery.data?.data?.mobileAuth && (
              <>
                <div className="text-[16px] font-bold text-[#C2D7C7F6]">
                  <FormattedMessage defaultMessage="Mobile verification code" />
                </div>
                <TextInput
                  {...register('userMobileCode')}
                  placeholder={intl.formatMessage({ defaultMessage: 'Please enter the verification code' })}
                  suffix={<SendButton onClick={mobileSend} />}
                />
                <div className="text-[14px] text-[#708077]">
                  <FormattedMessage
                    defaultMessage="Please enter the verification code received in your Aries trust {mobile}."
                    values={{
                      mobile: userQuery.data?.data?.userMobile,
                    }}
                  />
                </div>
              </>
            )}
            <div className="text-[16px] font-bold text-[#C2D7C7F6]">
              <FormattedMessage defaultMessage="Google Verification Code" />
            </div>
            <TextInput
              {...register('googleCode')}
              placeholder={intl.formatMessage({ defaultMessage: 'Please input the 6-digit Google verification code' })}
            />
            <div className="mt-[40px]">
              <Button block>{intl.formatMessage({ defaultMessage: 'Submit' })}</Button>
            </div>
          </div>
        </form>
        <div className="flex-auto" />
        <div className="gap-9 self-stretch px-8 py-12 pb-16">
          {/* <Divide /> */}
          {/* <ContactUs /> */}
          <ContactUsFooter />
        </div>
      </div>
    </CenterContainer>
  );
}
