import numeral from 'numeral';
import BigNumber from 'bignumber.js';

export const currencyFormat = (value?: number | string, precision?: number) => numeral(value).format('0,0[.]000');

/*
 * USDT 格式化，小数点最多保留 2 位小数
 * */
export const currencyUSDTFormat = (value?: number | string) => {
  if (!value) return undefined;
  const val = BigNumber(value ?? 0).toFormat(2, BigNumber.ROUND_DOWN);
  return numeral(val.toString()).format('0,0.[00]');
};

export const numberFormatWithPrefix = (value?: number | string) => {
  if (!value) return undefined;
  const val = BigNumber(value);
  return val.gt(0) ? `+${value}` : `${value}`;
};

export const ratioFormat = (value?: number | string) => numeral(value).format('0.[000]%');
