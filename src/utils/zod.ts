import { z } from 'zod';
import {
  defineMessage, useIntl,
} from 'react-intl';
import { useAppSelector } from '../state';

/* 邮箱 */
export const zodEmail = () => z.string().email({
  message: defineMessage({ defaultMessage: 'Invalid email' }).defaultMessage,
});

export const useValidators = () => {
  const { formatMessage } = useIntl();
  return {
    zodRequired: () => z.string().trim().nonempty(formatMessage({ defaultMessage: 'Required' })).trim(),
    zodEmail: () => z.string().trim().email(formatMessage({ defaultMessage: 'Invalid email' })).trim(),
    zodPhone: () => z.string().trim().regex(/^\d+$/, formatMessage({ defaultMessage: 'Invalid phone' })).trim(),
    zodMinStr: (min: number = 10) => z.string().trim().min(
      min,
      formatMessage({ defaultMessage: 'At least {min} characters' }, { min }),
    ).trim(),
    zodStringOptional: () => z.string().trim().optional(),
  };
};
