import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query';
import { FormattedMessage, useIntl } from 'react-intl';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import Divide from '../../components/Divide';
import CenterContainer from '../../views/CenterContainer';
import ContactUs from '../SignIn/ContactUs';
import GANavbar from '../SignIn/GANavbar';
import ContactUsFooter from '../../views/ContactUsFooter';

export default function SCGAVerify() {
  // const { t } = useTranslation();
  const intl = useIntl();
  const navigate = useNavigate();
  const location = useLocation();
  const valid = z.object({
    googleCode: z.string().nonempty().max(6),
  });
  type FormValid = z.infer<typeof valid>;
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    trigger,
    getValues,
  } = useForm<FormValid>({
    resolver: zodResolver(valid),
  });
  const queryClient = useQueryClient();

  const submit = async (data: FormValid) => {
    const { account, areaCodeId } = location.state;
    if (account) {
      const resp = await axios.post('/user/user/securityVerification', {
        userEmail: areaCodeId ? undefined : account,
        userMobile: areaCodeId ? account : undefined,
        areaCodeId,
        googleCode: data.googleCode,
        verificationType: 2,
      });
      navigate('/personal', {
        replace: true,
      });
      queryClient.invalidateQueries();
    }
  };

  return (
    <CenterContainer>
      <form className="flex flex-col flex-1" onSubmit={handleSubmit(submit)}>
        <div className="flex flex-col flex-1">
          <GANavbar />
          <div className="item-center flex w-[420px] flex-col self-center pt-[64px]">
            <div className="text-shadow-block font-bold gradient-text1 text-center font-title text-[32px] leading-[36px]">
              <FormattedMessage defaultMessage="Security verification" />
            </div>
            <div className="mt-16 flex flex-col gap-4">
              <div className="font-bold text-[#c2d7c7]">
                <FormattedMessage defaultMessage="Please enter the 6-digit Google security code" />
              </div>
              <TextInput {...register('googleCode')} maxLength={6} />
            </div>
            <div className="mt-[40px] flex flex-row gap-4">
              <Button size="medium" block>
                <FormattedMessage defaultMessage="Confirm" />
              </Button>
            </div>
          </div>
          <div className="flex-1" />
          <div className="mt-12 self-stretch px-8 pb-16">
            {/* <Divide /> */}
            {/* <ContactUs /> */}
            <ContactUsFooter />
          </div>
        </div>
      </form>
    </CenterContainer>
  );
}
