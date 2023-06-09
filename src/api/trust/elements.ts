import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { IPage, IResponseData } from '../../interfaces/base';
import { ITrustUser } from '../../interfaces/trust';
import useAuthToken, { containsToken } from '../../hooks/useUserId';

export const useElementsUserQuery = (data: {
  pageIndex?: number,
  pageSize?:number,
  trustId?: number
  beneficiary: boolean
}) => {
  const userId = useAuthToken();

  return useQuery<IResponseData<IPage<ITrustUser>>>({
    queryKey: ['trust', 'elements', data, userId],
    queryFn: () => axios.request({
      url: '/trust/trust/user/trustUserListByUserType',
      method: 'get',
      params: {
        userType: data.beneficiary ? 1 : 2,
        ...data,
      },
    }),
    enabled: containsToken() && !!data.trustId,
  });
};

export const useTrustUserRoleQuery = (data: {
  roleType?: number,
  trustUserId?: number
}) => useQuery({
  queryKey: ['trust', 'elements', 'user', 'role', data],
  queryFn: () => axios.request({
    url: '/trust/trust/check/role',
    method: 'get',
    params: data,
  }),
  enabled: containsToken() && !!data.roleType && !!data.trustUserId,
});
