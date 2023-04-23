import React, { ButtonHTMLAttributes, forwardRef, InputHTMLAttributes } from 'react';
import classNames from 'classnames';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  block?: boolean;
};

const TextInput = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { block, ...rest } = props;

  return (
    <div className={classNames('bg-[#3B5649]', 'rounded-xl', 'shadow-block shadow-inner', {
      'w-full': block,
    })}
    >
      <input
        {...rest}
        ref={ref}
        className={classNames(
          'inline-block w-full border-none bg-transparent outline-none',
          'h-[48px] px-4',
          'gradient-text1',
          'caret-[#BE9D66]',
          'text-[20px] font-bold leading-[22px]',
          'placeholder:[#708077]',
          'focus:ring-2 focus:ring-sky-500',
        )}
      />
    </div>
  );
});

export default TextInput;
