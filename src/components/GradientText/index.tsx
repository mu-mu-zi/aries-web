import React, { ButtonHTMLAttributes, forwardRef, HTMLAttributes } from 'react';
import classNames from 'classnames';

type GradientTextProps = HTMLAttributes<HTMLDivElement> & {};

const GradientText = forwardRef<HTMLDivElement, GradientTextProps>((props, ref) => {
  const { ...rest } = props;

  return (
    <div
      {...rest}
      ref={ref}
      className={classNames(props.className, 'inline-block', 'text-transparent', 'bg-clip-text', 'w-fit', {
        'bg-gradient-to-r from-[#AF8160] to-[#D0B588]': true,
      })}
    >
      {props.children}
    </div>
  );
});

export default GradientText;
