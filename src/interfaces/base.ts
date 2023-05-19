export interface IResponseData<T> {
  code: number,
  data?: T,
  message: string,
  success: boolean
}

export interface IPage<T> {
  pageIndex: number;
  pageSize: number;
  total: number,
  records: T[]
}

export interface IAreaCode {
  id: number;
  code: string;
  name: string;
  img: string;
}

export interface IMainNet {
  id: number
  name: string
  chainId: number
  image?: string
  createTime: number
}

export interface IMainNetCoin {
  id: number
  coinId: number
  mainnetId: number
  symbol: string
  contractAddr: string
  coinDecimal: number
  createTime: number
}

export interface IFiat {
  countryId: number
  enable: boolean
  id: number
  rate: number
  symbol: string
  unit: string
}

export enum Gender {
  Male,
  Female
}

export enum AccountType {
  Email = 1,
  Mobile,
}
