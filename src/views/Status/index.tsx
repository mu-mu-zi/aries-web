import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Button from '../../components/Button';
import sucIcon from '../../assets/icon/status_suc.svg';
import footerImg from '../../assets/icon/footer_graat.svg';

/*
* 参数：
* title: string,
* description: string,
* navTo: string
* */
export default function Status() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="flex flex-col justify-center flex-1">
      <div className="flex-1 flex flex-col items-center justify-center h-full">
        <div className="flex flex-col items-center gap-8 w-[1000px] p-12 gradient-bg2 shadow-block rounded-xl overflow-clip">
          <img src={sucIcon} width="44px" alt="" />
          <div className="gradient-text1 font-title font-bold text-[32px]">{location.state.title}</div>
          <div className="text-[#708077] text-[14px]">{location.state.description}</div>
          <div className="mt-8">
            <Button
              onClick={() => navigate(location.state.navTo, {
                replace: true,
              })}
            >
              {t('I Know')}
            </Button>
          </div>
        </div>
      </div>
      <img src={footerImg} className="max-w-[1024px] mx-auto my-10" alt="" />
    </div>
  );
}
