import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';
import CenterContainer from '../../views/CenterContainer';
import GANavbar from '../SignIn/GANavbar';
import TextInput from '../../components/TextInput';
// import { useAreaCodeListQuery } from '../../api/base/areaCode';
import Button from '../../components/Button';
// import { useSendValidateCodeMutation } from '../../api/user/verify';
import SendButton from '../../views/SendButton';
import ContactUsFooter from '../../views/ContactUsFooter';
import AreaSelect from '../../components/AreaSelect';
import { useValidators } from '../../utils/zod';
import { useAppSelector } from '../../state';
import { useUserInfoQuery } from '../../api/user/user';
import { ISendSMSCodeAction, ISendSMSCodeType, userSendSMSCodeInLogin } from '../../api/base/send';

export default function ChangeMobile() {
  // const { t } = useTranslation();
  // const areaCodeListQuery = useAreaCodeListQuery();
  const intl = useIntl();
  const { zodRequired } = useValidators();
  const valid = z.object({
    areaCodeId: z.number(),
    mobile: zodRequired(),
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
  const useUserQuery = useUserInfoQuery();
  const navigate = useNavigate();
  const lan = useAppSelector((state) => state.app.language);

  useEffect(() => clearErrors(), [lan]);

  const sendValidCode = async () => {
    /* 验证账号 */
    try {
      await trigger('mobile', {
        shouldFocus: true,
      });
      // sendValidateCodeMutation.mutate({
      //   account: getValues('mobile'),
      //   areaCodeId: getValues('areaCodeId'),
      // });
      // await axios.post('/user/send/sendSmsCode', {
      //   account: getValues('mobile'),
      //   areaCodeId: getValues('areaCodeId'),
      //   type: 4,
      // });
      await userSendSMSCodeInLogin({
        account: getValues('mobile'),
        areaCodeId: getValues('areaCodeId'),
        type: ISendSMSCodeType.NewMobile,
        action: useUserQuery.data?.data?.mobileAuth ? ISendSMSCodeAction.ChangeMobile : ISendSMSCodeAction.BingMobile,
      });

      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  };

  // useEffect(() => {
  //   const codeId = areaCodeListQuery.data?.data?.[0].id;
  //   if (codeId) {
  //     setValue('areaCodeId', codeId);
  //   }
  // }, [areaCodeListQuery.data?.data]);

  const submit = async (data: FormValid) => {
    try {
      await axios.post('/user/user/updateCheck', data);
      navigate('/personal/verify', {
        state: {
          account: data.mobile,
          areaCodeId: data.areaCodeId,
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
            {useUserQuery.data?.data?.mobileAuth ? (
              <FormattedMessage defaultMessage="Change phone" />
            ) : (
              <FormattedMessage defaultMessage="Bind phone" />
            )}
          </div>
          <div className="flex flex-col gap-4">
            <div className="text-[16px] font-bold text-[#C2D7C7F6]">
              {useUserQuery.data?.data?.mobileAuth ? (
                <FormattedMessage defaultMessage="New Mobile Phone" />
              ) : (
                <FormattedMessage defaultMessage="Mobile Phone" />
              )}
            </div>
            <div className="flex flex-row gap-4">
              <Controller
                render={({ field }) => <AreaSelect defaultId={field.value} onSelected={(e) => field.onChange(e.id)} />}
                name="areaCodeId"
                control={control}
              />
              <div className="flex-auto">
                <TextInput
                  {...register('mobile')}
                  placeholder={intl.formatMessage({ defaultMessage: 'Please input your phone' })}
                  error={errors.mobile?.message}
                />
              </div>
            </div>
            <div className="text-[16px] font-bold text-[#C2D7C7F6]">
              {useUserQuery.data?.data?.mobileAuth ? (
                <FormattedMessage defaultMessage="New Mobile Verification Code" />
              ) : (
                <FormattedMessage defaultMessage="Mobile Verification Code" />
              )}
            </div>
            <div>
              <TextInput
                {...register('securityCode')}
                placeholder={intl.formatMessage({ defaultMessage: 'Please enter the verification code' })}
                suffix={<SendButton onClick={sendValidCode} />}
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
