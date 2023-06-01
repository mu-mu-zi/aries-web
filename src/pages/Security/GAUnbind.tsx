import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
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

export default function GAUnbind() {
  const { t } = useTranslation();
  const valid = z.object({
    emailCode: z.string().optional(),
    mobileCode: z.string().optional(),
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

  const submit = async (data: FormValid) => {
    try {
      const resp = await axios.post('/user/user/unbindingGoogleAuthenticator', data);
      const ticket = resp.data as string;
      /* 跳转到绑定 */
      navigate('/personal/gaChangeScan', {
        state: {
          ticket,
        },
      });
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
      <GANavbar title={t('Change Google Authenticator')} />
      <div className="flex-auto flex flex-col ">
        <div className="gradient-text1 my-16 text-center font-title font-bold text-[32px]">{t('Change Google Authenticator')}</div>
        <form onSubmit={handleSubmit(submit)}>
          <div className="flex flex-col flex-auto max-w-[420px] mx-auto gap-4">
            {userQuery.data?.data?.emailAuth && (
              <>
                <div className="text-[#C2D7C7F6] text-[16px] font-bold">{t('Email verification code')}</div>
                <TextInput
                  {...register('emailCode')}
                  placeholder="Please enter the verification code"
                  suffix={<SendButton onClick={emailSend} />}
                />
                {/* todo: 邮箱需要修改 */}
                <div className="text-[#708077] text-[14px]">Please enter the verification code received in your Aries trust company@Gmail.com email.</div>
              </>
            )}
            {userQuery.data?.data?.mobileAuth && (
              <>
                <div className="text-[#C2D7C7F6] text-[16px] font-bold">{t('Mobile verification code')}</div>
                <TextInput
                  {...register('mobileCode')}
                  placeholder="Please enter the verification code"
                  suffix={<SendButton onClick={mobileSend} />}
                />
              </>
            )}
            <div className="text-[#C2D7C7F6] text-[16px] font-bold">{t('Google Captcha')}</div>
            <TextInput {...register('googleCode')} placeholder="Please enter the google verification code" />
            <div className="mt-[40px]">
              <Button block>Submit</Button>
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
