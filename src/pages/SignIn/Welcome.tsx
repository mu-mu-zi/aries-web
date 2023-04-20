import React from 'react';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import Divide from '../../components/Divide';
import welcomeIcon from '../../assets/icon/welcome_badge.svg';

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center pt-9">
      <div
        className={classNames(
          'flex flex-col items-center gap-[10px]',
          'gradient-bg2',
          'rounded-xl',
          'w-[587px] pb-[56px] pt-[46px]',
          'shadow-block',
        )}
      >
        <img src={welcomeIcon} width="313px" />
        <div className="gradient-text1 px-[72px] text-center font-title text-[40px] leading-[46px]">
          Exclusive Trust Service for Digital Assets
        </div>
        <div className="mt-[48px] px-[85px] self-stretch">
          <Button
            block
            onClick={() => navigate('/signIn')}
          >
            Sign In
          </Button>
        </div>
        <div className="mb-[46px] mt-[52px] self-stretch">
          <Divide />
        </div>
        {/* todo: 联系我们 */}
        <div className="underline gradient-text1 font-title cursor-pointer" onClick={() => alert('???')}>Contact Us</div>
      </div>
    </div>
  );
}
