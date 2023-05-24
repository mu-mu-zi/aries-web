import numeral from 'numeral';

export const currencyFormat = (value?: number | string, precision?: number) => numeral(value).format('0,0[.000]');

export const currencyUSDTFormat = (value?: number | string) => numeral(value).format('0,0[.]000');
