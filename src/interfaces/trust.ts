export interface TrustDetail {
  id: number;
  trustName: string;
  trustRemark: string;
  trustEntrustType: number;
  trustAssetType: number;
  trustCoinId: number;
  trustCoinQuantity: number;
  trustLimit: string;
  trustDistributionMode: string;
  contractStatus: number;
  contractFilePath: string;
  payTemplateId: string;
  payStatus: number;
  trustStatus: number;
  userName: string;
  account: string;
  trustEntrustTypeName: string;
  totalAssets: null;
  trustStatusName: string;
  createTime: number;
  createTimeStamp: null;
  updateTime: number;
  stepId: number;
  kycStatus: number
  initialCost: number
  safeHeronAddress: string
  mainne: string
  coinName: string
  transferredAssets: number
  bankName: string
  bankAddress: string
  bankAccount: string
}

export interface Trust {
  trustId: number;
  trustName: string;
  userType: number;
  userTypeName: string;
  userName: string;
  trustEntrustType: number;
  trustEntrustTypeName: string;
  createTime: number;
  trustStatus: number;
  trustStatusName: string;
  bankAccount: boolean;
  digitalCurrencyAccount: boolean;
  stepId: number;
}

export interface IDigitalAssetsDetail {
  amount: number;
  symbol: string;
}

export interface IDigitalAssets {
  totalUSDT: number;
  name: string;
  status: number,
  details: IDigitalAssetsDetail[]
}

export interface IFiatAssetsDetail {
  amount: number;
  apr: number;
  name: string;
  symbol: string;
}

export interface IFiatAssets {
  totalUSDT: number;
  name: string;
  status: number;
  details: IFiatAssetsDetail;
}

export interface IAssetsOverview {
  totalUSDT: number;
  digitalAssets: IDigitalAssets[];
  fiatAssets: IFiatAssets[];
}

export interface ITrustMessage {
  content: string,
  createTime: number,
  id: number,
  title: string,
}
