import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { AreaCode, IResponseData } from '../../interfaces/base';

export const useAreaCodeListQuery = () => useQuery<IResponseData<AreaCode[]>>({
  queryKey: ['areaCode'],
  queryFn: () => axios.get('/trust/areaCode/list'),
});
