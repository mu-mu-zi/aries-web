import React, { useEffect, useMemo, useState } from 'react';
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
import useGetDate, { BaseType } from '../../../hooks/useGetDate';

export default function ManagerFee() {
  const { trustId } = useParams();
  const [page, setPage] = useState(1);
  const [year, setYear] = useState<number>(moment().year());
  const [selectAy, setSelectAy] = useState<BaseType[]>();
  const [selectVal, setSelectVal] = useState<BaseType>();
  const listQuery = useTrustManageFeeListQuery({
    pageIndex: page,
    pageSize: 10,
    trustId: Number(trustId),
    year: selectVal?.year,
    month: selectVal?.month,
    quarter: selectVal?.quarter,
  });
  const statisticsQuery = useTrustFeeStatisticsQuery({
    trustId: Number(trustId),
    type: 1,
    year: selectVal?.year,
    month: selectVal?.month,
    quarter: selectVal?.quarter,
  });
  const query = useTrustFeeListQuery({
    trustId: Number(trustId),
  });
  const currentFee = useMemo(() => query.data?.data?.find((x) => x.feeType === 1), [query.data?.data]);
  const years = useFeeYears();
  const date = useGetDate();
  useEffect(() => {
    if (!currentFee) return;
    let showDate;
    if (currentFee.type === 1) {
      showDate = date.years;
    }
    if (currentFee.type === 2) {
      showDate = date.quarter;
    }
    if (currentFee.type === 3) {
      showDate = date.month;
    }
    setSelectAy(showDate);
    setSelectVal(showDate?.[0]);
  }, [currentFee, date.month, date.quarter, date.years]);

  const timeType = (time: number | undefined) => {
    switch (time) {
      case 1:
        return intl.formatMessage({
          defaultMessage: 'Trust Management Fee for the Current Year: {amount} {coinName}',
        }, {
          amount: currencyUSDTFormat(statisticsQuery?.data?.data?.amount),
          coinName: statisticsQuery?.data?.data?.coinName,
        });
      case 2:
        return intl.formatMessage({ defaultMessage: 'Trust Management Fee for the Current Quarter: {amount} {coinName}' }, {
          amount: currencyUSDTFormat(statisticsQuery?.data?.data?.amount),
          coinName: statisticsQuery?.data?.data?.coinName,
        });
      case 3:
        return intl.formatMessage({ defaultMessage: 'Trust Management Fee for the Current Month: {amount} {coinName}' }, {
          amount: currencyUSDTFormat(statisticsQuery?.data?.data?.amount),
          coinName: statisticsQuery?.data?.data?.coinName,
        });
      default:
        return '';
    }
  };

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
                title={timeType(currentFee?.type)}
              />
              {statisticsQuery.data?.data?.billCertificate && (
                <ViewCredentials onTap={() => setViewCredentialsVisible(true)} />
              )}
            </div>
            <div className="w-full max-w-[260px]">
              <Dropdown
                title={`${selectVal?.title}`}
                items={selectAy?.map((x) => `${x.title}`)}
                onSelected={(idx) => setSelectVal(selectAy?.[idx])}
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
                accessor: (x) => `${currencyUSDTFormat(x.totalTrustAmount)} ${x.coinName}`,
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
                    {`${numberFormatWithPrefix(currencyUSDTFormat(row.original.amount))} ${row.original.coinName}`}
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
        title={intl.formatMessage({ defaultMessage: 'About Trust Management Fee' })}
        description={[
          intl.formatMessage({
            defaultMessage:
              'The trust management fee is a fee that is charged based on the total daily assets of the trust, calculated on a daily basis and collected annually/quarterly/monthly',
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
              'The Trustee will collect the accumulated daily calculated trust management fee on December 31st of each year/the last day of each quarter/the last day of each month and on the trust termination date. The fee will be deducted first from the equivalent fiat assets transferred from the trust assets. If there are insufficient fiat assets, the remaining amount will be deducted from the equivalent digital assets',
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
