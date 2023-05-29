import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import GANavbar from './GANavbar';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import Divide from '../../components/Divide';
import ContactUs from './ContactUs';
import CenterContainer from '../../views/CenterContainer';
import { useUserInfoQuery } from '../../api/user/user';
import Dropdown from '../../components/Dropdown';
import ContactUsFooter from '../../views/ContactUsFooter';
import { Trust } from '../../interfaces/trust';

export default function PersonalRealName() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const valid = z.object({
    firstName: z.string().nonempty(),
    lastName: z.string().nonempty(),
    gender: z.boolean().default(true),
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
  const userQuery = useUserInfoQuery();

  const submit = async (data: FormValid) => {
    try {
      await axios.request({
        url: '/user/user/addNickname',
        method: 'get',
        params: {
          surname: data.lastName,
          nickname: data.firstName,
          gender: data.gender,
        },
      });

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

      navigate(navTo, {
        replace: true,
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    setValue('gender', userQuery.data?.data?.gender ?? true);
  }, [userQuery.data?.data]);

  return (
    <CenterContainer>
      <GANavbar title={t('Cancel')} />
      <div className="item-center flex w-[420px] flex-col self-center pt-[64px]">
        <form onSubmit={handleSubmit(submit)}>
          <div className="text-shadow-block font-bold gradient-text1 text-center font-title text-[32px] leading-[36px]">
            {t('Personal Information')}
          </div>
          <div className="flex flex-row gap-4 mt-16">
            <div className="flex flex-col gap-4">
              <div className="font-bold text-[#c2d7c7]">{t('FirstName')}</div>
              <TextInput {...register('firstName')} placeholder="firstname" maxLength={15} />
            </div>
            <div className="flex flex-col gap-4">
              <div className="font-bold text-[#c2d7c7]">{t('LastName')}</div>
              <TextInput {...register('lastName')} placeholder="lastname" maxLength={15} />
            </div>
          </div>
          <label className="mt-4 flex flex-col gap-4">
            <div className="font-bold text-[#C2D7C7F6] text-[16px]">Gender</div>
            <Controller
              render={({ field }) => (
                <Dropdown
                  title={field.value ? t('Female') ?? '' : t('Male') ?? ''}
                  items={[
                    t('Female'),
                    t('Male'),
                  ]}
                  onSelected={(idx) => field.onChange(idx === 0)}
                />
              )}
              name="gender"
              control={control}
            />
          </label>
          <div className="mt-[40px] flex flex-row gap-4">
            <Button size="medium" block>
              {t('Confirm')}
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
    </CenterContainer>
  );
}
