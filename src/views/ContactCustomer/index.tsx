import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import GANavbar from '../../pages/SignIn/GANavbar';
import logo from '../../assets/icon/bakcup_key_logo.svg';
import Copy from '../Icons/Copy';
import Button from '../../components/Button';
import Divide from '../../components/Divide';
import ContactUs from '../../pages/SignIn/ContactUs';
import TextInput from '../../components/TextInput';
import TextArea from '../../components/TextArea';
import PhotoEmailSwitch from '../../components/PhotoEmailSwitch';
import Select from '../../components/Select';
import CenterContainer from '../CenterContainer';
import { useAreaCodeListQuery } from '../../api/base/areaCode';
import Dropdown from '../../components/Dropdown';

export default function ContactCustomer() {
  const navigate = useNavigate();
  const [isPhone, setIsPhone] = useState(true);
  const areaCodeListQuery = useAreaCodeListQuery();
  const valid = z.object({
    contactName: z.string().optional(),
    account: z.string().nonempty(),
    areaCodeId: z.number().optional(),
    problemDescription: z.string().nonempty(),
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

  useEffect(() => {
    setValue('areaCodeId', areaCodeListQuery.data?.data?.[0].id);
  }, [areaCodeListQuery.data?.data]);

  const submit = async (data: FormValid) => {
    try {
      await axios.post('/trust/contactPlatform/submitFeedback', {
        ...data,
        contactEmail: isPhone ? undefined : data.account,
        contactMobile: isPhone ? data.account : undefined,
      });
      navigate(-1);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <CenterContainer>
      <GANavbar title="Cancel" />
      <div className="flex flex-col items-center">
        <form onSubmit={handleSubmit(submit)}>
          <div className="item-center flex w-[418px] flex-col self-center py-[64px]">
            <div className="text-shadow-block font-blod gradient-text1 text-center font-title text-[32px] leading-[36px]">
              Contact customer service
            </div>
            <div className="mt-16 flex flex-col gap-4">
              <div className="flex flex-row gap-2">
                {/* <div className="gradient-text1">*</div> */}
                <div className="font-blod text-[#c2d7c7]">Name</div>
              </div>
              <TextInput placeholder="Please enter your name" {...register('contactName')} />
              <div className="flex flex-row gap-2">
                <div className="gradient-text1">*</div>
                <div className="font-blod text-[#c2d7c7]">Description</div>
              </div>
              <TextArea {...register('problemDescription')} />
              <div className="flex flex-row gap-2">
                <div className="gradient-text1">*</div>
                <div className="font-blod text-[#c2d7c7]">Contact</div>
              </div>
              <PhotoEmailSwitch onSelected={setIsPhone} />
              <div className="flex flex-row gap-2">
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
                <TextInput block className="w-full" placeholder="Please input your email" type="text" {...register('account')} />
              </div>
            </div>
            <div className="mt-[40px] flex flex-row gap-4">
              <Button size="medium" block type="submit">
                Confirm
              </Button>
            </div>
            <div className="text-[#708077] text-[14px] leading-[16px] mt-10">
              The application will be processed within one working day, please keep your communication channels open so that customer service can contact you in a timely manner. Additionally, you can also contact the platform through sales@aries-trust.com.
            </div>
          </div>
        </form>
      </div>
      {/* <div className="flex-auto" /> */}
      {/* <div className="mt-12 flex flex-col items-center gap-9 self-stretch pb-16 px-8"> */}
      {/*  <Divide /> */}
      {/*  <ContactUs /> */}
      {/* </div> */}
    </CenterContainer>
  );
}
