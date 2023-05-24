import React from 'react';
import classNames from 'classnames';
import { IInvestment } from '../../../interfaces/trust';

export default function StepProgress({ items, current, errorCurrent }: {
  items: string[]
  current: number,
  errorCurrent?: number
}) {
  return (
    <div>
      <div className="mx-[-12px]">
        <div className="bg-[#708077] h-[1px] mx-[10%]">
          <div
            className={classNames('gradient-border1 h-full', current > 0 && `w-[${current * (100 / (items.length - 1))}%]`, current === 0 && 'w-0')}
          />
        </div>
        <div className="flex flex-row items-start mt-[-6.5px]">
          {items.map((it, idx) => (
            <div key={it} className="flex-1 w-[0] flex flex-col justify-start items-center gap-2">
              {errorCurrent && idx + 1 === errorCurrent
                ? <div className="bg-[#695D52] w-[12px] h-[12px] rounded-xl border-[2px] border-[#ECA741]" />
                : <div className="gradient-border1 w-[12px] h-[12px] rounded-xl" />}
              <div className="gradient-text1 text-[16px] text-center">{it}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
