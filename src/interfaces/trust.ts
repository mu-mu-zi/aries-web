import { useTrustReportListQuery } from '../api/trust/order';

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

export interface IInvestment {
  protectionFlag: boolean;
  benefitFlag: boolean;
  entrustFlag: boolean;
  investmentCode: string;
  trustId: number;
  trustInvestmentId: number;
  investmentStatus: number;
  investmentStatusName: string;
  investmentTime: string;
  investmentSuggestion: string;
}

export interface IInvestmentOrderRecode {
  billCertificate: string;
  billId: number;
  billStatus: number;
  billStatusName: string;
  billTypeName: string;
  coinName: string;
  createTimeStamp: number;
  quantity: number;
}

export interface IInvestmentApproveRecode {
  id: number;
  amount: number;
  directionName: string;
  address: string;
  approvalRemark: string;
  approvalTimeStamp: number;
  approvalStatus: number;
  approvalStatusName: string;
  coinName: string;
}

export interface IDistribution {
  planId: number;
  planStatus: number;
  planStatusName: string;
  planDescription: string;
  remark?: string;
  updateTimeStamp: number;
  trustName?: string;
}

export interface ITrustUser {
  id: number;
  trustId: number;
  userId: null;
  userType: null;
  roleType: null;
  remark: string;
  kycStatus: null;
  trustUserStatus: null;
  userName: null;
  userTypeName: string;
  roleTypeName: string;
  account: string;
  kycStatusName: string;
  createTimeStamp: number;
  createTime: null;
  updateTime: null;
}

export interface ITrustFee {
  feeAmount: string;
  feeStatus: string;
  feeType: number;
  trustId: number;
}

export interface IReport {
  id: number
  title?: string
  reportFilePath: string
}

export interface ILaw {
  id: number
  title?: string
  lawFilePath: string
}
