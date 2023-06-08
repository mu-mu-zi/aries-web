import React from 'react';
import Slider from 'react-slick';
import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
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
import nextArrow from '../../../assets/icon/icon_rig.svg';
import prevArrow from '../../../assets/icon/icon_down.svg';
import Sider from '../../../components/Sider';

export default function RecodeViewCredentials({ images, onClose }: {
  images: string[],
  onClose?(): void
}) {
  // const { t } = useTranslation();
  const { formatMessage } = useIntl();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const [sliderIndex, setSliderIndex] = React.useState(0);

  return (
    <ModalContainer>
      <ModalNav title={formatMessage({ defaultMessage: 'Credentials' })} onClose={onClose} />
      {/* <div className="mt-4 h-[1px] bg-[#3B5649]" /> */}
      <Sider images={images} />
      {/* <Slider */}
      {/*  {...settings} */}
      {/*  nextArrow={<img src={nextArrow} />} */}
      {/*  prevArrow={<img src={prevArrow} />} */}
      {/*  className="mx-auto w-[90%]" */}
      {/*  afterChange={(i) => setSliderIndex(i)} */}
      {/*  appendDots={(dots) => ( */}
      {/*    <div className="">{dots}</div> */}
      {/*  )} */}
      {/*  customPaging={(i) => ( */}
      {/*    <div */}
      {/*      className={classNames('my-4 w-[8px] h-[8px] rounded-xl', i === sliderIndex ? 'gradient-border1' : 'bg-[#708077]')} */}
      {/*    /> */}
      {/*  )} */}
      {/* > */}
      {/*  {images.map((image) => ( */}
      {/*    <div className="h-[400px] overflow-y-auto"> */}
      {/*      <img src={image} className="block w-full object-contain" alt="" /> */}
      {/*    </div> */}
      {/*  ))} */}
      {/* </Slider> */}
      <div className="mt-16 flex flex-col gap-8">
        <div className="self-stretch"><ContactUsFooter /></div>
      </div>
    </ModalContainer>
  );
}
