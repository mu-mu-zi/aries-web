import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import VerifyStatusRow, { VerifyStatusRowStatus } from './VerifyStatusRow';
import digitalIcon from '../../assets/icon/digital_account.svg';
import { TrustDetail } from '../../interfaces/trust';
import logo from '../../assets/icon/first_step_6.svg';
import icon2 from '../../assets/icon/icon_coin_company.svg';
import icon3 from '../../assets/icon/icon_coin_bank.svg';
import icon4 from '../../assets/icon/icon_coin_exchange.svgicon_coin_exchange.svg';

export default function CompletionFiatStep({ trust }: {
  trust: TrustDetail
}) {
  // const { t } = useTranslation();
  const intl = useIntl();

  return (
    <div className="flex flex-col items-center gap-6">
      <div>
        <img src={logo} />
      </div>
      <div className="text-[16px] text-center text-[#99AC9B]">
        <FormattedMessage defaultMessage="We will collect from you offline" />
      </div>
      <div className="mt-4" />
      <div
        className="text-[#C39770] text-[20px] text-center font-title py-4"
      >
        <FormattedMessage defaultMessage="We are in the process of setting up your account..." />
      </div>
      <div className="flex flex-col gap-2 self-stretch">
        {trust.trustCompanyModel?.companyType === 1 ? (
          <>
            <VerifyStatusRow
              icon={digitalIcon}
              title={intl.formatMessage({ defaultMessage: 'Digital asset account' })}
              status={VerifyStatusRowStatus.Success}
            />
            <VerifyStatusRow
              icon={icon2}
              title={intl.formatMessage({ defaultMessage: 'Trust Asset Holding Company' })}
              status={VerifyStatusRowStatus.Opening}
            />
            <VerifyStatusRow
              icon={icon3}
              title={intl.formatMessage({ defaultMessage: 'Bank Account' })}
              status={VerifyStatusRowStatus.NotOpen}
            />
            <VerifyStatusRow
              icon={icon4}
              title={intl.formatMessage({ defaultMessage: 'Exchange Account' })}
              status={VerifyStatusRowStatus.NotOpen}
            />
          </>
        ) : (
          <>
            <VerifyStatusRow
              icon={digitalIcon}
              title={intl.formatMessage({ defaultMessage: 'Digital asset account' })}
              status={VerifyStatusRowStatus.Success}
            />
            <VerifyStatusRow
              icon={icon2}
              title={intl.formatMessage({ defaultMessage: 'Trust Asset Holding Company' })}
              status={VerifyStatusRowStatus.Success}
            />
            <VerifyStatusRow
              icon={icon3}
              title={intl.formatMessage({ defaultMessage: 'Bank Account' })}
              status={VerifyStatusRowStatus.Opening}
            />
            <VerifyStatusRow
              icon={icon4}
              title={intl.formatMessage({ defaultMessage: 'Exchange Account' })}
              status={VerifyStatusRowStatus.Opening}
            />
          </>
        )}
      </div>
    </div>
  );
}
