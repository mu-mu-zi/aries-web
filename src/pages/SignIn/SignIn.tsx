import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Await, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FormattedMessage, useIntl } from 'react-intl';
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
// import { useAreaCodeListQuery } from '../../api/base/areaCode';
import SendButton from '../../views/SendButton';
import ContactUsFooter from '../../views/ContactUsFooter';
import AreaSelect from '../../components/AreaSelect';
import QrCode from '../../components/QrCode';
import { useValidators, zodEmail } from '../../utils/zod';
import { useAppSelector } from '../../state';

export default function SignIn() {
  // const { t } = useTranslation();
  const intl = useIntl();
  const navigate = useNavigate();
  const [isPhone, setIsPhone] = useState(true);
  const sendValidateCodeMutation = useSendValidateCodeMutation();
  const getUserInfoMutation = useGetUserInfoMutation();
  // const areaCodeListQuery = useAreaCodeListQuery();
  const { zodEmail, zodPhone, zodRequired } = useValidators();
  const valid = z.object({
    account: isPhone ? zodPhone() : zodEmail(),
    areaCodeId: z.number().optional(),
    securityCode: zodRequired(),
  });
  type FormValid = z.infer<typeof valid>;
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    clearErrors,
    trigger,
    getValues,
    control,
    setValue,
  } = useForm<FormValid>({
    resolver: zodResolver(valid),
  });
  const lan = useAppSelector((state) => state.app.language);

  useEffect(() => clearErrors(), [lan]);

  useEffect(() => {
    setValue('account', '');
    clearErrors('account');
  }, [isPhone]);

  const sendValidCode = async () => {
    /* 验证账号 */
    try {
      const result = await trigger('account', {
        shouldFocus: true,
      });
      if (result) {
        await axios.post('/user/send/login/sendSmsCode', {
          account: getValues('account'),
          areaCodeId: getValues('areaCodeId'),
          type: isPhone ? 2 : 1,
        });
        return true;
      }
      return false;
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
            userName: resp.data?.userName,
          },
        });
      }
    } catch (e) {
      console.log(`e => ${e}`);
    }
  };

  return (
    <div className="flex flex-col items-center pt-9 ">
      <div className="gradient-bg2 flex w-[580px] h-[800px] flex-col rounded-xl block-gradient-border">
        {/* Logo */}
        <div className="gradient-border1 grid h-[102px] place-items-center rounded-t-xl">
          <img height="54px" src={logo} />
        </div>
        {/* Form */}
        <form onSubmit={handleSubmit(submit)}>
          <div className="flex flex-col gap-10 px-[80px] py-[64px]">
            <PhotoEmailSwitch onSelected={setIsPhone} />
            <div className="flex flex-row gap-2">
              {isPhone && (
                <Controller
                  render={({ field }) => (
                    <AreaSelect
                      defaultId={field.value}
                      onSelected={(x) => field.onChange(x.id)}
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
                placeholder={isPhone ? intl.formatMessage({ defaultMessage: 'Please input your phone number' }) : intl.formatMessage({ defaultMessage: 'Please input your email address' })}
                type="text"
                error={errors.account?.message}
              />
            </div>
            <div>
              <TextInput
                placeholder={intl.formatMessage({ defaultMessage: 'Please enter the verification code' })}
                type="text"
                maxLength={6}
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
              size="large"
              type="submit"
              // disabled={!isValid}
            >
              <FormattedMessage defaultMessage="Next" />
            </Button>
            {/* todo: 国际化拆分 */}
            <div className="text-[#99AC9B] text-[14px]">
              {/* {t('After mobile phone verification, the user will automatically log in without registration. Registration represents agreement to the')} */}
              {/* {' '} */}
              {/* <a href="https://aries-trust.com/userPolicy" target="_blank" className="gradient-text1" rel="noreferrer">{t('Aries Digital Group Agreement')}</a> */}
              {/* {' '} */}
              {/* and */}
              {/* {' '} */}
              {/* <a href="https://aries-trust.com/privacyPolicy" target="_blank" className="gradient-text1" rel="noreferrer">{t('Aries Digital Group Privacy Policy')}</a> */}
              {/* After verification, users will be automatically logged in. Registration implies your agreement to Aries' {userPolicy} and {privacyPolicy} */}
              <FormattedMessage
                defaultMessage="After verification, users will be automatically logged in. Registration implies your agreement to Aries' {userPolicy} and {privacyPolicy}."
                values={{
                  userPolicy: (
                    <a
                      href="https://aries-trust.com/userPolicy"
                      target="_blank"
                      className="gradient-text1"
                      rel="noreferrer"
                    >
                      <FormattedMessage defaultMessage="User Agreement" />
                    </a>),
                  privacyPolicy: (
                    <a
                      href="https://aries-trust.com/privacyPolicy"
                      target="_blank"
                      className="gradient-text1"
                      rel="noreferrer"
                    >
                      <FormattedMessage defaultMessage="Privacy Policy" />
                    </a>),
                }}
              />
            </div>
            <div className="flex-auto" />

            {/* <Divide /> */}
            {/* <ContactUs /> */}
          </div>
        </form>
        <div className="self-stretch">
          <ContactUsFooter />
        </div>
      </div>
    </div>
  );
}
