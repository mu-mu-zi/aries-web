import React from 'react';
import Slider from 'react-slick';
import { useTranslation } from 'react-i18next';
import closeIcon from '../../../assets/icon/model_close.svg';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Button from '../../../components/Button';
import Divide from '../../../components/Divide';
import ContactUs from '../../SignIn/ContactUs';

export default function TransactionVoucher() {
  const { t } = useTranslation();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="flex flex-col bg-[#1A342F] p-8 rounded-xl max-w-[720px] w-full">
      <div className="flex flex-row justify-between">
        <div className="gradient-text1 font-blod text-[32px] font-title">{t('Transaction voucher')}</div>
        <img className="cursor-pointer" src={closeIcon} alt="" />
      </div>
      <div className="mt-4 h-[1px] bg-[#3B5649]" />
      <Slider {...settings} className="h-[400px]">
        <div>
          <h3>1</h3>
        </div>
        <div>
          <h3>2</h3>
        </div>
        <div>
          <h3>3</h3>
        </div>
      </Slider>
      <div className="mt-16 flex flex-col gap-8">
        <div className="w-[420px] self-center">
          <Button block>{t('Confirm')}</Button>
        </div>
        <Divide />
        <ContactUs />
      </div>
    </div>
  );
}
