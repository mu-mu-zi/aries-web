import React from 'react';
import classNames from 'classnames';
import { IInvestment } from '../../../interfaces/trust';

export default function StepProgress({ investment }: {
  investment: IInvestment
}) {
  return (
    <div>
      <div className="mx-[-12px]">
        <div className="bg-[#708077] h-[1px] mx-[10%]">
          <div className={classNames('gradient-border1 h-full', `w-[${(investment.investmentStatus - 1) * 25}${investment.investmentStatus === 1 ? '' : '%'}]`)} />
        </div>
        <div className="flex flex-row items-start mt-[-6.5px]">
          {[
            'Initiated',
            'Under review',
            'Investment in',
            'Verifying',
            'Completed',
          ].map((it, idx) => (
            <div key={it} className="flex-1 w-[0] flex flex-col justify-start items-center gap-2">
              <div className="gradient-border1 w-[12px] h-[12px] rounded-xl" />
              <div className="gradient-text1 text-[16px] text-center">{it}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
