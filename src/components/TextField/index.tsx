import React, { forwardRef, InputHTMLAttributes, ReactNode } from 'react';
import classNames from 'classnames';
import { css } from '@emotion/react';

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string | ReactNode;
  requiredLabel?: boolean;
  error?: string
};

const TextField = forwardRef<HTMLInputElement, TextFieldProps>((props, ref) => {
  const {
    label, requiredLabel, error, ...rest
  } = props;

  return (
    <div className={classNames(
      'bg-[#3B5649]',
      'rounded-xl overflow-clip px-6 py-3',
    )}
    >
      <label>
        <div className="flex flex-col gap-1">
          <div className="flex flex-col gap-2">
            {label && (
            <div
              className={classNames('text-[#99AC9B] font-bold text-[20px]')}
            >
              {requiredLabel && <span className="gradient-text1 font-bold text-[16px] pr-1">*</span>}
              {label}
            </div>
            )}
            <input
              className={classNames(
                'bg-transparent border-none outline-none w-full',
                'text-[20px] font-bold text-[#C2D7C7F6]',
                'placeholder:text-[#708077] placeholder:font-normal placeholder:text-[16px]',
                'chrome__autofill-none',
              )}
              css={css`
                &::-webkit-inner-spin-button {
                  -webkit-appearance: none;
                  margin: 0;
                }
                
                &[type=number] {
                  appearance: none;
                }
              `}
              {...rest}
              ref={ref}
            />
          </div>
          {error && <div className="text-[#ECA741] text-[14px]">{error}</div>}
        </div>
      </label>
    </div>
  );
});

export default TextField;
