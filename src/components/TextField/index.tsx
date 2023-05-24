import React, { forwardRef, InputHTMLAttributes, ReactNode } from 'react';
import classNames from 'classnames';

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
    label?: string | ReactNode;
    requiredLabel?: boolean;
};

const TextField = forwardRef<HTMLInputElement, TextFieldProps>((props, ref) => {
  const { label, requiredLabel, ...rest } = props;

  return (
    <div className={classNames('bg-[#3B5649]', 'rounded-xl overflow-clip px-6 py-3')}>
      <label>
        <div className="flex flex-col gap-2">
          <div
            className={classNames('text-[#99AC9B] font-bold text-[16px]')}
          >
            {requiredLabel && <span className="gradient-text1 font-bold text-[16px] pr-1">*</span>}
            {label}
          </div>
          <input
            className={classNames(
              'bg-transparent border-none outline-none w-full',
              'text-[20px] font-bold text-[#C2D7C7F6]',
              'placeholder:text-[#708077] placeholder:font-normal placeholder:text-[16px]',
            )}
            {...rest}
            ref={ref}
          />
        </div>
      </label>
    </div>
  );
});

export default TextField;
