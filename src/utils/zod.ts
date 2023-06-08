import { z } from 'zod';
import {
  defineMessage, useIntl,
} from 'react-intl';

/* 邮箱 */
export const zodEmail = () => z.string().email({
  message: defineMessage({ defaultMessage: 'Invalid email' }).defaultMessage,
});

export const useValidators = () => {
  const { formatMessage } = useIntl();
  return {
    zodRequired: () => z.string().nonempty(formatMessage({ defaultMessage: 'Required' })),
    zodEmail: () => z.string().email(formatMessage({ defaultMessage: 'Invalid email' })),
    zodPhone: () => z.string().regex(/^\d+$/, formatMessage({ defaultMessage: 'Invalid phone' })),
    zodMinStr: (min: number = 10) => z.string().min(
      min,
      formatMessage({ defaultMessage: 'At least {min} characters' }, { min }),
    ),
  };
};
