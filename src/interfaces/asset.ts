export interface IBank {
  address: string
  balance: number
  bankName: string
  coinId: string
  createTime: string
  enable: boolean
  id: number
  status: number
  symbol: string
  trustId: number
  updateTime: string
  userName: string
  customContents: IBankCustomContent[]
}

export interface IBankCustomContent {
  createTime: string
  customKey: string
  customValue: string
  id: number
}

/*
* 信托订单
* */
export interface ITrustBill {
  amount: string;
  billCertificate: string;
  billStatusName: string;
  billTypeName: string;
  billType: number
  coinName: string;
  createTimeStamp: number;
}
