import React, { forwardRef, HTMLAttributes } from 'react';
import classNames from 'classnames';

type GradientBoxProps = HTMLAttributes<HTMLDivElement> & {};

const GradientBox = forwardRef<HTMLDivElement, GradientBoxProps>((props, ref) => {
  const { ...rest } = props;

  return (
    <div {...rest} ref={ref} className={classNames(props.className, 'bg-gradient-to-r from-[#27302D] to-[#42534B]')} />
  );
});

export default GradientBox;
