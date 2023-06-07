import { retry } from '@reduxjs/toolkit/query';

export const stringShort = (str?: string, max?: number) => {
  if (!str) return '--';
  return str.length > (max ?? 30) ? `${str.substring(0, max ?? 30)}...` : str;
};
