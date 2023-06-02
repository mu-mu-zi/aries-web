import React, { ButtonHTMLAttributes, forwardRef } from 'react';
import classNames from 'classnames';
import { css } from '@emotion/react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  block?: boolean;
};

const TextButton = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    block, ...rest
  } = props;

  return (
    // eslint-disable-next-line react/button-has-type
    <button
      {...rest}
      ref={ref}
      className="gradient-text2 text-center font-title font-bold text-[14px] cursor-pointer w-fit whitespace-pre"
      css={css`
        position: relative;

        &::before {
          content: "";
          position: absolute;
          top: 100%;
          width: 100%;
          left: 0;
          height: 1px;
          background: linear-gradient(90deg, #AF8160 0%, #D0B588 100%);
        }
      `}
    >
      {rest.children}
    </button>
  );
});

export default TextButton;
