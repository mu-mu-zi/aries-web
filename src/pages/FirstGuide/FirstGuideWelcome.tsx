import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import bg from '../../assets/icon/envelop_bg.svg';
import Button from '../../components/Button';
import { useUserInfoQuery } from '../../api/user/user';

export default function FirstGuideWelcome() {
  const { trustId } = useParams();
  const navigate = useNavigate();
  const userQuery = useUserInfoQuery();
  const { t } = useTranslation();

  return (
    <div className="justify-center flex h-full flex-col items-center">
      <div
        className="w-[1024px] h-[680px] bg-cover bg-center bg-no-repeat flex flex-col items-center gap-4 p-8 rounded-xl"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="mt-[94px] gradient-text1 font-blod text-center text-[40px] font-title text-shadow-block">
          {`Dear ${userQuery.data?.data?.userName}`}
        </div>
        <div className="mt-4 max-w-[548px] text-center text-[20px] font-title text-[#C39770] leading-[23px] font-[400]">
          {t('Welcome to the digital trust exclusively established for you, opening the door to digital wealth. You will be able to see all trust assets and view all records.')}
        </div>
        <div className="mt-10">
          <Button onClick={() => navigate(`/first/${trustId}/KycVerify`)}>Open</Button>
        </div>
      </div>
    </div>
  );
}
