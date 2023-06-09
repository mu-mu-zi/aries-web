import React, { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';
import moment from 'moment';
import CancelNav from '../../../views/CancelNav';
import Section, { SectionTitle } from './Section';
import ViewCredentials from './ViewCredentials';
import Dropdown from '../../../components/Dropdown';
import Hr from '../../../components/Hr';
import SimpleTable from '../../../views/SimpleTable';
import FeeIntroduction from './FeeIntroduction';
import { useExcessFeeListQuery, useTrustFeeListQuery } from '../../../api/trust/order';
import { useEstablishmentFeeListQuery, useExpenseRatioQuery, useTrustFeeStatisticsQuery } from '../../../api/trust/fee';
import { unixFormatTime } from '../../../utils/DateFormat';
import TextButton from '../../../components/TextButton';
import Modal from '../../../components/Modal';
import RecodeViewCredentials from '../AssetTransfet/RecodeViewCredentials';
import { ITrustEstablishment } from '../../../interfaces/trust';
import { allYears } from '../../../utils/year';
import useFeeYears from '../../../hooks/useFeeYears';
import NoCredentials from '../../../views/NoCredentials';
import { currencyUSDTFormat, ratioFormat } from '../../../utils/CurrencyFormat';

export default function EstablishmentFee() {
  const { trustId } = useParams();
  const intl = useIntl();
  const [page, setPage] = useState(1);
  const [year, setYear] = useState<number>(moment().year());
  const listQuery = useEstablishmentFeeListQuery({
    pageIndex: page,
    pageSize: 10,
    trustId: Number(trustId),
    year,
  });
  const statisticsQuery = useTrustFeeStatisticsQuery({
    trustId: Number(trustId),
    type: 3,
    year,
  });
  // const query = useTrustFeeListQuery({
  //   trustId: Number(trustId),
  // });
  // const currentFee = useMemo(() => query.data?.data?.find((x) => x.feeType === 3), [query.data?.data]);
  const years = useFeeYears();
  const [credentialsVisible, setCredentialsVisible] = useState(false);
  const [selected, setSelected] = useState<ITrustEstablishment>();
  const ratioQuery = useExpenseRatioQuery();
  return (
    <div className="flex flex-col gap-4">
      <CancelNav />
      <Section>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4 justify-between">
            <div className="flex flex-col gap-4">
              <SectionTitle
                title={(
                  <FormattedMessage
                    defaultMessage="Establishment Fee: {amount} {coinName}"
                    values={{
                      amount: currencyUSDTFormat(statisticsQuery?.data?.data?.amount),
                      coinName: statisticsQuery?.data?.data?.coinName,
                    }}
                  />
                )}
              />
            </div>
            <div className="max-w-[260px] w-full">
              <Dropdown
                title={`${year}`}
                items={years.map((x) => `${x}`)}
                onSelected={(idx) => setYear(years[idx])}
                block
              />
            </div>
          </div>
          <Hr />
          <SimpleTable
            columns={[
              {
                Header: intl.formatMessage({ defaultMessage: 'Time' }),
                accessor: (x) => unixFormatTime(x.createTimeStamp),
              },
              {
                Header: intl.formatMessage({ defaultMessage: 'Type' }),
                accessor: (x) => {
                  switch (x.billType) {
                    case 10:
                      return intl.formatMessage({ defaultMessage: 'Establishment fee' });
                    case 11:
                      return intl.formatMessage({ defaultMessage: 'Additional establishment fee' });
                    default:
                      return null;
                  }
                },
              },
              {
                Header: intl.formatMessage({ defaultMessage: 'Entrusted assets' }),
                accessor: (x) => `${x.trustCoinQuantity} ${x.coinName}`,
              },
              {
                Header: intl.formatMessage({ defaultMessage: 'Asset transfer amount' }),
                accessor: (x) => `${x.amount} ${x.coinName}`,
              },
              // {
              //   Header: 'Trust total amount',
              //   accessor: 'managementFeeApr',
              // },
              {
                Header: () => <div className="text-right"><FormattedMessage defaultMessage="Establishment Fee" /></div>,
                accessor: 'totalAmount',
                // eslint-disable-next-line react/prop-types
                Cell: ({ row }) => (
                  <div className="text-right">{`${-row.original.initialCost} ${row.original.coinName}`}</div>),
              },
              {
                Header: () => (<div className="text-right"><FormattedMessage defaultMessage="Reconciliation" /></div>),
                accessor: 'manag',
                // eslint-disable-next-line react/prop-types
                Cell: ({ row }) => (
                  <div className="flex justify-end">
                    {row.original.billCertificate ? (
                      <TextButton
                        className="text-right"
                        onClick={() => {
                          setSelected(row.original);
                          setCredentialsVisible(true);
                        }}
                      >
                        <FormattedMessage defaultMessage="View credentials" />
                      </TextButton>
                    ) : <NoCredentials />}
                  </div>
                ),
              },
            ]}
            data={listQuery.data?.data?.records}
            pagination={{
              pageIndex: page,
              pageSize: 10,
              total: listQuery.data?.data?.total ?? 0,
              onPageChanged(page: number) {
                setPage(page);
              },
            }}
          />
        </div>
      </Section>
      <FeeIntroduction
        title={intl.formatMessage({ defaultMessage: 'Establishment Fee' })}
        description={[
          // intl.formatMessage({ defaultMessage: 'The establishment fee refers to the fee that needs to be paid if additional funds are required to be invested during the operation of the trust plan. Our company sets the standard for establishment fees according to the contract, which is generally a certain percentage of the asset net value to ensure that the cost of the additional services provided to the trustor is covered.' }),
          // intl.formatMessage({ defaultMessage: 'Once you decide to add funds, we will deduct the corresponding fee from your trust account according to the contract. Similar to the payment method when establishing the trust plan, we will charge the corresponding additional establishment fee according to the actual amount of money added and the agreed ratio.' }),
          // intl.formatMessage({ defaultMessage: 'It is important to note that the additional establishment fee after opening a bank account will be directly deducted from the trust account. When adding establishment operations, you need to ensure that the balance of the trust account is sufficient to pay the required fees to avoid overdue or penalty fees. Please note that it is your responsibility to ensure that there are enough funds in your trust account to pay for any additional establishment payment obligations.' }),
          // intl.formatMessage({ defaultMessage: 'At the same time, we recommend that the trustor carefully understand the specific situation and regulations of the trust plan, clearly understand their risk tolerance and investment goals, and carefully review the relevant contract terms related to additional establishment to ensure that their legal rights and interests are not harmed. If you have any questions, you can always contact our professional trust manager for consultation.' }),
          // intl.formatMessage({ defaultMessage: 'The excess transfer fee refers to the transfer fee incurred when the trust property exceeds the set limit during the operation of the trust plan. We charge a handling fee of {ratio} for each excess transfer according to the contract, and this fee is calculated based on the token price at the time of the transfer. In order to facilitate the trustor to maintain assets and maintain asset appreciation, we specifically introduce the specific information about transfer fees.' }, {
          //   ratio: ratioFormat(ratioQuery.data?.data?.find((x) => x.type === 2)?.expenseRatio),
          // }),
          // intl.formatMessage({ defaultMessage: 'When the trust property exceeds the set limit for external transfers, we will charge a fee of {ratio} of the actual transfer amount. It is important to note that this fee is calculated based on the token price at the time of the transfer and will be paid annually according to the contract. At the same time, we will provide accurate information according to the contract, so that the trustor can better understand the relevant situation of the transfer fee.' }, {
          //   ratio: ratioFormat(ratioQuery.data?.data?.find((x) => x.type === 2)?.expenseRatio),
          // }),
          intl.formatMessage({ defaultMessage: 'The establishment fee refers to the additional fee of {ratio} that needs to be paid if you decide to add funds during the operation of the trust plan. Our company follows the contractual provisions to determine the standard for establishment fees, which is generally based on a certain percentage of the net asset value to ensure the cost coverage of the additional services provided to the settlor.' }, {
            ratio: ratioFormat(ratioQuery.data?.data?.find((x) => x.type === 2)?.expenseRatio),
          }),
          intl.formatMessage({ defaultMessage: 'Once you decide to add funds, the corresponding fee will be deducted from your trust account according to the contract. Similar to the payment method during the establishment of the trust plan, we will charge the additional establishment fee based on the actual amount of funds added and the agreed-upon ratio.' }),
          intl.formatMessage({ defaultMessage: 'It is important to note that the additional establishment fee will be directly deducted from your trust account after the bank account is opened. When conducting the additional establishment operation, you need to ensure that there are sufficient funds in your trust account to cover the required fees and avoid any overdue or late payment charges. Please be aware that it is your responsibility to ensure that there are enough funds in your trust account to fulfill any obligations regarding the payment of additional establishment fees.' }),
          intl.formatMessage({ defaultMessage: 'Additionally, we recommend that the settlor thoroughly understands the specific details and provisions of the trust plan, clarifies their risk tolerance and investment objectives before making any additional contributions. It is essential to carefully review the contractual terms related to the additional establishment to safeguard your legitimate rights and interests. If you have any questions, please feel free to contact our professional trust managers for further consultation.' }),
        ]}
      />
      <Modal visible={credentialsVisible} onClose={() => setCredentialsVisible(false)}>
        {selected?.billCertificate && (
          <RecodeViewCredentials
            images={[selected?.billCertificate]}
            onClose={() => setCredentialsVisible(false)}
          />
        )}
      </Modal>
    </div>
  );
}
