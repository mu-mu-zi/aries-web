import React, { forwardRef, HTMLAttributes } from 'react';
import classNames from 'classnames';
import arrowIcon from '../../assets/icon/arrow_down.svg';

type SelectProps = HTMLAttributes<HTMLDivElement> & {};

const Select = forwardRef<HTMLDivElement & SelectProps>((props, ref) => {
  const { ...rest } = props;

  return (
    <div
      className={classNames(
        'flex flex-row items-center gap-2',
        'bg-[#3B5649]',
        'rounded-xl',
        'shadow-block shadow-inner',
        'px-6',
        'cursor-pointer',
        'flex-shrink-0',
      )}
    >
      <div className="gradient-text1 text-[20px] font-bold leading-[22px]">+3123</div>
      <img src={arrowIcon} width="32px" className="pointer-events-none" />
    </div>
  );
});

export default Select;
