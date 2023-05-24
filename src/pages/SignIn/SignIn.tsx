import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Await, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import logo from '../../assets/icon/logo_black.svg';
import Button from '../../components/Button';
import Divide from '../../components/Divide';
import TextInput from '../../components/TextInput';
import mobileIcon from '../../assets/icon/mobile_nor.svg';
import mobileSelIcon from '../../assets/icon/mobile_sel.svg';
import emailIcon from '../../assets/icon/email_nor.svg';
import emailSelIcon from '../../assets/icon/email_sel.svg';
import Select from '../../components/Select';
import ContactUs from './ContactUs';
import PhotoEmailSwitch from '../../components/PhotoEmailSwitch';
import { useGetUserInfoMutation, useSendValidateCodeMutation } from '../../api/user/verify';
import { IResponseData } from '../../interfaces/base';
import Dropdown from '../../components/Dropdown';
import { useAreaCodeListQuery } from '../../api/base/areaCode';
import SendButton from '../../views/SendButton';

export default function SignIn() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isPhone, setIsPhone] = useState(true);
  const sendValidateCodeMutation = useSendValidateCodeMutation();
  const getUserInfoMutation = useGetUserInfoMutation();
  const areaCodeListQuery = useAreaCodeListQuery();
  const valid = z.object({
    account: z.string().nonempty(),
    areaCodeId: z.number().optional(),
    securityCode: z.string().nonempty(),
  });
  type FormValid = z.infer<typeof valid>;
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    trigger,
    getValues,
    control,
    setValue,
  } = useForm<FormValid>({
    resolver: zodResolver(valid),
  });

  const sendValidCode = async () => {
    /* 验证账号 */
    try {
      await trigger('account', {
        shouldFocus: true,
      });
      // await sendValidateCodeMutation.mutate({
      //   account: getValues('account'),
      //   areaCodeId: getValues('areaCodeId'),
      // });
      await axios.post('/user/send/login/sendSmsCode', {
        account: getValues('account'),
        areaCodeId: getValues('areaCodeId'),
        type: isPhone ? 2 : 1,
      });
      return true;
    } catch (e) {
      return false;
    }
  };

  const submit = async (data: FormValid) => {
    try {
      const resp = await axios.post('/auth/ariesToken/getUserInfo', {
        userEmail: isPhone ? undefined : data.account,
        userMobile: isPhone ? data.account : undefined,
        securityCode: data.securityCode,
        areaCodeId: data.areaCodeId,
      });
      /* 是否进行 Google 验证 */
      console.log(resp);
      console.log(`Success => ${resp.data?.googleSecretAuth}`);
      if (resp.data?.googleSecretAuth) {
        navigate('/gaVerify', {
          state: {
            account: data.account,
            areaCodeId: isPhone ? data.areaCodeId : undefined,
          },
        });
      } else {
        navigate('/gaGuide', {
          state: {
            account: data.account,
            areaCodeId: isPhone ? data.areaCodeId : undefined,
          },
        });
      }
    } catch (e) {
      console.log(`e => ${e}`);
    }
  };

  useEffect(() => {
    setValue('areaCodeId', areaCodeListQuery.data?.data?.[0].id);
  }, [areaCodeListQuery.data?.data]);

  return (
    <div className="flex flex-col items-center pt-9">
      <div className="gradient-bg2 flex w-[580px] flex-col overflow-clip rounded-xl">
        {/* Logo */}
        <div className="gradient-border1 grid h-[102px] place-items-center">
          <img height="54px" src={logo} />
        </div>
        {/* Form */}
        <form onSubmit={handleSubmit(submit)}>
          <div className="flex flex-col gap-10 px-[80px] py-[64px]">
            <PhotoEmailSwitch onSelected={setIsPhone} />
            <div className="flex flex-row gap-2">
              {/* {isPhone ? <Select /> : null} */}
              {isPhone && areaCodeListQuery.data?.data && (
                <Controller
                  render={({ field }) => (
                    <Dropdown
                      block
                      items={areaCodeListQuery.data?.data?.map((x) => `+${x.code}`) ?? []}
                      title={`+${areaCodeListQuery.data?.data?.find((x) => x.id === field.value)?.code}` ?? ''}
                      onSelected={(idx) => field.onChange(areaCodeListQuery.data?.data?.[idx].id)}
                    />
                  )}
                  name="areaCodeId"
                  control={control}
                />
              )}
              <TextInput
                block
                className="w-full"
                {...register('account')}
                placeholder={isPhone ? t('Please input your phone') ?? '' : t('Please input your email') ?? ''}
                type="text"
              />
            </div>
            <div>
              <TextInput
                placeholder={t('Please enter the verification code') ?? ''}
                type="text"
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
            </div>
            <Button
              block
              type="submit"
              disabled={getUserInfoMutation.isLoading}
            >
              {t('Next')}
            </Button>
            <div className="text-[#99AC9B] leading-[15px] text-[14px]">
              {t('After mobile phone verification, the user will automatically log in without registration. Registration represents agreement to the')}
              {' '}
              <a href="#" className="gradient-text1">{t('Aries Digital Group Agreement')}</a>
              {' '}
              and
              {' '}
              <a href="#" className="gradient-text1">{t('Aries Digital Group Privacy Policy')}</a>
              .
            </div>
            <Divide />
            <ContactUs />
          </div>
        </form>
      </div>
    </div>
  );
}
