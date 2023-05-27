import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import Dropdown from '../../../components/Dropdown';
import { useLedgerOrderListQuery } from '../../../api/trust/order';
import SimpleTable from '../../../views/SimpleTable';
import { unixFormatTime } from '../../../utils/DateFormat';
import TextButton from '../../../components/TextButton';

/*
* 1-法币转出，2-法币转入，3-数字资产转出，4-数字资产转入，5-兑换交易，6-自定义，7-分配收益，8-管理费，9-超额转账费，10-设立费，11-追加设立费'
* */
enum BillType {
  All = 0,
  FiatOut = 1,
  FiatIn,
  DigitalAssetOut,
  DigitalAssetIn,
  Exchange,
  Custom,
  DistributeProfit,
  ManagementFee,
  ExceedTransfer,
  EstablishmentFee,
  AdditionalEstablishmentFee
}

enum TimeType {
  All = 0,
  OneMonth = 1,
  ThreeMonth,
  HalfYear,
  OneYear
}

export default function Ledger() {
  const { trustId } = useParams();
  const { t } = useTranslation();
  const valid = z.object({
    billType: z.nativeEnum(BillType).default(BillType.All),
    timeType: z.nativeEnum(TimeType).default(TimeType.All),
  });
  type FormValid = z.infer<typeof valid>;
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    trigger,
    getValues,
    control,
    watch,
    setValue,
  } = useForm<FormValid>({
    resolver: zodResolver(valid),
  });
  const billType = watch('billType');
  const timeType = watch('timeType');
  const [page, setPage] = useState(1);
  const listQuery = useLedgerOrderListQuery({
    pageIndex: page,
    pageSize: 10,
    trustId: Number(trustId),
    billType: Number(billType) > 0 ? Number(billType) : undefined,
    timeType: Number(timeType) > 0 ? Number(timeType) : undefined,
  });

  useEffect(() => {
    setValue('billType', BillType.All);
    setValue('timeType', TimeType.All);
  }, []);

  const reset = () => {
    setValue('billType', BillType.All);
    setValue('timeType', TimeType.All);
  };

  const download = () => {
    axios.post('/trust/trust/bill/export', {

    });
  };

  return (
    <div className="flex flex-col gap-4">
      <form>
        <div className="flex items-center gap-4">
          <div className="min-w-[260px]">
            <Controller
              render={({ field }) => {
                const enums = [
                  { type: BillType.All, title: 'All' },
                  { type: BillType.FiatOut, title: 'FiatOut' },
                  { type: BillType.FiatIn, title: 'FiatIn' },
                  { type: BillType.DigitalAssetOut, title: 'DigitalAssetOut' },
                  { type: BillType.DigitalAssetIn, title: 'DigitalAssetIn' },
                  { type: BillType.Exchange, title: 'Exchange' },
                  { type: BillType.Custom, title: 'Custom' },
                  { type: BillType.DistributeProfit, title: 'DistributeProfit' },
                  { type: BillType.ManagementFee, title: 'ManagementFee' },
                  { type: BillType.ExceedTransfer, title: 'ExceedTransfer' },
                  { type: BillType.EstablishmentFee, title: 'EstablishmentFee' },
                  { type: BillType.AdditionalEstablishmentFee, title: 'AdditionalEstablishmentFee' },
                ];
                return (
                  <Dropdown
                    title={enums.find((x) => x.type === field.value)?.title}
                    items={enums.map((x) => x.title)}
                    onSelected={(idx) => field.onChange(enums[idx].type)}
                  />
                );
              }}
              name="billType"
              control={control}
            />
          </div>
          <div className="min-w-[260px]">
            <Controller
              render={({ field }) => {
                const enums = [
                  { type: TimeType.All, title: 'All' },
                  { type: TimeType.OneMonth, title: 'One Month' },
                  { type: TimeType.ThreeMonth, title: 'Three Month' },
                  { type: TimeType.HalfYear, title: 'Half of year' },
                  { type: TimeType.OneYear, title: 'One year' },
                ];
                return (
                  <Dropdown
                    title={enums.find((x) => x.type === field.value)?.title}
                    items={enums.map((x) => x.title)}
                    onSelected={(idx) => field.onChange(enums[idx].type)}
                  />
                );
              }}
              name="timeType"
              control={control}
            />
          </div>
          <div className="flex-auto" />
          <TextButton type="button" onClick={reset}>Reset</TextButton>
          <TextButton type="button" onClick={download}>Download</TextButton>
        </div>
      </form>
      <SimpleTable
        columns={[
          {
            Header: t('Time') ?? '',
            accessor: (originalRow) => unixFormatTime(originalRow.createTimeStamp),
          },
          {
            Header: t('Type') ?? '',
            accessor: (x) => [
              'Fiat Out',
              'Fiat In',
              'Digital Asset Out',
              'Digital Asset In',
              'Exchange',
              'Custom',
              'Distribute Profit',
              'Management Fee',
              'Exceed Transfer',
              'Establishment Fee',
              'Additional Establishment Fee'][x.billType - 1],
          },
          {
            Header: t('Currency') ?? '',
            accessor: 'coinName',
          },
          {
            Header: t('Amount') ?? '',
            // accessor: 'amount',
            // eslint-disable-next-line react/prop-types
            Cell: ({ row }) => <div className="gradient-text1 text-[16px]">{row.original?.amount}</div>,
          },
          // {
          //   accessor: 'Reconciliation',
          //   Header: () => (<div className="text-right">{t('Reconciliation')}</div>),
          //   Cell: ({}) => (
          //     <div className="flex justify-end"><TextButton>{t('View credentials')}</TextButton></div>
          //   ),
          // },
        ]}
        data={listQuery.data?.data?.records}
        pagination={{
          pageIndex: page,
          total: listQuery.data?.data?.total ?? 0,
          pageSize: 10,
          onPageChanged: (page) => setPage(page),
        }}
      />
    </div>
  );
}
