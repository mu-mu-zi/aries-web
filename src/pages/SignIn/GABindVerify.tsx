import React, { useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query';
import { defineMessage, FormattedMessage, useIntl } from 'react-intl';
import GANavbar from './GANavbar';
import Button from '../../components/Button';
import Divide from '../../components/Divide';
import ContactUs from './ContactUs';
import TextInput from '../../components/TextInput';
import { useSendValidateCodeMutation } from '../../api/user/verify';
import Dropdown from '../../components/Dropdown';
// import { useAreaCodeListQuery } from '../../api/base/areaCode';
import SendButton from '../../views/SendButton';
import { useUserInfoQuery } from '../../api/user/user';
import ContactUsFooter from '../../views/ContactUsFooter';
import { Trust } from '../../interfaces/trust';
import { useAppDispatch, useAppSelector } from '../../state';
import { setToken } from '../../state/user';
import { useValidators } from '../../utils/zod';

export default function GABindVerify() {
  const navigate = useNavigate();
  const action = useAppDispatch();
  const location = useLocation();
  // const { t } = useTranslation();
  const intl = useIntl();
  const sendValidateCodeMutation = useSendValidateCodeMutation();
  const userQuery = useUserInfoQuery();
  const { zodRequired } = useValidators();
  const valid = z.object({
    securityCode: zodRequired(),
    googleCaptcha: zodRequired(),
  });
  // const areaCodeListQuery = useAreaCodeListQuery();
  type FormValid = z.infer<typeof valid>;
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    clearErrors,
    trigger,
    getValues,
    control,
  } = useForm<FormValid>({
    resolver: zodResolver(valid),
  });
  const queryClient = useQueryClient();
  const isPhone = useMemo(() => !!location.state?.areaCodeId, [location.state?.areaCodeId]);
  const lan = useAppSelector((state) => state.app.language);

  useEffect(() => clearErrors(), [lan]);

  const sendValidCode = async () => {
    try {
      /* 验证账号 */
      const { account, areaCodeId } = location.state;
      if (!account) return false;
      await axios.post('/user/send/login/sendSmsCode', {
        account,
        type: areaCodeId ? 2 : 1,
        areaCodeId,
      });
      return true;
    } catch (e) {
      return false;
    }
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
      areaCodeId,
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
      // localStorage.setItem('TOKEN', token);
      action(setToken(token));
      await queryClient.removeQueries();
      /* 这里需要检查是否设置你用户名，如果没有设置需要跳转到指定页面 */

      /*
        * 判断信托列表
        * */
      const trustResp = await axios.get<Trust[]>('/trust/trust/list');
      const trustList = trustResp.data ?? [];
      let navTo = '/';
      /* 无信托 */
      if (trustList.length === 1) {
        /* 进入引导 */
        if (trustList[0].trustStatus === 1) {
          navTo = `/first/${trustList[0].trustId}/KycVerify`;
        } else if (trustList[0].trustStatus === 21) {
          navTo = `/first/${trustList[0].trustId}/welcome`;
        } else if (trustList[0].trustStatus === 2) {
          navTo = '/my';
        }
      } else {
        navTo = '/my';
      }

      navigate('/status', {
        state: {
          title: defineMessage({ defaultMessage: 'Binding Google Authenticator' }),
          description: defineMessage({ defaultMessage: 'Congratulations! You have successfully bound Google Authenticator.' }),
          navTo: location.state.userName ? navTo : '/personalRealName',
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
          title={intl.formatMessage({ defaultMessage: 'Binding Google Authenticator' })}
          description={intl.formatMessage({ defaultMessage: 'Google Authenticator is a commonly used identity verification app. After binding, you can obtain verification codes to enhance the security of your account.' })}
        />
        {/* {location.state?.areaCodeId} */}
        {/* {location.state?.account} */}
        <div className="item-center flex w-[420px] flex-col self-center pt-[64px]">
          <form onSubmit={handleSubmit(submit)}>
            <div
              className="text-shadow-block font-bold gradient-text1 text-center font-title text-[32px] leading-[36px]"
            >
              <FormattedMessage defaultMessage="Verify Identity" />
            </div>
            <div className="mt-16 flex flex-col gap-4">
              <div
                className="font-bold text-[#c2d7c7]"
              >
                {isPhone ? <FormattedMessage defaultMessage="Phone Verification Code" />
                  : <FormattedMessage defaultMessage="Email Verification Code" />}
              </div>
              <TextInput
                placeholder={intl.formatMessage({ defaultMessage: 'Please enter the verification code' })}
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
              {!isPhone && (
                <div className="text-[14px] leading-[16px] text-[#708077]">
                  {/* {t(`To ensure the security of your funds and account, please enter the verification code received in your Aries trust ${location.state?.account} email.`)} */}
                  <FormattedMessage
                    defaultMessage="In order to ensure the safety of your asset and account, please enter the verification code received by your email {account}"
                    values={{ account: location.state?.account }}
                  />
                </div>
              )}
              {isPhone && (
                <div className="text-[14px] leading-[16px] text-[#708077]">
                  {/* {t(`To ensure the security of your funds and account, please enter the verification code received in your Aries trust ${location.state?.account} .`)} */}
                  <FormattedMessage
                    defaultMessage="In order to ensure the safety of your asset and account, please enter the verification code received by your phone number {account}"
                    values={{ account: location.state?.account }}
                  />
                </div>
              )}
              <div className="font-bold text-[#c2d7c7]"><FormattedMessage defaultMessage="Google Verification Code" /></div>
              <TextInput
                {...register('googleCaptcha')}
                placeholder={intl.formatMessage({ defaultMessage: 'Please input the 6-digit Google verification code' })}
              />
            </div>
            <div className="mt-[40px] flex flex-row gap-4">
              <Button type="button" onClick={() => navigate(-1)} size="medium" block>
                <FormattedMessage defaultMessage="Cancel" />
              </Button>
              <Button size="medium" block type="submit" disabled={!isValid}>
                <FormattedMessage defaultMessage="Next" />
              </Button>
            </div>
          </form>
        </div>
        <div className="flex-auto" />
        <div className="mt-12 self-stretch px-8 pb-16">
          {/* <Divide /> */}
          {/* <ContactUs /> */}
          <ContactUsFooter />
        </div>
      </div>
    </div>
  );
}
