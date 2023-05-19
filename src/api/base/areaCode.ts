import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { IAreaCode, IResponseData } from '../../interfaces/base';

export const useAreaCodeListQuery = () => useQuery<IResponseData<IAreaCode[]>>({
  queryKey: ['areaCode'],
  queryFn: () => axios.get('/trust/areaCode/list'),
});
