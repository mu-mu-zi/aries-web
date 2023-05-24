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

export default function TransactionVoucher({ selected, onClose }: {
  selected: IInvestmentOrderRecode,
  onClose?(): void
}) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const { trustId } = useParams();
  const trustQuery = useTrustDetailQuery({ trustId: Number(trustId) });

  return (
    <ModalContainer>
      {/* <div className="flex flex-row justify-between"> */}
      {/*  <div className="gradient-text1 font-blod text-[32px] font-title">{t('Transaction voucher')}</div> */}
      {/*  <img className="cursor-pointer" src={closeIcon} alt="" /> */}
      {/* </div> */}
      <ModalNav title="Transaction voucher" onClose={onClose} />
      {/* <div className="mt-4 h-[1px] bg-[#3B5649]" /> */}
      <Slider {...settings} className="h-[400px] overflow-clip">
        <div className="h-[400px] overflow-y-auto">
          <img src={selected.billCertificate} className="block w-full object-contain" />
        </div>
        {/* <div> */}
        {/*  <h3>2</h3> */}
        {/* </div> */}
        {/* <div> */}
        {/*  <h3>3</h3> */}
        {/* </div> */}
      </Slider>
      <div className="mt-16 flex flex-col gap-8">
        <div className="w-[420px] self-center">
          {trustQuery.data?.data?.roleType! > 2 && (
            <Button
              block
              onClick={async () => {
                await axios.request({
                  url: '/trust/trust/investment/bill/check',
                  method: 'get',
                  params: {
                    billId: selected.billId,
                    status: 2,
                  },
                });
                onClose?.();
                await queryClient.invalidateQueries(['trust']);
              }}
            >
              {t('Confirm')}
            </Button>
          )}
        </div>
        <Divide />
        <ContactUs />
      </div>
    </ModalContainer>
  );
}
