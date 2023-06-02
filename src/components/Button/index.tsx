import React, { ButtonHTMLAttributes, forwardRef } from 'react';
import classNames from 'classnames';
import { css } from '@emotion/react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'text' | 'normal';
  size?: 'medium' | 'large';
  block?: boolean;
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    variant, size, block, ...rest
  } = props;

  return (
    // eslint-disable-next-line react/button-has-type
    <button
      {...rest}
      ref={ref}
      className={classNames({
        'w-full': block,
      })}
    >
      {/* 外层边框 */}
      <div
        className={classNames('overflow-clip rounded-full p-[1px] shadow-block', {
          'bg-gradient-to-r from-[#BE9D66] to-[#E8D2A3]': variant === 'normal' || !variant,
        })}
      >
        {/* 背景 */}
        <div
          className={classNames('grid place-items-center rounded-full ', {
            'bg-gradient-to-r from-[#191D1E] to-[#3A3E3A]': variant === 'normal' || !variant,
          })}
        >
          {/* 渐变文字 */}
          <div
            className={classNames(
              props.className,
              'line-clamp-1 text-ellipsis overflow-hidden bg-gradient-to-r bg-clip-text px-8 font-bold text-transparent transition-all font-title',
              'truncate',
              (size === 'medium' || !size) && 'text-[14px]',
              size === 'large' && 'text-[20px]',
              {
                'h-[40px] leading-[40px]': size === 'medium' || !size,
                'h-[48px] leading-[48px]': size === 'large',
                'from-[#AF8160] to-[#D0B588] hover:from-[#BE9D66] hover:to-[#E8D2A3]': !rest.disabled,
                'from-[#695D52] to-[#695D52]': rest.disabled,
                'cursor-not-allowed': rest.disabled,
                'w-full': block,
                'w-auto min-w-[144px]': !block,
              },
            )}
          >
            {props.children}
          </div>
        </div>
      </div>
    </button>
  );
});

export default Button;
