import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { IPage, IResponseData } from '../../interfaces/base';
import { ITrustUser } from '../../interfaces/trust';
import useUserId from '../../hooks/useUserId';

export const useElementsUserQuery = (data: {
  pageIndex?: number,
  pageSize?:number,
  trustId?: number
  beneficiary: boolean
}) => {
  const userId = useUserId();

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
    enabled: !!userId && !!data.trustId,
  });
};
