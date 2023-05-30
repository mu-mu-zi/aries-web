import React from 'react';
import classNames from 'classnames';
import unselIcon from '../../assets/icon/step_star_unsel.svg';
import selIcon from '../../assets/icon/step_star_sel.svg';

export default function StepControl({ titles, current }: { titles: string[]; current: number }) {
  return (
    <div className="jusitify-center flex flex-row items-center gap-8">
      {titles.map((it, idx) => (
        <StepTitle key={it} index={idx} title={it} current={current} />
      ))}
    </div>
  );
}

function StepTitle({ index, title, current }: { index: number; title: string; current: number }) {
  const isHighlight = index <= current;

  return (
    <div className="flex flex-row items-center gap-2">
      <div
        className={classNames(
          'h-[24px] w-[24px] bg-cover bg-center bg-no-repeat text-center text-[12px] font-title font-bold leading-[24px] transition',
          {
            'text-[#3D3228]': isHighlight,
            'text-[#99AC9B]': !isHighlight,
          },
        )}
        style={{ backgroundImage: `url(${isHighlight ? selIcon : unselIcon})` }}
      >
        {index + 1}
      </div>
      <div
        className={classNames('transition font-bold', {
          'gradient-text1': isHighlight,
          'text-[#708077]': !isHighlight,
        })}
      >
        {title}
      </div>
    </div>
  );
}
