import { useExpenseRatioQuery } from '../api/trust/fee';

export interface IExpenseRatio {
  id: number
  type: number
  typeName: any
  expenseRatio: string
  status: boolean
  updateTime: number
}
