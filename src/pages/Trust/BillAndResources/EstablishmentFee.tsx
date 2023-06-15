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
import { useTrustDetailQuery } from '../../../api/trust/trust';

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
  const trustQuery = useTrustDetailQuery({ trustId: Number(trustId) });

  return (
    <div className="flex flex-col gap-4">
      <CancelNav />
      <Section>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-4">
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
            <div className="w-full max-w-[260px]">
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
              // {
              //   Header: intl.formatMessage({ defaultMessage: 'Entrusted assets' }),
              //   accessor: (x) => `${x.trustCoinQuantity} ${x.coinName}`,
              // },
              {
                Header: intl.formatMessage({ defaultMessage: 'Entrusted Asset' }),
                accessor: (x) => `${x.amount} ${x.coinName}`,
              },
              // {
              //   Header: 'Trust total amount',
              //   accessor: 'managementFeeApr',
              // },
              {
                Header: intl.formatMessage({ defaultMessage: 'Network' }),
                accessor: (x) => x.mainnet,
              },
              {
                Header: () => (
                  <div className="text-right">
                    <FormattedMessage defaultMessage="Establishment Fee" />
                  </div>
                ),
                accessor: 'totalAmount',
                // eslint-disable-next-line react/prop-types
                Cell: ({ row }) => (
                  <div className="text-right">{`${-row.original.initialCost} ${row.original.coinName}`}</div>
                ),
              },
              {
                Header: () => (
                  <div className="text-right">
                    <FormattedMessage defaultMessage="Reconciliation" />
                  </div>
                ),
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
                    ) : (
                      <NoCredentials />
                    )}
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
        {trustQuery.data?.data && (
          <div className="gradient-text1">
            <FormattedMessage
              defaultMessage="* Exempted Establishment Fee for Entrusted assets: {amount}"
              values={{
                amount: `${trustQuery.data?.data?.trustCoinQuantity} ${trustQuery.data?.data?.trustCoinName}`,
              }}
            />
          </div>
        )}
      </Section>
      <FeeIntroduction
        title={intl.formatMessage({ defaultMessage: 'Establishment Fee' })}
        description={[
          intl.formatMessage(
            {
              defaultMessage:
                'The establishment fee refers to the additional fee of {ratio} that needs to be paid if you decide to add funds during the operation of the trust plan. Our company follows the contractual provisions to determine the standard for establishment fees, which is generally based on a certain percentage of the net asset value to ensure the cost coverage of the additional services provided to the settlor.',
            },
            {
              ratio: ratioFormat(ratioQuery.data?.data?.find((x) => x.type === 2)?.expenseRatio),
            },
          ),
          intl.formatMessage({
            defaultMessage:
              'Once you decide to add funds, the corresponding fee will be deducted from your trust account according to the contract. Similar to the payment method during the establishment of the trust plan, we will charge the additional establishment fee based on the actual amount of funds added and the agreed-upon ratio.',
          }),
          intl.formatMessage({
            defaultMessage:
              'It is important to note that the additional establishment fee will be directly deducted from your trust account after the bank account is opened. When conducting the additional establishment operation, you need to ensure that there are sufficient funds in your trust account to cover the required fees and avoid any overdue or late payment charges. Please be aware that it is your responsibility to ensure that there are enough funds in your trust account to fulfill any obligations regarding the payment of additional establishment fees.',
          }),
          intl.formatMessage({
            defaultMessage:
              'Additionally, we recommend that the settlor thoroughly understands the specific details and provisions of the trust plan, clarifies their risk tolerance and investment objectives before making any additional contributions. It is essential to carefully review the contractual terms related to the additional establishment to safeguard your legitimate rights and interests. If you have any questions, please feel free to contact our professional trust managers for further consultation.',
          }),
        ]}
      />
      <Modal visible={credentialsVisible} onClose={() => setCredentialsVisible(false)}>
        {selected?.billCertificate && (
          <RecodeViewCredentials images={[selected?.billCertificate]} onClose={() => setCredentialsVisible(false)} />
        )}
      </Modal>
    </div>
  );
}
