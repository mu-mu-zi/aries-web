import React from 'react';
import Slider from 'react-slick';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import closeIcon from '../../../assets/icon/model_close.svg';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Button from '../../../components/Button';
import Divide from '../../../components/Divide';
import ContactUs from '../../SignIn/ContactUs';
import ModalContainer from '../../../views/ModalContainer';
import ModalNav from '../../../views/ModalContainer/ModalNav';
import { IInvestmentOrderRecode } from '../../../interfaces/trust';
import { useTrustDetailQuery } from '../../../api/trust/trust';
import ContactUsFooter from '../../../views/ContactUsFooter';
import useTrustPermission from '../../../hooks/useTrustRole';
import { addNotification } from '../../../utils/Notification';

export default function RecodeViewCredentials({ images, onClose }: {
  images: string[],
  onClose?(): void
}) {
  const { t } = useTranslation();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <ModalContainer>
      <ModalNav title="Credentials" onClose={onClose} />
      {/* <div className="mt-4 h-[1px] bg-[#3B5649]" /> */}
      <Slider {...settings} className="h-[400px] overflow-clip">
        {images.map((image) => (
          <div className="h-[400px] overflow-y-auto">
            <img src={image} className="block w-full object-contain" />
          </div>
        ))}
      </Slider>
      <div className="mt-16 flex flex-col gap-8">
        <div className="self-stretch"><ContactUsFooter /></div>
      </div>
    </ModalContainer>
  );
}
