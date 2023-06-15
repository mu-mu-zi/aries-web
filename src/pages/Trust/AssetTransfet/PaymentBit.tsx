import React, { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';
import Dropdown from '../../../components/Dropdown';
import PaymentRow from './PaymentRow';
import { useAllCoinInMainNetQuery, useAllMainNetsQuery } from '../../../api/trust/trust';
import { IMainNet, IMainNetCoin } from '../../../interfaces/base';
import { useAssetByCoinId } from '../../../api/assets/assets';
import QrCode from '../../../components/QrCode';
import { useAppSelector } from '../../../state';

export default function PaymentBit() {
  const { trustId } = useParams();
  // const mainNetListQuery = useAllMainNetsQuery();
  // const [mainNet, setMainNet] = useState<IMainNet>();
  // const mainNetCoinListQuery = useAllCoinInMainNetQuery({
  //   mainnetId: mainNet?.id,
  // });
  // const [coin, setCoin] = useState<IMainNetCoin>();
  const coinId = useAppSelector((state) => state.trust.assetTransfer.selectedCoinId);
  const addressQuery = useAssetByCoinId({
    mainnetCoinId: coinId,
    trustId: Number(trustId),
  });
  // const { t } = useTranslation();
  const intl = useIntl();

  // useEffect(() => setMainNet(mainNetListQuery.data?.data?.[0]), [mainNetListQuery.data?.data]);
  // useEffect(() => {
  //   const one = mainNetCoinListQuery.data?.data?.[0];
  //   if (one) { setCoin(one); }
  // }, [mainNetCoinListQuery.data?.data]);

  return (
    <div className="flex flex-col gap-4">
      <div className="text-[#C2D7C7F6] font-bold text-[16px]"><FormattedMessage defaultMessage="Receiving Information" /></div>
      {/* <div className="text-[#C2D7C7F6] font-bold"><FormattedMessage defaultMessage="Network" /></div> */}
      {/* <Dropdown */}
      {/*  title={mainNet?.name} */}
      {/*  items={mainNetListQuery.data?.data?.map((x) => x.name)} */}
      {/*  onSelected={(idx) => { */}
      {/*    setMainNet(mainNetListQuery.data?.data?.[idx]); */}
      {/*    setCoin(undefined); */}
      {/*  }} */}
      {/* /> */}
      {/* {mainNet && ( */}
      {/*  <> */}
      {/*    <div className="text-[#C2D7C7F6] font-bold"><FormattedMessage defaultMessage="Asset Classes" /></div> */}
      {/*    <Dropdown */}
      {/*      title={coin?.name} */}
      {/*      items={mainNetCoinListQuery.data?.data?.map((x) => x.name)} */}
      {/*      onSelected={(idx) => { */}
      {/*        setCoin(mainNetCoinListQuery.data?.data?.[idx]); */}
      {/*      }} */}
      {/*    /> */}
      {/*  </> */}
      {/* )} */}
      {addressQuery.data?.data && (
        <>
          <PaymentRow
            title={intl.formatMessage({ defaultMessage: 'Digital Asset Address' })}
            value={addressQuery.data?.data}
            canCopy
          />
          <div className="grid place-items-center p-3 bg-[#3B5649] shadow-btn rounded-xl self-start">
            <QrCode text={addressQuery.data?.data} size={136} />
          </div>
        </>
      )}
    </div>
  );
}
