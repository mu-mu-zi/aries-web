import React, { useEffect } from 'react';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import ModalContainer from '../../views/ModalContainer';
import ModalNav from '../../views/ModalContainer/ModalNav';
import TextInput from '../../components/TextInput';
import Select from '../../components/Select';
import Dropdown from '../../components/Dropdown';
import Divide from '../../components/Divide';
import ContactUs from '../SignIn/ContactUs';
import Button from '../../components/Button';
import { useUserInfoQuery } from '../../api/user/user';
import ContactUsFooter from '../../views/ContactUsFooter';

export default function EditPersonal({ onClose }: {
  onClose?(): void
}) {
  const { t } = useTranslation();
  const [isMeal, setIsMeal] = React.useState(true);
  const valid = z.object({
    gender: z.boolean().optional(),
    nickname: z.string().nonempty(),
    surname: z.string().nonempty(),
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
  const queryClient = useQueryClient();
  const userQuery = useUserInfoQuery();

  const submit = async (data: FormValid) => {
    await axios.request({
      url: '/user/user/addNickname',
      method: 'get',
      params: data,
    });
    onClose?.();
    await queryClient.invalidateQueries(['user']);
  };

  useEffect(() => {
    const user = userQuery.data?.data;
    if (user) {
      setValue('gender', user.gender);
      setValue('nickname', user.userName);
      setValue('surname', user.surname);
    }
  }, [userQuery.data?.data]);

  return (
    <ModalContainer>
      <ModalNav title="Edit personal information" onClose={onClose} />
      <form onSubmit={handleSubmit(submit)}>
        <div className="flex flex-col gap-4">
          <div className="flex flex-row gap-4">
            <label className="flex-1 flex flex-col gap-4">
              <div className="fle font-bold text-[#C2D7C7F6] text-[16px]">FirstName</div>
              <TextInput {...register('nickname')} placeholder="firstname" maxLength={15} />
            </label>
            <label className="flex-1 flex flex-col gap-4">
              <div className="flex font-bold text-[#C2D7C7F6] text-[16px]">LastName</div>
              <TextInput {...register('surname')} placeholder="lastname" maxLength={15} />
            </label>
          </div>
          <label className="flex flex-col gap-4">
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
          <div className="mt-8 self-center w-[420px]">
            <Button block>{t('Confirm')}</Button>
          </div>
        </div>
      </form>
      <div className="mt-12 w-full self-stretch">
        {/* <Divide /> */}
        {/* <ContactUs /> */}
        <ContactUsFooter />
      </div>
    </ModalContainer>
  );
}
