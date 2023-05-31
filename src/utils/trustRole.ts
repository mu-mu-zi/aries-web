import { TrustDetail } from '../interfaces/trust';

/*
* 编辑权限
* */
export const trustEditRole = (trustDetail?: TrustDetail) => trustDetail?.userTypeArr.includes(1) ?? false;
