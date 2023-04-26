import React, { useState } from 'react';
import classNames from 'classnames';

export default function Switch({ titles, onSelect }: {
    titles: string[],
    onSelect?(index: number): void
}) {
  const [index, setIndex] = useState(0);

  return (
    <div className="flex flex-row items-center gap-6">
      {titles.map((it, idx) => (
        <div
          className={classNames('font-title text-[20px]', 'cursor-pointer', {
            'text-[#99AC9B]': idx != index,
            'gradient-text1': idx == index,
          })}
          onClick={() => {
            setIndex(idx);
            onSelect?.(idx);
          }}
        >
          {it}
        </div>
      ))}
    </div>
  );
}
