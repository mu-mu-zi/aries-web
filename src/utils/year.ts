import moment from 'moment';

export const allYears = (delayOneYear: boolean = false): number[] => {
  const start = 2023;
  const currentYear = moment().year() + (delayOneYear ? 1 : 0);
  const years = [];
  for (let i = start; i <= currentYear; i += 1) {
    years.push(i);
  }
  return years;
};
