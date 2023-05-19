import React from 'react';
import { useTranslation } from 'react-i18next';
import GANavbar from './GANavbar';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import Divide from '../../components/Divide';
import ContactUs from './ContactUs';

export default function PersonalRealName() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center pt-[38px]">
      <div className="gradient-bg2 flex max-w-[1200px] w-full min-h-[800px] flex-col overflow-clip  rounded-xl">
        <GANavbar title={t('Cancel')} />
        <div className="item-center flex w-[418px] flex-col self-center pt-[64px]">
          <div className="text-shadow-block font-blod gradient-text1 text-center font-title text-[32px] leading-[36px]">
            {t('Personal Information')}
          </div>
          <div className="mt-16 flex flex-col gap-4">
            <div className="font-blod text-[#c2d7c7]">{t('Please enter your real name')}</div>
            <TextInput />
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
    </div>
  );
}
