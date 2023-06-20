import axios from 'axios';

export enum ISendSMSCodeType {
  OldEmail = 1,
  OldMobile,
  NewEmail,
  NewMobile
}

export enum ISendSMSCodeAction {
  BindGA = 1,
  UnbindGA,
  ChangeGA,
  BingMobile,
  UnbindMobile,
  ChangeMobile,
  BingEmail,
  UnbindEmail,
  ChangeEmail
}

/*
 * 用户登录状态下获取验证码
 * */
export const userSendSMSCodeInLogin = (data: {
  account?: string;
  areaCodeId?: number;
  type: ISendSMSCodeType;
  action: ISendSMSCodeAction;
}) => axios.post('/user/send/sendSmsCode', data);
