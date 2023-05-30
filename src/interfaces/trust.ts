import { useTrustReportListQuery } from '../api/trust/order';

export interface ITrustCompany {
  companyName: string
  companyStatus: number
  companyType: number
  id: number
  mainnetCoinId: number
  mainnetId: number
  payType: number
  trustId: number
  trustMoney: number
}

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
  kycStatus: number;
  initialCost: number;
  safeHeronAddress: string;
  mainne: string;
  coinName: string;
  transferredAssets: number;
  bankName: string;
  bankAddress: string;
  bankAccount: string;
  payType: number
  roleType: number
  surname: string
  collectionAddress: string
  trustCompanyModel?: ITrustCompany
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
  roleType: number
  roleTypeArr: number[]
  userTypeArr: number[]
}

export interface IDigitalAssetsDetail {
  amount: number;
  symbol: string;
  price: number
  image: string
}

export interface IDigitalAssets {
  totalUSDT: number;
  name: string;
  status: number,
  details: IDigitalAssetsDetail[]
}

export interface IFiatAssetsDetail {
  name: string;
  totalAmountUSDT: number;
  amount: number;
  details: IFiatAssetsDetails2[];
  e_expand: boolean
}

export interface IFiatAssetsDetails2 {
  apr: number;
  symbol: string;
  amount: number;
  name: number
  image: string
}

export interface IFiatAssets {
  totalUSDT: string;
  name: string;
  status: number;
  details: IFiatAssetsDetail[];
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
  roleType: number;
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
  feeStatus: number;
  feeType: number;
  trustId: number;
  year: number
}

export interface IReport {
  id: number;
  title?: string;
  reportFilePath: string;
}

export interface ILaw {
  id: number;
  title?: string;
  lawFilePath: string;
}

export interface IDistributionBill {
  beneficiaryUserName: string
  billCertificate: string
  billId: number
  billStatus: number
  billStatusName: string
  coinName: string
  createTimeStamp: number
  quantity: number
}

export interface ITrustManageFeeRecord {
  amount: string
  coinName: string
  createTimeStamp: number
  currencyPrice: string
  managementFeeApr: string
  totalAmount: string
  totalTrustAmount: string
}

export interface ITrustExcessFeeRecord {
  amount: string
  coinName: string
  createTimeStamp: number
  currencyPrice: string
  managementFeeApr: string
  totalAmount: string
  totalTrustAmount: string
}

export interface ITrustEstablishment {
  amount: string
  billCertificate: string
  billCode: string
  billId: number
  billStatusName: string
  billType: number
  billTypeName: string
  coinName: string
  createTimeStamp: number
  initialCost: string
  trustCoinQuantity: string
  trustId: number
  trustName: string
}

export interface ITrustAssetRecode {
  id: number
  trustId: number
  trustName: string
  payType: number
  coinId: number
  symbol: string
  payAddress: string
  bankAddress: any
  payUserName: string
  bankName: string
  amount: string
  declareNo: string
  estimateTime: string
  status: number
  payNo: string
  remarks: any
  adminRemarks: any
  createTime: number
  updateTime: number
  proofs: any[]
}
