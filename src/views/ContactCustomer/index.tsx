import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { FormattedMessage, useIntl } from 'react-intl';
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
// import { useAreaCodeListQuery } from '../../api/base/areaCode';
import Dropdown from '../../components/Dropdown';
import { useTrustContactEmailQuery } from '../../api/base/email';
import FooterNote from '../FooterNote';
import AreaSelect from '../../components/AreaSelect';

export default function ContactCustomer() {
  // const { t } = useTranslation();
  const intl = useIntl();
  const navigate = useNavigate();
  const [isPhone, setIsPhone] = useState(true);
  // const areaCodeListQuery = useAreaCodeListQuery();
  const valid = z.object({
    contactName: z.string().optional(),
    account: isPhone ? z.string().regex(/^\d+$/) : z.string().email(),
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
  const { trustId } = useParams();
  const location = useLocation();
  const emailQuery = useTrustContactEmailQuery(
    { trustId },
  );

  // useEffect(() => {
  //   setValue('areaCodeId', areaCodeListQuery.data?.data?.[0].id);
  // }, [areaCodeListQuery.data?.data]);
  useEffect(() => {
    setValue('account', '');
    clearErrors('account');
  }, [isPhone]);

  const submit = async (data: FormValid) => {
    try {
      await axios.post('/trust/contactPlatform/submitFeedback', {
        ...data,
        contactEmail: isPhone ? undefined : data.account,
        contactMobile: isPhone ? data.account : undefined,
      });
      navigate('/status', {
        replace: true,
        state: {
          title: intl.formatMessage({ defaultMessage: 'Submit successfully' }),
          description: intl.formatMessage({ defaultMessage: 'Applications will be processed within 1 business day, please keep it open for customer service to contact you.' }),
          navTo: '/contactCustomer',
        },
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <CenterContainer>
        <GANavbar title={intl.formatMessage({ defaultMessage: 'Cancel' })} />
        <div className="flex flex-col items-center">
          <form onSubmit={handleSubmit(submit)}>
            <div className="item-center flex w-[420px] flex-col self-center py-[64px]">
              <div
                className="text-shadow-block font-bold gradient-text1 text-center font-title text-[32px] leading-[36px]"
              >
                <FormattedMessage defaultMessage="Contact customer service" />
              </div>
              <div className="mt-16 flex flex-col gap-4">
                <div className="flex flex-row gap-2">
                  {/* <div className="gradient-text1">*</div> */}
                  <div className="font-bold text-[#c2d7c7]"><FormattedMessage defaultMessage="Name" /></div>
                </div>
                <TextInput
                  placeholder={intl.formatMessage({ defaultMessage: 'Please enter your name' })}
                  maxLength={30}
                  {...register('contactName')}
                />
                <div className="flex flex-row gap-2">
                  <div className="gradient-text1">*</div>
                  <div className="font-bold text-[#c2d7c7]">
                    <FormattedMessage defaultMessage="Description" />
                  </div>
                </div>
                <TextArea
                  maxLength={200}
                  placeholder={intl.formatMessage({ defaultMessage: 'Please provide a detailed explanation of the subject you would like to consult about.' })}
                  {...register('problemDescription')}
                />
                <div className="flex flex-row gap-2">
                  <div className="gradient-text1">*</div>
                  <div className="font-bold text-[#c2d7c7]">
                    <FormattedMessage defaultMessage="Contact" />
                  </div>
                </div>
                <PhotoEmailSwitch onSelected={setIsPhone} />
                <div className="flex flex-row gap-2">
                  {isPhone && (
                    // <div className="w-[160px]">
                    <Controller
                      render={({ field }) => (
                        <AreaSelect defaultId={field.value} onSelected={(x) => field.onChange(x.id)} />
                        // <Dropdown
                        //   block
                        //   items={areaCodeListQuery.data?.data?.map((x) => `+${x.code}`) ?? []}
                        //   title={`+${areaCodeListQuery.data?.data?.find((x) => x.id === field.value)?.code}` ?? ''}
                        //   onSelected={(idx) => field.onChange(areaCodeListQuery.data?.data?.[idx].id)}
                        // />
                      )}
                      name="areaCodeId"
                      control={control}
                    />
                    // </div>
                  )}
                  <TextInput
                    block
                    className="w-full"
                    placeholder={isPhone ? intl.formatMessage({ defaultMessage: 'Please input your phone' }) : intl.formatMessage({ defaultMessage: 'Please input your email' })}
                    {...register('account')}
                  />
                </div>
              </div>
              <div className="mt-[40px] flex flex-row gap-4">
                <Button size="medium" block type="submit">
                  <FormattedMessage defaultMessage="Confirm" />
                </Button>
              </div>
              <div className="text-[#708077] text-[14px] leading-[16px] mt-10">
                <FormattedMessage
                  defaultMessage="The application will be processed within one working day, please keep your communication channels open so that customer service can contact you in a timely manner. Additionally, you can also contact the platform through {email}."
                  values={{
                    email: emailQuery.data?.data,
                  }}
                />
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
      <FooterNote />
    </div>
  );
}
