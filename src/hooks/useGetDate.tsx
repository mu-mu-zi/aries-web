import React from 'react';
import moment from 'moment/moment';
import { useParams } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { useTrustDetailQuery } from '../api/trust/trust';

export type BaseType = {
  title: string
  value: number
  year: number | undefined
  month: number | undefined
  quarter: number | undefined
}

interface IDateGroup {
  years: BaseType[]
  month: BaseType[]
  quarter: BaseType[]
}

export default function useGetDate() {
  const { trustId } = useParams();
  const detailQuery = useTrustDetailQuery({
    trustId: Number(trustId),
  });
  const currentDate = moment(detailQuery.data?.data?.createTime);

  // 获取起始时间的年份 计算与当前年份的差值 * 时间维度。 目的是增加循环
  const reMonth = (moment().year() - currentDate.year()) * 12;
  const reQuerter = (moment().year() - currentDate.year()) * 4;
  const intl = useIntl();

  const formatMonth = (month: number) => {
    switch (month) {
      case 1:
        return intl.formatMessage({ defaultMessage: 'January' });
      case 2:
        return intl.formatMessage({ defaultMessage: 'February' });
      case 3:
        return intl.formatMessage({ defaultMessage: 'March' });
      case 4:
        return intl.formatMessage({ defaultMessage: 'April' });
      case 5:
        return intl.formatMessage({ defaultMessage: 'May' });
      case 6:
        return intl.formatMessage({ defaultMessage: 'June' });
      case 7:
        return intl.formatMessage({ defaultMessage: 'July' });
      case 8:
        return intl.formatMessage({ defaultMessage: 'August' });
      case 9:
        return intl.formatMessage({ defaultMessage: 'September' });
      case 10:
        return intl.formatMessage({ defaultMessage: 'October' });
      case 11:
        return intl.formatMessage({ defaultMessage: 'November' });
      case 12:
        return intl.formatMessage({ defaultMessage: 'December' });
      default:
        return '';
    }
  };

  const dateGroup:IDateGroup = {
    years: [],
    month: [],
    quarter: [],
  };
  const years = [];
  for (let i = currentDate.year(); i <= moment().year(); i += 1) {
    years.push({
      // title: `${i}年`,
      title: intl.formatMessage(
        {
          defaultMessage: '{i}year',
        },
        {
          i,
        },
      ),
      value: i,
      year: i,
      quarter: undefined,
      month: undefined,
    });
  }
  dateGroup.years = years.reverse();

  const monthArray = [];
  for (let month = currentDate.month(); month <= (moment().month() + reMonth); month += 1) {
    monthArray.push({
      // title: `${(currentDate.year() + Math.floor(month / 12))}年${((month + 1) % 12) ? ((month + 1) % 12) : 12}月`,
      title: intl.formatMessage(
        {
          defaultMessage: '{month} {year}',
        },
        {
          year: (currentDate.year() + Math.floor(month / 12)),
          month: formatMonth(((month + 1) % 12) ? ((month + 1) % 12) : 12),
        },
      ),
      value: ((month + 1) % 12) ? ((month + 1) % 12) : 12,
      year: (currentDate.year()) + Math.floor(month / 12),
      quarter: undefined,
      month: ((month + 1) % 12) ? ((month + 1) % 12) : 12,
    });
  }
  dateGroup.month = monthArray.reverse();
  const quarterArray = [];
  for (let quarter = Math.floor((currentDate.month() + 3) / 3); quarter <= Math.ceil(moment().quarter() + (reQuerter)); quarter += 1) {
    quarterArray.push({
      // title: formatMessage({ defaultMessage: '{currentDate.year()} + Math.ceil(quarter / 4) - 1}年第{(quarter % 4) ? (quarter % 4) : 4}季度' }),
      title: intl.formatMessage(
        {
          defaultMessage: '{year} Q{querter}',
          description: 'hei',
        },
        {
          year: currentDate.year() + Math.ceil(quarter / 4) - 1,
          querter: (quarter % 4) ? (quarter % 4) : 4,
        },
      ),
      // title: `${currentDate.year() + Math.ceil(quarter / 4) - 1}年第${(quarter % 4) ? (quarter % 4) : 4}季度`,
      value: (quarter % 4) ? (quarter % 4) : 4,
      year: currentDate.year() + Math.ceil(quarter / 4) - 1,
      quarter: (quarter % 4) ? (quarter % 4) : 4,
      month: undefined,
    });
  }

  dateGroup.quarter = quarterArray.reverse();
  return dateGroup;
}
