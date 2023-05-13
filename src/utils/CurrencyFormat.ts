import numeral from 'numeral';

export const currencyFormat = (value: number | string, precision?: number) => numeral(value).format('0,0[.]');
