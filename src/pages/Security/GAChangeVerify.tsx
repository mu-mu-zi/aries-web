import React, { useEffect } from 'react';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';
import CenterContainer from '../../views/CenterContainer';
import CancelNav from '../../views/CancelNav';
import GANavbar from '../SignIn/GANavbar';
import TextInput from '../../components/TextInput';
import SendButton from '../../views/SendButton';
import Button from '../../components/Button';
import Divide from '../../components/Divide';
import ContactUs from '../SignIn/ContactUs';
import { useSendValidateCodeMutation } from '../../api/user/verify';
import { useUserInfoQuery } from '../../api/user/user';
// import { useAreaCodeListQuery } from '../../api/base/areaCode';
import Dropdown from '../../components/Dropdown';
import ContactUsFooter from '../../views/ContactUsFooter';

export default function GAChangeVerify() {
  // const { t } = useTranslation();
  const intl = useIntl();
  const valid = z.object({
    userEmailCode: z.string().optional(),
    userMobileCode: z.string().optional(),
    googleCode: z.string().nonempty(),
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
  const userQuery = useUserInfoQuery();
  const navigate = useNavigate();
  const location = useLocation();

  const submit = async (data: FormValid) => {
    try {
      await axios.post('/user/user/verificationMethod', {
        isReset: true,
        ticket: location.state?.ticket,
        ...data,
      });
      await queryClient.invalidateQueries();
      navigate(-2);
    } catch (e) {
      console.log(e);
    }
  };

  const emailSend = async () => {
    try {
      await axios.post('/user/send/sendSmsCode', {
        type: 1,
      });
      return true;
    } catch (e) {
      return false;
    }
  };

  const mobileSend = async () => {
    try {
      await axios.post('/user/send/sendSmsCode', {
        type: 2,
      });
      return true;
    } catch (e) {
      return false;
    }
  };

  return (
    <CenterContainer>
      <GANavbar title={intl.formatMessage({ defaultMessage: 'Change Google Authenticator' })} />
      <div className="flex-auto flex flex-col ">
        <div className="gradient-text1 my-16 text-center font-title font-bold text-[32px]"><FormattedMessage defaultMessage="Change Google Authenticator" /></div>
        <form onSubmit={handleSubmit(submit)}>
          <div className="flex flex-col flex-auto max-w-[420px] mx-auto gap-4">
            {userQuery.data?.data?.emailAuth && (
              <>
                <div className="text-[#C2D7C7F6] text-[16px] font-bold"><FormattedMessage defaultMessage="Email verification code" /></div>
                <TextInput
                  {...register('userEmailCode')}
                  placeholder={intl.formatMessage({ defaultMessage: 'Please enter the verification code' })}
                  suffix={<SendButton onClick={emailSend} />}
                />
                <div className="text-[#708077] text-[14px]">
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
                <div className="text-[#C2D7C7F6] text-[16px] font-bold">
                  <FormattedMessage defaultMessage="Mobile verification code" />
                </div>
                <TextInput
                  {...register('userMobileCode')}
                  placeholder={intl.formatMessage({ defaultMessage: 'Please enter the verification code' })}
                  suffix={<SendButton onClick={mobileSend} />}
                />
                <div className="text-[#708077] text-[14px]">
                  <FormattedMessage
                    defaultMessage="Please enter the verification code received in your Aries trust {mobile}."
                    values={{
                      mobile: userQuery.data?.data?.userMobile,
                    }}
                  />
                </div>
              </>
            )}
            <div className="text-[#C2D7C7F6] text-[16px] font-bold"><FormattedMessage defaultMessage="Google Captcha" /></div>
            <TextInput {...register('googleCode')} placeholder={intl.formatMessage({ defaultMessage: 'Please enter the google verification code' })} />
            <div className="mt-[40px]">
              <Button block>{intl.formatMessage({ defaultMessage: 'Submit' })}</Button>
            </div>
          </div>
        </form>
        <div className="flex-auto" />
        <div className="self-stretch py-12 pb-16 gap-9 px-8">
          {/* <Divide /> */}
          {/* <ContactUs /> */}
          <ContactUsFooter />
        </div>
      </div>
    </CenterContainer>
  );
}
