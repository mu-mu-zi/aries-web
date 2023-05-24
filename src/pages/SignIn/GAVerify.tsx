import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import GANavbar from './GANavbar';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import Divide from '../../components/Divide';
import ContactUs from './ContactUs';
import CenterContainer from '../../views/CenterContainer';

export default function GAVerify() {
  const { t } = useTranslation();
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
      const resp = await axios.post('/user/userSecurity/securityVerification', {
        userEmail: areaCodeId ? undefined : account,
        userMobile: areaCodeId ? account : undefined,
        areaCodeId,
        googleCode: data.googleCode,
        verificationType: 1,
      });
      const ticker = resp.data.ticker as string;
      const loginResp = await axios.post('/auth/ariesToken/login', {
        account,
        ticker,
      });
      const token = loginResp.data as string;
      if (token) {
        localStorage.setItem('TOKEN', token);
        await queryClient.invalidateQueries();
      }
      navigate('/', {
        replace: true,
      });
    }
  };

  return (
    <CenterContainer>
      <form onSubmit={handleSubmit(submit)}>
        <div className="flex flex-col">
          <GANavbar title={t('Cancel')} />
          <div className="item-center flex w-[418px] flex-col self-center pt-[64px]">
            <div className="text-shadow-block font-blod gradient-text1 text-center font-title text-[32px] leading-[36px]">
              {t('Security verification')}
            </div>
            <div className="mt-16 flex flex-col gap-4">
              <div className="font-blod text-[#c2d7c7]">
                {t('Please enter the 6-digit Google security code')}
              </div>
              <TextInput {...register('googleCode')} maxLength={6} />
            </div>
            <div className="mt-[40px] flex flex-row gap-4">
              <Button size="medium" block>
                {t('Confirm')}
              </Button>
            </div>
          </div>
          <div className="flex-auto" />
          <div className="mt-12 flex flex-col items-center gap-9 self-stretch px-8 pb-16">
            <Divide />
            <ContactUs />
          </div>
        </div>
      </form>
    </CenterContainer>
  );
}
