import React, { ButtonHTMLAttributes, forwardRef } from 'react';
import classNames from 'classnames';
import { css } from '@emotion/react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  block?: boolean;
};

const TextButton = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    block, disabled, ...rest
  } = props;

  return (
    // eslint-disable-next-line react/button-has-type
    <button
      {...rest}
      disabled={disabled}
      ref={ref}
      className={classNames('text-center font-title font-bold text-[14px] cursor-pointer w-fit whitespace-pre', disabled ? 'text-[#695D52]' : 'gradient-text2')}
      css={css`
        position: relative;

        &::before {
          content: "";
          position: absolute;
          top: 100%;
          width: 100%;
          left: 0;
          height: 1px;
          background: linear-gradient(90deg, ${disabled ? '#695D52' : '#AF8160'}  0%, ${disabled ? '#695D52' : '#D0B588'} 100%);
        }
      `}
    >
      {rest.children}
    </button>
  );
});

export default TextButton;
