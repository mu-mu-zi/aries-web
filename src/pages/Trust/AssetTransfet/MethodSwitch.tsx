import React, { ReactNode, useState } from 'react';
import classNames from 'classnames';

export default function MethodSwitch({ titles, onSelected }: {
  titles: string[],
  onSelected?(index: number): void
}) {
  const [index, setIndex] = useState(0);

  return (
    <div className="flex flex-row items-center gap-4">
      {titles.map((it, idx) => (
        <MethodSwitchItem
          onTap={() => {
            setIndex(idx);
            onSelected?.(idx);
          }}
          isSelected={idx === index}
        >
          {it}
        </MethodSwitchItem>
      ))}
    </div>
  );
}

function MethodSwitchItem({
  children,
  isSelected,
  onTap,
}: {
  children: ReactNode,
  isSelected: boolean,
  onTap?(): void
}) {
  return (
    <div className={classNames('rounded-xl', 'overflow-clip', 'p-[1px]', 'flex-auto', 'cursor-pointer', {
      'gradient-border-gold': isSelected,
    })}
    >
      <div
        onClick={onTap}
        className={classNames(
          'bg-[#3B5649]',
          'py-3',
          'rounded-xl',
        )}
      >
        <div className={classNames('gradient-text1 text-center text-[20px]', {
          'font-bold': isSelected,
          'font-normal': !isSelected,
        })}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
