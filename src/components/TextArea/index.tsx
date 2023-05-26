import React, { forwardRef, InputHTMLAttributes } from 'react';
import classNames from 'classnames';
import { css } from '@emotion/react';

type TextAreaProps = InputHTMLAttributes<HTMLTextAreaElement> & {
  block?: boolean;
};

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>((props, ref) => {
  const { block, ...rest } = props;

  return (
    <div className={classNames('bg-[#3B5649]', 'rounded-xl', 'input-inner-shadow', {
      'w-full': block,
    })}
    >
      <textarea
        {...rest}
        ref={ref}
        css={css`
            &::placeholder {
              //background: linear-gradient(0, #708077 0%, #708077 100%);
              background: #708077;
              background-clip: text;
              //-webkit-text-fill-color: transparent;
              //color: transparent;
              font-weight: normal;
              font-size: 16px;
            }
          `}
        className={classNames(
          'inline-block w-full border-none bg-transparent outline-none',
          'h-[48px] p-4 min-h-[100px]',
          'gradient-text1',
          'caret-[#BE9D66]',
          'text-[20px] font-bold leading-[22px]',
          'placeholder:text-[#708077]',
          // 'focus:ring-2 focus:ring-sky-500',
          'resize-none',
        )}
      />
    </div>
  );
});

export default TextArea;
