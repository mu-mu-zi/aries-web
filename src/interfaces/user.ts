export interface IUser {
  areaCode: string;
  createTime: string;
  emailAuth: boolean;
  gender: boolean;
  googleSecret: string;
  googleSecretAuth: boolean;
  id: number;
  mobileAuth: boolean;
  regType: number;
  surname: string;
  updateTime: string;
  userEmail: string;
  userMobile: string;
  userName: string;
  userStatus: number;
}

export interface IUserLoginLog {
  account: string;
  ipAddr: string;
  deviceName: string;
  status: boolean;
  remark: string;
  createTimeStamp: number;
}

export interface IGoogleQr {
  qrCode: string;
  secret: string;
}
