import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { FormattedMessage, useIntl } from 'react-intl';
import Dropdown from '../../../components/Dropdown';
import { useLedgerOrderListQuery } from '../../../api/trust/order';
import SimpleTable from '../../../views/SimpleTable';
import { unixFormatTime } from '../../../utils/DateFormat';
import TextButton from '../../../components/TextButton';
import RecodeViewCredentials from '../AssetTransfet/RecodeViewCredentials';
import Modal from '../../../components/Modal';
import { ITrustBill } from '../../../interfaces/asset';
import { numberFormatWithPrefix } from '../../../utils/CurrencyFormat';
import NoCredentials from '../../../views/NoCredentials';
import { useAppSelector } from '../../../state';
import Tooltip from '../../../components/Tooltip';
import { stringShort } from '../../../utils/stringShort';

/*
 * 1-法币转出，2-法币转入，3-数字资产转出，4-数字资产转入，5-兑换交易，6-自定义，7-分配收益，8-管理费，9-超额转账费，10-设立费，11-追加设立费'
 * */
enum BillType {
  All = 0,
  FiatOut,
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
/*
 * 1-资产转入，2-投资运作，3-资产分配，4-费用收取 5-其他'
 * */
enum Type {
  All = 0,
  AssetTransfer,
  InvestmentOperation,
  AssetAllocation,
  FeeCharging,
  Others,
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
  // const { t } = useTranslation();
  const intl = useIntl();
  const valid = z.object({
    type: z.nativeEnum(Type).default(Type.All),
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
  const type = watch('type');
  const timeType = watch('timeType');
  const [page, setPage] = useState(1);
  const listQuery = useLedgerOrderListQuery({
    pageIndex: page,
    pageSize: 10,
    trustId: Number(trustId),
    type: Number(type) > 0 ? Number(type) : undefined,
    timeType: Number(timeType) > 0 ? Number(timeType) : undefined,
  });
  const [credentialsVisible, setCredentialsVisible] = useState(false);
  const [selected, setSelected] = useState<ITrustBill>();
  const lan = useAppSelector((state) => state.app.language);

  useEffect(() => clearErrors(), [lan]);

  useEffect(() => {
    setValue('type', Type.All);
    setValue('timeType', TimeType.All);
  }, []);

  const reset = () => {
    setValue('type', Type.All);
    setValue('timeType', TimeType.All);
  };

  const download = async () => {
    const resp = await axios.request({
      url: '/trust/trust/bill/export',
      method: 'post',
      data: {
        trustId: Number(trustId),
        type: type === Type.All ? undefined : type,
        timeType: timeType === TimeType.All ? undefined : timeType,
        pageIndex: page,
        pageSize: 10,
      },
      responseType: 'blob',
    });
    const url = window.URL.createObjectURL(resp.data);
    window.open(url, '_blank');
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col gap-4">
      <form>
        <div className="flex items-center gap-4">
          <div className="min-w-[260px]">
            <Controller
              render={({ field }) => {
                const enums = [
                  { type: Type.All, title: intl.formatMessage({ defaultMessage: 'All' }) },
                  {
                    type: Type.AssetAllocation,
                    title: intl.formatMessage({ defaultMessage: 'Asset Allocation', description: '账单记录类型' }),
                  },
                  {
                    type: Type.AssetTransfer,
                    title: intl.formatMessage({ defaultMessage: 'Asset Transfer', description: '账单记录类型' }),
                  },
                  {
                    type: Type.FeeCharging,
                    title: intl.formatMessage({ defaultMessage: 'Fee Charging', description: '账单记录类型' }),
                  },
                  {
                    type: Type.InvestmentOperation,
                    title: intl.formatMessage({ defaultMessage: 'Investment Operation', description: '账单记录类型' }),
                  },
                  {
                    type: Type.Others,
                    title: intl.formatMessage({ defaultMessage: 'Others', description: '账单记录类型' }),
                  },
                  // {
                  //   type: Type.DigitalAssetOut,
                  //   title: intl.formatMessage({ defaultMessage: 'Digital Asset Transfer Out', description: '账单记录类型' }),
                  // },
                  // {
                  //   type: Type.DigitalAssetIn,
                  //   title: intl.formatMessage({ defaultMessage: 'Digital Asset Transfer In', description: '账单记录类型' }),
                  // },
                  // { type: Type.Exchange, title: intl.formatMessage({ defaultMessage: 'Exchange' }) },
                  // { type: Type.Custom, title: intl.formatMessage({ defaultMessage: 'Others' }) },
                  // {
                  //   type: Type.DistributeProfit,
                  //   title: intl.formatMessage({ defaultMessage: 'Distribute Profit' }),
                  // },
                  // { type: Type.ManagementFee, title: intl.formatMessage({ defaultMessage: 'Management Fee' }) },
                  // { type: Type.ExceedTransfer, title: intl.formatMessage({ defaultMessage: 'Transfer Fee' }) },
                  // {
                  //   type: Type.EstablishmentFee,
                  //   title: intl.formatMessage({ defaultMessage: 'Establishment Fee' }),
                  // },
                  // {
                  //   type: Type.AdditionalEstablishmentFee,
                  //   title: intl.formatMessage({ defaultMessage: 'Initial Minimum Establishment Fee' }),
                  // },
                ];
                return (
                  <Dropdown
                    title={enums.find((x) => x.type === field.value)?.title}
                    items={enums.map((x) => x.title)}
                    onSelected={(idx) => field.onChange(enums[idx].type)}
                  />
                );
              }}
              name="type"
              control={control}
            />
          </div>
          <div className="min-w-[260px]">
            <Controller
              render={({ field }) => {
                const enums = [
                  { type: TimeType.All, title: intl.formatMessage({ defaultMessage: 'All' }) },
                  { type: TimeType.OneMonth, title: intl.formatMessage({ defaultMessage: 'One Month' }) },
                  { type: TimeType.ThreeMonth, title: intl.formatMessage({ defaultMessage: 'Three Month' }) },
                  { type: TimeType.HalfYear, title: intl.formatMessage({ defaultMessage: 'Half of year' }) },
                  { type: TimeType.OneYear, title: intl.formatMessage({ defaultMessage: 'One year' }) },
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
          <TextButton type="button" onClick={reset}>
            <FormattedMessage defaultMessage="Reset" />
          </TextButton>
          <div className="flex-auto" />
          <TextButton type="button" onClick={download}>
            <FormattedMessage defaultMessage="Download" />
          </TextButton>
        </div>
      </form>
      <SimpleTable
        columns={[
          {
            Header: intl.formatMessage({ defaultMessage: 'Time' }),
            accessor: (originalRow) => unixFormatTime(originalRow.createTimeStamp),
          },
          {
            Header: intl.formatMessage({ defaultMessage: 'Type' }),
            accessor: (x) => {
              switch (x.recordType) {
                case 2:
                case 4:
                case 16:
                case 17:
                  return intl.formatMessage({ defaultMessage: 'Asset Transfer', description: '账单记录类型' });
                case 5:
                case 6:
                case 12:
                case 13:
                  return intl.formatMessage({ defaultMessage: 'Investment Operation', description: '账单记录类型' });
                case 7:
                  return intl.formatMessage({ defaultMessage: 'Asset Allocation', description: '账单记录类型' });
                case 8:
                case 9:
                case 10:
                case 11:
                  return intl.formatMessage({ defaultMessage: 'Fee Charging', description: '账单记录类型' });
                case 14:
                case 15:
                case 18:
                  return intl.formatMessage({ defaultMessage: 'Others', description: '账单记录类型' });
                // case 6:
                //   return x.billName ?? '--';
                // case 7:
                //   return intl.formatMessage({ defaultMessage: 'Distribute Profit' });
                // case 8:
                //   return intl.formatMessage({ defaultMessage: 'Management Fee' });
                // case 9:
                //   return intl.formatMessage({ defaultMessage: 'Exceed Transfer' });
                // case 10:
                //   return intl.formatMessage({ defaultMessage: 'Initial Minimum Establishment Fee' });
                // case 11:
                //   // return intl.formatMessage({ defaultMessage: 'Additional Establishment Fee' });
                //   return intl.formatMessage({ defaultMessage: 'Establishment Fee' });
                default:
                  return '--';
              }
            },
          },
          {
            Header: intl.formatMessage({ defaultMessage: 'Network' }),
            accessor: 'mainnet',
          },
          {
            Header: intl.formatMessage({ defaultMessage: 'Asset Classes' }),
            accessor: 'coinName',
          },
          {
            Header: intl.formatMessage({ defaultMessage: 'Amount' }),
            // accessor: 'amount',
            Cell: ({ row }) => (
              <div className="gradient-text1 text-[16px]">{numberFormatWithPrefix(row.original?.amount)}</div>
            ),
          },
          {
            Header: intl.formatMessage({ defaultMessage: 'remark', description: '总账单页面' }),
            accessor: 'remark',
            width: '150px',
            Cell: ({ row }) => (
              <Tooltip
                title={intl.formatMessage({ defaultMessage: 'remark', description: '总账单页面' })}
                content={row.original.remark}
              >
                <div>{stringShort(row.original.remark, 20)}</div>
              </Tooltip>
            ),
          },
          {
            accessor: 'Reconciliation',
            Header: () => (
              <div className="text-right">
                <FormattedMessage defaultMessage="Reconciliation" />
              </div>
            ),
            Cell: ({ row }) => (
              <div className="flex justify-end">
                {row.original.billCertificate ? (
                  <TextButton
                    disabled={!row.original.billCertificate}
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
          total: listQuery.data?.data?.total ?? 0,
          pageSize: 10,
          onPageChanged: (page) => setPage(page),
        }}
      />
      <Modal visible={credentialsVisible} onClose={() => setCredentialsVisible(false)}>
        {selected && (
          <RecodeViewCredentials images={[selected.billCertificate]} onClose={() => setCredentialsVisible(false)} />
        )}
      </Modal>
    </div>
  );
}
