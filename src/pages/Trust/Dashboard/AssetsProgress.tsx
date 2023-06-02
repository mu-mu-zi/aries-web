import React from 'react';
import classNames from 'classnames';
import { css } from '@emotion/react';
import moneyIcon from '../../../assets/icon/dash_fit_icon.svg';

export default function AssetsProgress({ scale, icon }: {
  scale: number
  icon?: string
}) {
  return (
    <div className="h-[24px] flex items-center">
      <img src={moneyIcon} width="24px" height="24px" alt="" className="z-[2]" />
      {/* <div className="ml-[-12px] flex-1 bg-gradient-to-r from-[#191D1E] to-[#3A3E3A] h-[10px] rounded-xl relative overflow-clip shadow-block"> */}
      <div className="ml-[-12px] flex-1 h-[10px] rounded-xl relative overflow-clip ">
        <div
          className={classNames(
            'h-full absolute left-0 top-0 gradient-border1 rounded-r-xl max-w-full',
            scale === 0 && 'w-0',
          )}
          css={css`
            width: ${Math.max(scale * 100, 5)}%;
          `}
        />
      </div>
    </div>
  );
}
