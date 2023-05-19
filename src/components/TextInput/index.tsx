import React, {
  ButtonHTMLAttributes, forwardRef, InputHTMLAttributes, ReactNode,
} from 'react';
import classNames from 'classnames';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  block?: boolean;
  suffix?: ReactNode
};

const TextInput = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { block, suffix, ...rest } = props;

  return (
    <div className={classNames('bg-[#3B5649]', 'rounded-xl', 'input-inner-shadow', {
      'w-full': block,
    })}
    >
      <div className="flex flex-row items-center gap-2">
        <input
          {...rest}
          ref={ref}
          className={classNames(
            'flex-auto inline-block w-full border-none bg-transparent outline-none',
            'h-[48px] px-4',
            'gradient-text1',
            'caret-[#BE9D66]',
            'text-[20px] font-bold leading-[22px]',
            'placeholder:text-[#708077]',
            // 'focus:ring-2 focus:ring-sky-500 rounded-xl',
          )}
        />
        {suffix && (<div className="mr-2">{suffix}</div>)}
      </div>
    </div>
  );
});

export default TextInput;
