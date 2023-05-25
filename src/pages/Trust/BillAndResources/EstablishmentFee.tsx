import React, { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import CancelNav from '../../../views/CancelNav';
import Section, { SectionTitle } from './Section';
import ViewCredentials from './ViewCredentials';
import Dropdown from '../../../components/Dropdown';
import Hr from '../../../components/Hr';
import SimpleTable from '../../../views/SimpleTable';
import FeeIntroduction from './FeeIntroduction';
import { useExcessFeeListQuery, useTrustFeeListQuery } from '../../../api/trust/order';
import { useEstablishmentFeeListQuery } from '../../../api/trust/fee';
import { unixFormatTime } from '../../../utils/DateFormat';
import TextButton from '../../../components/TextButton';

export default function EstablishmentFee() {
  const { trustId } = useParams();
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const listQuery = useEstablishmentFeeListQuery({
    pageIndex: page,
    pageSize: 10,
    trustId: Number(trustId),
    year: 2023,
  });
  const query = useTrustFeeListQuery({
    trustId: Number(trustId),
  });
  const total = useMemo(() => query.data?.data?.find((x) => x.feeType === 3)?.feeAmount, [query.data?.data]);

  return (
    <div className="flex flex-col gap-4">
      <CancelNav />
      <Section>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4 justify-between">
            <div className="flex flex-col gap-4">
              <SectionTitle title={`Establishment Fee: ${total} USD`} />
            </div>
            <div className="max-w-[260px] w-full"><Dropdown title="2023" items={['2023']} block /></div>
          </div>
          <Hr />
          <SimpleTable
            columns={[
              {
                Header: 'Time',
                accessor: (x) => unixFormatTime(x.createTimeStamp),
              },
              {
                Header: 'Type',
                accessor: (x) => {
                  switch (x.billType) {
                    case 10:
                      return t('Establishment fee');
                    case 11:
                      return t('Additional establishment fee');
                    default:
                      return null;
                  }
                },
              },
              {
                Header: 'Entrusted assets',
                accessor: (x) => x.trustCoinQuantity,
              },
              {
                Header: 'Asset transfer amount',
                accessor: (x) => x.amount,
              },
              // {
              //   Header: 'Trust total amount',
              //   accessor: 'managementFeeApr',
              // },
              {
                Header: () => (<div className="text-right">Establishment Fee</div>),
                accessor: 'totalAmount',
                // eslint-disable-next-line react/prop-types
                Cell: ({ row }) => (<div className="text-right">{`${row.original.amount} ${row.original.coinName}`}</div>),
              },
              {
                Header: () => (<div className="text-right">Management fee</div>),
                accessor: 'manag',
                // eslint-disable-next-line react/prop-types
                Cell: ({ row }) => (
                  <div className="flex justify-end">
                    <TextButton
                      className="text-right"
                      onClick={() => window.open(row.original.billCertificate)}
                    >
                      View credentials
                    </TextButton>
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
        title="Establishment Fee"
        description={[
          'The establishment fee refers to the fee that needs to be paid if additional funds are required to be invested during the operation of the trust plan. Our company sets the standard for establishment fees according to the contract, which is generally a certain percentage of the asset net value to ensure that the cost of the additional services provided to the trustor is covered.',
          'Once you decide to add funds, we will deduct the corresponding fee from your trust account according to the contract. Similar to the payment method when establishing the trust plan, we will charge the corresponding additional establishment fee according to the actual amount of money added and the agreed ratio.',
          'It is important to note that the additional establishment fee after opening a bank account will be directly deducted from the trust account. When adding establishment operations, you need to ensure that the balance of the trust account is sufficient to pay the required fees to avoid overdue or penalty fees. Please note that it is your responsibility to ensure that there are enough funds in your trust account to pay for any additional establishment payment obligations.',
          'At the same time, we recommend that the trustor carefully understand the specific situation and regulations of the trust plan, clearly understand their risk tolerance and investment goals, and carefully review the relevant contract terms related to additional establishment to ensure that their legal rights and interests are not harmed. If you have any questions, you can always contact our professional trust manager for consultation.',
          'The excess transfer fee refers to the transfer fee incurred when the trust property exceeds the set limit during the operation of the trust plan. We charge a handling fee of 0.03% for each excess transfer according to the contract, and this fee is calculated based on the token price at the time of the transfer. In order to facilitate the trustor to maintain assets and maintain asset appreciation, we specifically introduce the specific information about transfer fees.',
          'When the trust property exceeds the set limit for external transfers, we will charge a fee of 0.03% of the actual transfer amount. It is important to note that this fee is calculated based on the token price at the time of the transfer and will be paid annually according to the contract. At the same time, we will provide accurate information according to the contract, so that the trustor can better understand the relevant situation of the transfer fee.',
        ]}
      />
    </div>
  );
}
