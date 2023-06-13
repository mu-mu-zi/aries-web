import React, { ReactNode } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import VerifyStatusRow, { VerifyStatusRowStatus } from './VerifyStatusRow';
import digitalIcon from '../../assets/icon/digital_account.svg';
import { TrustDetail } from '../../interfaces/trust';
import CopyIcon from '../../views/CopyIcon';
import QrCode from '../../components/QrCode';
import icon2 from '../../assets/icon/icon_coin_company.svg';
import icon3 from '../../assets/icon/icon_coin_bank.svg';
import icon4 from '../../assets/icon/icon_coin_exchange.svgicon_coin_exchange.svg';

export function Text({ children }: { children?: ReactNode }) {
  return <div className="gradient-text1 text-[20px] font-[400]">{children}</div>;
}

export default function CompletionBitStep({ trust }: { trust: TrustDetail }) {
  const intl = useIntl();

  return (
    <div className="flex flex-col gap-4 text-[20px]">
      <div className="gradient-block1 flex h-[70px] flex-row items-center justify-between rounded-xl px-8 shadow-block">
        <div className="gradient-text1 font-bold">
          <FormattedMessage defaultMessage="Initial Entrustment Amount" />
        </div>
        <div className="gradient-text1 text-[20px]">
          {trust.transferredAssets && trust.coinName ? `${trust.transferredAssets} ${trust.coinName}` : '--'}
        </div>
      </div>
      <div className="flex flex-col overflow-clip rounded-xl shadow-block">
        <div className="gradient-block1 flex h-[70px] flex-row items-center justify-between px-8">
          <div className="gradient-text1 font-bold">
            <FormattedMessage defaultMessage="Digital Asset Injection" />
          </div>
        </div>
        <div className="flex flex-col gap-4 bg-[#314C40] p-8">
          <div className="flex flex-row justify-between">
            <Text>
              <FormattedMessage defaultMessage="Network" />
            </Text>
            <Text>{trust.mainne}</Text>
          </div>
          <div className="flex flex-row justify-between">
            <Text>
              <FormattedMessage defaultMessage="Digital Asset" />
            </Text>
            <Text>{trust.coinName}</Text>
          </div>
          <div className="flex flex-row justify-between">
            <Text>
              <FormattedMessage defaultMessage="Digital Asset Address" />
            </Text>
            <div className="flex flex-row gap-2">
              <Text>{trust.safeHeronAddress}</Text>
              {trust.safeHeronAddress && <CopyIcon text={trust.safeHeronAddress} />}
            </div>
          </div>
          <div className="flex flex-row justify-between">
            <Text>
              <FormattedMessage defaultMessage="QR Code" />
            </Text>
            <div className="gradient-block1 grid place-items-center rounded-xl p-3 shadow-btn">
              {trust.safeHeronAddress && <QrCode text={trust.safeHeronAddress} size={136} />}
            </div>
          </div>
        </div>
      </div>
      {/* <div */}
      {/*  className="text-[#C39770] text-[20px] text-center font-title py-4" */}
      {/* > */}
      {/*  <FormattedMessage defaultMessage="We are in the process of setting up your account..." /> */}
      {/* </div> */}
      {/* <div className="flex flex-col gap-2 self-stretch"> */}
      {/*  {trust.trustCompanyModel?.companyType === 1 ? ( */}
      {/*    <> */}
      {/*      <VerifyStatusRow */}
      {/*        icon={digitalIcon} */}
      {/*        title={intl.formatMessage({ defaultMessage: 'Digital asset account' })} */}
      {/*        status={VerifyStatusRowStatus.Success} */}
      {/*      /> */}
      {/*      <VerifyStatusRow */}
      {/*        icon={icon2} */}
      {/*        title={intl.formatMessage({ defaultMessage: 'Trust Asset Holding Company' })} */}
      {/*        status={VerifyStatusRowStatus.Opening} */}
      {/*      /> */}
      {/*      <VerifyStatusRow */}
      {/*        icon={icon3} */}
      {/*        title={intl.formatMessage({ defaultMessage: 'Bank Account' })} */}
      {/*        status={VerifyStatusRowStatus.NotOpen} */}
      {/*      /> */}
      {/*      <VerifyStatusRow */}
      {/*        icon={icon4} */}
      {/*        title={intl.formatMessage({ defaultMessage: 'Exchange Account' })} */}
      {/*        status={VerifyStatusRowStatus.NotOpen} */}
      {/*      /> */}
      {/*    </> */}
      {/*  ) : ( */}
      {/*    <> */}
      {/*      <VerifyStatusRow */}
      {/*        icon={digitalIcon} */}
      {/*        title={intl.formatMessage({ defaultMessage: 'Digital asset account' })} */}
      {/*        status={VerifyStatusRowStatus.Success} */}
      {/*      /> */}
      {/*      <VerifyStatusRow */}
      {/*        icon={icon2} */}
      {/*        title={intl.formatMessage({ defaultMessage: 'Trust Asset Holding Company' })} */}
      {/*        status={VerifyStatusRowStatus.Success} */}
      {/*      /> */}
      {/*      <VerifyStatusRow */}
      {/*        icon={icon3} */}
      {/*        title={intl.formatMessage({ defaultMessage: 'Bank Account' })} */}
      {/*        status={VerifyStatusRowStatus.Opening} */}
      {/*      /> */}
      {/*      <VerifyStatusRow */}
      {/*        icon={icon4} */}
      {/*        title={intl.formatMessage({ defaultMessage: 'Exchange Account' })} */}
      {/*        status={VerifyStatusRowStatus.Opening} */}
      {/*      /> */}
      {/*    </> */}
      {/*  )} */}
      {/* </div> */}
    </div>
  );
}
