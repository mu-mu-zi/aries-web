import { useEffect, useMemo, useState } from 'react';
import { TrustDetail } from '../interfaces/trust';

export default function useTrustPermission({ trust }: {
  trust?: TrustDetail
}) {
  return {
    /* 保护人权限：4，5，6 并且具有审批权限 */
    protectorPermission: [4, 5, 6].some((c) => trust?.userTypeArr.includes(c)) && trust?.roleType === 3,
    /* 委托人权限：包括本人、委托人是受益人 */
    settlorPermission: [1, 21].some((c) => trust?.userTypeArr.includes(c)),
    /* 仅仅是委托人 */
    onlySettlorPermission: trust?.userTypeArr.includes(1),
    /* 保护人是委托人本人 */
    protectorIsSettlorPermission: trust?.userTypeArr.includes(1) && [4, 5, 6].some((c) => trust?.userTypeArr.includes(c)),
  };
}
