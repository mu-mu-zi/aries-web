import React from 'react';
import Slider from 'react-slick';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';
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
import { addNotification, addSuccessNotification } from '../../../utils/Notification';

export default function TransactionVoucher({ selected, onClose }: {
  selected: IInvestmentOrderRecode,
  onClose?(): void
}) {
  // const { t } = useTranslation();
  const { formatMessage } = useIntl();
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
  const { settlorPermission } = useTrustPermission({ trust: trustQuery.data?.data });
  const enterMutation = useMutation({
    mutationFn: () => axios.request({
      url: '/trust/trust/investment/bill/check',
      method: 'get',
      params: {
        billId: selected.billId,
        status: 2,
      },
    }),
    onSuccess: () => {
      addSuccessNotification({
        title: formatMessage({ defaultMessage: 'Verification successful' }),
      });
      queryClient.invalidateQueries(['trust']);
      onClose?.();
    },
  });

  return (
    <ModalContainer>
      {/* <div className="flex flex-row justify-between"> */}
      {/*  <div className="gradient-text1 font-bold text-[32px] font-title">{t('Transaction voucher')}</div> */}
      {/*  <img className="cursor-pointer" src={closeIcon} alt="" /> */}
      {/* </div> */}
      <ModalNav title={formatMessage({ defaultMessage: 'Transaction voucher' })} onClose={onClose} />
      {/* <div className="mt-4 h-[1px] bg-[#3B5649]" /> */}
      <Slider {...settings} className="h-[400px] overflow-clip">
        {selected.billCertificate.split(',').map((item, index) => (
          <div className="h-[400px] overflow-y-auto" key={item}>
            <img src={item} className="block w-full object-contain" alt="" />
          </div>
        ))}
        {/* <div> */}
        {/*  <h3>2</h3> */}
        {/* </div> */}
        {/* <div> */}
        {/*  <h3>3</h3> */}
        {/* </div> */}
      </Slider>
      <div className="mt-16 flex flex-col gap-8">
        <div className="w-[420px] self-center flex flex-row items-center gap-4">
          {/* 委托人才能核对账单 */}
          {selected.billStatus === 1 && settlorPermission && (
            <>
              <Button
                block
                disabled={enterMutation.isLoading}
                onClick={async () => {
                  // onClose?.();
                  enterMutation.mutate();
                }}
              >
                <FormattedMessage defaultMessage="Confirm" />
              </Button>
              {/* <Button */}
              {/*  block */}
              {/*  onClick={async () => { */}
              {/*    await axios.request({ */}
              {/*      url: '/trust/trust/investment/bill/check', */}
              {/*      method: 'get', */}
              {/*      params: { */}
              {/*        billId: selected.billId, */}
              {/*        status: 3, */}
              {/*      }, */}
              {/*    }); */}
              {/*    onClose?.(); */}
              {/*    await queryClient.invalidateQueries(['trust']); */}
              {/*  }} */}
              {/* > */}
              {/*  {t('Refuse')} */}
              {/* </Button> */}
            </>
          )}
        </div>
        <div className="self-stretch">
          <ContactUsFooter />
        </div>
        {/* <Divide /> */}
        {/* <ContactUs /> */}
      </div>
    </ModalContainer>
  );
}
