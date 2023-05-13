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
