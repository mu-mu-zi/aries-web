import React, { forwardRef, InputHTMLAttributes } from 'react';
import classNames from 'classnames';

type TextAreaProps = InputHTMLAttributes<HTMLTextAreaElement> & {
  block?: boolean;
};

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>((props, ref) => {
  const { block, ...rest } = props;

  return (
    <div className={classNames('bg-[#3B5649]', 'rounded-xl', 'shadow-block shadow-inner', {
      'w-full': block,
    })}
    >
      <textarea
        {...rest}
        ref={ref}
        className={classNames(
          'inline-block w-full border-none bg-transparent outline-none',
          'h-[48px] p-4 min-h-[100px]',
          'gradient-text1',
          'caret-[#BE9D66]',
          'text-[20px] font-bold leading-[22px]',
          'placeholder:[#708077]',
          'focus:ring-2 focus:ring-sky-500',
          'resize-y',
        )}
      />
    </div>
  );
});

export default TextArea;
