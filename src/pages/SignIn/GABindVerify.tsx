import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import GANavbar from './GANavbar';
import Button from '../../components/Button';
import Divide from '../../components/Divide';
import ContactUs from './ContactUs';
import TextInput from '../../components/TextInput';
import { useSendValidateCodeMutation } from '../../api/user/verify';
import Dropdown from '../../components/Dropdown';
import { useAreaCodeListQuery } from '../../api/base/areaCode';
import SendButton from '../../views/SendButton';
import { useUserInfoQuery } from '../../api/user/user';

export default function GABindVerify() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const sendValidateCodeMutation = useSendValidateCodeMutation();
  const userQuery = useUserInfoQuery();
  const valid = z.object({
    securityCode: z.string().nonempty(),
    googleCaptcha: z.string().nonempty(),
  });
  const areaCodeListQuery = useAreaCodeListQuery();
  type FormValid = z.infer<typeof valid>;
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    trigger,
    getValues,
    control,
  } = useForm<FormValid>({
    resolver: zodResolver(valid),
  });
  const queryClient = useQueryClient();

  const sendValidCode = async () => {
    /* 验证账号 */
    const { account } = location.state;
    if (!account) return false;
    // sendValidateCodeMutation.mutate({
    //   account,
    // });
    await axios.post('/user/send/login/sendSmsCode', {
      account,
      type: 1,
    });
    return true;
  };

  const submit = async (data: FormValid) => {
    const { account, areaCodeId } = location.state;
    if (!account) return;
    const formatData = {
      googleCode: data.googleCaptcha,
      isReset: false,
      userEmailCode: '',
      userEmail: '',
      userMobile: '',
      userMobileCode: '',
    };
    // 手机验证
    if (areaCodeId) {
      formatData.userMobile = account;
      formatData.userMobileCode = data.securityCode;
    } else {
      formatData.userEmail = account;
      formatData.userEmailCode = data.securityCode;
    }
    try {
      const resp = await axios.post('/user/userSecurity/verificationMethod', formatData);
      const ticker = resp?.data as string;
      const loginResp = await axios.post('/auth/ariesToken/login', {
        account,
        ticker,
      });
      const token = loginResp.data as string;
      /* 存储 token，刷新接口 */
      localStorage.setItem('TOKEN', token);
      await queryClient.invalidateQueries();
      /* 这里需要检查是否设置你用户名，如果没有设置需要跳转到指定页面 */
      navigate('/status', {
        state: {
          title: 'Bind Google Authenticator',
          description: 'Congratulations! You have successfully bound Google Authenticator.',
          navTo: userQuery.data?.data?.userName ? '/' : '/personalRealName',
        },
        replace: true,
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex flex-col items-center pt-[38px]">
      <div className="gradient-bg2 flex max-w-[1200px] w-full min-h-[800px] flex-col overflow-clip  rounded-xl">
        <GANavbar
          title={t('Bind Google Authentication')}
          description={t('Google Authenticator is a dynamic password tool, which works similar to SMS dynamic verification. After binding, it generates a dynamic verification code every 30 seconds, which can be used for security verification for login, modifying security settings and other operations.')}
        />
        <div className="item-center flex w-[420px] flex-col self-center pt-[64px]">
          <form onSubmit={handleSubmit(submit)}>
            <div className="text-shadow-block font-bold gradient-text1 text-center font-title text-[32px] leading-[36px]">
              {t('Verify identity')}
            </div>
            <div className="mt-16 flex flex-col gap-4">
              <div className="font-bold text-[#c2d7c7]">{t('Email verification code')}</div>
              <TextInput
                placeholder={t('Please enter the verification code') ?? ''}
                {...register('securityCode')}
                suffix={(
                  <SendButton onClick={sendValidCode} />
                  // <div
                  //   className="cursor-pointer font-bold gradient-text1 text-[20px] px-2"
                  //   onClick={sendValidCode}
                  // >
                  //   {t('Send')}
                  // </div>
                  )}
              />
              {/* <div className="flex flex-row gap-2"> */}
              {/*  /!* {isPhone ? <Select /> : null} *!/ */}
              {/*  {location.state.areaCodeId && areaCodeListQuery.data?.data && ( */}
              {/*    <Controller */}
              {/*      render={({ field }) => ( */}
              {/*        <Dropdown */}
              {/*          block */}
              {/*          items={areaCodeListQuery.data?.data?.map((x) => `+${x.code}`) ?? []} */}
              {/*          title={`+${areaCodeListQuery.data?.data?.find((x) => x.id === field.value)?.code}` ?? ''} */}
              {/*          onSelected={(idx) => field.onChange(areaCodeListQuery.data?.data?.[idx].id)} */}
              {/*        /> */}
              {/*      )} */}
              {/*      name="areaCodeId" */}
              {/*      control={control} */}
              {/*    /> */}
              {/*  )} */}
              {/*  <TextInput */}
              {/*    block */}
              {/*    className="w-full" */}
              {/*    {...register('account')} */}
              {/*    placeholder={isPhone ? 'Please input your phone' : 'Please input your email'} */}
              {/*    type="text" */}
              {/*  /> */}
              {/* </div> */}
              <div className="text-[14px] leading-[16px] text-[#708077]">
                {t('To ensure the security of your funds and account, please enter the verification code received in your Aries trust company@gmail.com email.')}
              </div>
              <div className="font-bold text-[#c2d7c7]">{t('Google Captcha')}</div>
              <TextInput
                {...register('googleCaptcha')}
                placeholder="Please enter the verification code"
              />
            </div>
            <div className="mt-[40px] flex flex-row gap-4">
              <Button type="button" onClick={() => navigate(-1)} size="medium" block>
                {t('Cancel')}
              </Button>
              <Button size="medium" block type="submit">
                {t('Next')}
              </Button>
            </div>
          </form>
        </div>
        <div className="flex-auto" />
        <div className="mt-12 flex flex-col items-center gap-9 self-stretch px-8 pb-16">
          <Divide />
          <ContactUs />
        </div>
      </div>
    </div>
  );
}
