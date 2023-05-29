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
import ContactUsFooter from '../../views/ContactUsFooter';
import { useMyTrustQuery } from '../../api/trust/trust';
import { IResponseData } from '../../interfaces/base';
import { Trust } from '../../interfaces/trust';

export default function GAVerify() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const valid = z.object({
    googleCode: z.string().nonempty().max(6),
  });
  type FormValid = z.infer<typeof valid>;
  const trustListQuery = useMyTrustQuery();
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
        /*
        * 判断信托列表
        * */
        const trustResp = await axios.get<Trust[]>('/trust/trust/list');
        const trustList = trustResp.data ?? [];
        /* 无信托 */
        if (trustList.length === 1) {
          /* 进入引导 */
          if (trustList[0].trustStatus === 1) {
            navigate(`/first/${trustList[0].trustId}/KycVerify`, { replace: true });
          } else if (trustList[0].trustStatus === 21) {
            navigate(`/first/${trustList[0].trustId}/welcome`, { replace: true });
          } else if (trustList[0].trustStatus === 2) {
            navigate('/my', { replace: true });
          }
        } else {
          navigate('/my', { replace: true });
        }
      }
    }
  };

  return (
    <CenterContainer>
      <form onSubmit={handleSubmit(submit)}>
        <div className="flex-1 flex flex-col">
          <GANavbar title={t('Cancel')} />
          <div className="flex-auto item-center flex w-[420px] flex-col self-center pt-[64px]">
            <div
              className="text-shadow-block font-bold gradient-text1 text-center font-title text-[32px] leading-[36px]"
            >
              {t('Security verification')}
            </div>
            <div className="mt-16 flex flex-col gap-4">
              <div className="font-bold text-[#c2d7c7]">
                {t('Please enter the 6-digit Google security code')}
              </div>
              <TextInput
                {...register('googleCode')}
                maxLength={6}
                placeholder="Please enter the 6-digit Google security code"
              />
            </div>
            <div className="mt-[40px] flex flex-row gap-4">
              <Button size="medium" block>
                {t('Confirm')}
              </Button>
            </div>
          </div>
        </div>
      </form>
      <div className="flex-auto" />
      <div className="mt-12 self-stretch px-8 pb-16">
        {/* <Divide /> */}
        {/* <ContactUs /> */}
        <ContactUsFooter />
      </div>
    </CenterContainer>
  );
}
