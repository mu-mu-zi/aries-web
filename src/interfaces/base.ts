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

export interface AreaCode {
  id: number;
  code: string;
  name: string;
  img: string;
}
