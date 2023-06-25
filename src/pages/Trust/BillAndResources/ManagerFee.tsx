import React, { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';
import moment from 'moment/moment';
import CancelNav from '../../../views/CancelNav';
import FeeIntroduction from './FeeIntroduction';
import Section, { SectionTitle } from './Section';
import Dropdown from '../../../components/Dropdown';
import Hr from '../../../components/Hr';
import SimpleTable from '../../../views/SimpleTable';
import ViewCredentials from './ViewCredentials';
import { useExpenseRatioQuery, useTrustFeeStatisticsQuery, useTrustManageFeeListQuery } from '../../../api/trust/fee';
import { unixFormatTime } from '../../../utils/DateFormat';
import { useTrustFeeListQuery } from '../../../api/trust/order';
import { currencyUSDTFormat, numberFormatWithPrefix, ratioFormat } from '../../../utils/CurrencyFormat';
import RecodeViewCredentials from '../AssetTransfet/RecodeViewCredentials';
import Modal from '../../../components/Modal';
import { allYears } from '../../../utils/year';
import useFeeYears from '../../../hooks/useFeeYears';

export default function ManagerFee() {
  const { trustId } = useParams();
  const [page, setPage] = useState(1);
  const [year, setYear] = useState<number>(moment().year());
  const listQuery = useTrustManageFeeListQuery({
    pageIndex: page,
    pageSize: 10,
    trustId: Number(trustId),
    year,
  });
  const statisticsQuery = useTrustFeeStatisticsQuery({
    trustId: Number(trustId),
    type: 1,
    year,
  });
  const query = useTrustFeeListQuery({
    trustId: Number(trustId),
  });
  // const currentFee = useMemo(() => query.data?.data?.find((x) => x.feeType === 1), [query.data?.data]);
  const years = useFeeYears();
  const ratioQuery = useExpenseRatioQuery();
  const [viewCredentialsVisible, setViewCredentialsVisible] = useState(false);
  const intl = useIntl();

  return (
    <div className="flex flex-col gap-4">
      <CancelNav />
      <Section>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-4">
              <SectionTitle
                title={intl.formatMessage(
                  {
                    defaultMessage: 'Trust management fee: {amount} {coinName}',
                  },
                  {
                    amount: currencyUSDTFormat(statisticsQuery?.data?.data?.amount),
                    coinName: statisticsQuery?.data?.data?.coinName,
                  },
                )}
              />
              {statisticsQuery.data?.data?.billCertificate && (
                <ViewCredentials onTap={() => setViewCredentialsVisible(true)} />
              )}
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
                // accessor: (x) => unixFormatTime(x.createTimeStamp),
                accessor: (x) => x.createTimeFormat,
              },
              {
                Header: intl.formatMessage({ defaultMessage: 'Trust total amount' }),
                accessor: (x) => `${x.totalTrustAmount} ${x.coinName}`,
              },
              {
                Header: () => (
                  <div className="text-right">
                    <FormattedMessage defaultMessage="Management fee" />
                  </div>
                ),
                accessor: 'totalAmount',
                // eslint-disable-next-line react/prop-types
                Cell: ({ row }) => (
                  <div className="gradient-text2 text-right">
                    {`${numberFormatWithPrefix(row.original.amount)} ${row.original.coinName}`}
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
        title={<FormattedMessage defaultMessage="About Trust Management Fee" />}
        // description={[
        //   intl.formatMessage({ defaultMessage: "Trust management fee refers to the fee charged by the trust company to the settlor for providing custody, risk control, asset management and other services according to the provisions of the trust plan agreement. Our company's trust plan management fee is generally collected at a standard annualized rate of {ratio}, and this fee is calculated based on the actual market value of the assets under custody. Please note that we will automatically deduct this amount from your custodial account. By default, we will deduct the corresponding amount of fiat currency, such as RMB, as the management fee from your custodial account. If there is not enough fiat currency in your custodial account, we will deduct assets equivalent to the management fee from your custodial account according to the contract." }, {
        //     ratio: ratioFormat(ratioQuery.data?.data?.find((x) => x.type === 1)?.expenseRatio),
        //   }),
        //   intl.formatMessage({ defaultMessage: 'Before you make an investment, we need to clearly inform you of the relevant fees and deductions. In addition, we will provide you with regular bills of your investment portfolio and related fees to enable you to have a clear understanding of the asset management fees for a certain period of time in the past. We recommend that you, as the settlor, should be aware of various fees rates and deduction methods associated with the selected trust plan in advance to ensure a clear understanding of your investment costs and accordingly formulate an investment plan. As a settlor, you should always closely monitor your investment and stay informed about the latest information regarding fees and changes in assets, as well as any other issues that may affect your investment results. ' }),
        //   intl.formatMessage({ defaultMessage: 'Please note that the collected management fees cannot replace your final investment results. We cannot guarantee that your investment funds will definitely generate profits and provide investment advice accordingly. Any information regarding expected returns, risk analysis, and investment advice should be used for reference purposes only. You should be solely responsible for analyzing and evaluating your investment decisions.' }),
        // ]}
        description={[
          intl.formatMessage({
            defaultMessage:
              'The trust management fee is a fee that is charged based on the total daily assets of the trust, calculated on a daily basis and collected annually',
          }),
          intl.formatMessage({
            defaultMessage:
              'Daily management fee = Daily total trust assets × [Annualized management fee rate of the trust] / 365',
          }),
          intl.formatMessage({
            defaultMessage:
              'The total trust assets refer to the total amount of trust assets at 24:00 Hong Kong time, converted to USD at the prevailing exchange rate of the day',
          }),
          intl.formatMessage({
            defaultMessage:
              'The Trustee will collect the accumulated daily calculated trust management fee on December 31st of each year and on the trust termination date. The fee will be deducted first from the equivalent fiat assets transferred from the trust assets. If there are insufficient fiat assets, the remaining amount will be deducted from the equivalent digital assets',
          }),
        ]}
      />
      <Modal visible={viewCredentialsVisible} onClose={() => setViewCredentialsVisible(false)}>
        <RecodeViewCredentials
          images={[statisticsQuery.data?.data?.billCertificate]}
          onClose={() => setViewCredentialsVisible(false)}
        />
      </Modal>
    </div>
  );
}
