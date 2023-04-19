import React from 'react';
import classNames from 'classnames';
import borderImg from '../../assets/icon/avatar_border.svg';
import GradientText from '../../components/GradientText';

export default function Portrait() {
  return (
    <div className="flex flex-row gap-8 items-center p-8">
      {/* 头像 */}
      <div className="flex-shrink-0 relative w-[216px] h-[216px] rounded-full overflow-clip">
        <div
          style={{ backgroundImage: `url(${borderImg})` }}
          className="absolute bg-no-repeat bg-contain bg-center w-full h-full z-10"
        />
        <img src="https://p.ipic.vip/gxnsaj.svg" className="absolute top-0 left-0 z-0 w-full h-full" alt="User" />
      </div>
      {/* 昵称描述 */}
      <div className="flex flex-col gap-4">
        <GradientText
          className={classNames('text-[40px] font-bold')}
        >
          Dear Mr. Lin
        </GradientText>
        <GradientText
          className={classNames('text-[20px] font-normal times leading-[23px]')}
        >
          [Growth Family Trust] has been exclusively established in accordance with your wishes to achieve the purpose
          of wealth inheritance and planning for your family.
        </GradientText>
      </div>
    </div>
  );
}
