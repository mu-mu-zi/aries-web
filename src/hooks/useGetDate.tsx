import moment from 'moment/moment';

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
  const start = 2023;
  const currentDate = moment();
  const currentYear = currentDate.year() + 1;
  const dateGroup:IDateGroup = {
    years: [],
    month: [],
    quarter: [],
  };
  const years = [];
  for (let i = start; i <= currentYear; i += 1) {
    years.push({
      title: `${i}年`,
      value: i,
      year: i,
      quarter: null,
      month: null,
    });
  }
  dateGroup.years = years;

  const monthArray = [];
  for (let month = 0; month <= currentDate.month(); month += 1) {
    monthArray.push({
      title: `${currentDate.year()}年${month + 1}月`,
      value: month + 1,
      year: currentDate.year(),
      quarter: null,
      month: month + 1,
    });
  }
  dateGroup.month = monthArray;
  const quarterArray = [];
  for (let quarter = 0; quarter <= Math.ceil(currentDate.month() / 3); quarter += 1) {
    quarterArray.push({
      title: `${currentDate.year()}年第${quarter + 1}季度`,
      value: quarter + 1,
      year: currentDate.year(),
      quarter: quarter + 1,
      month: null,
    });
  }
  dateGroup.quarter = quarterArray;
  return dateGroup;
}
