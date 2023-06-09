import moment from 'moment/moment';

export default function useFeeYears() {
  const start = 2023;
  const currentYear = moment().year() + 1;
  const years = [];
  for (let i = start; i <= currentYear; i += 1) {
    years.push(i);
  }
  return years;
}
