import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import bg from '../../assets/icon/xinfeng_bg.png';
import Button from '../../components/Button';
import { useUserInfoQuery } from '../../api/user/user';
import { CallFormat } from '../../utils/CallFormat';
import FooterNote from '../../views/FooterNote';

export default function FirstGuideWelcome() {
  const { trustId } = useParams();
  const navigate = useNavigate();
  const userQuery = useUserInfoQuery();
  const { t } = useTranslation();

  const mark = async () => {
    await axios.request({
      url: '/trust/trust/report',
      method: 'get',
      params: {
        trustId: Number(trustId),
      },
    });
    navigate(`/trust/${trustId}/dashboard`, {
      replace: true,
    });
  };

  return (
    <div>
      <div className="justify-center flex h-full flex-col items-center cursor-pointer" onClick={mark}>
        <div
          className="w-[1024px] h-[680px] bg-cover bg-center bg-no-repeat flex flex-col items-center gap-4 p-8 rounded-xl"
          style={{ backgroundImage: `url(${bg})` }}
        >
          <div className="mt-[94px] gradient-text1 font-bold text-center text-[40px] font-title text-shadow-block">
            {/* {`Dear ${userQuery.data?.data?.userName}`} */}
            {CallFormat(userQuery.data?.data?.surname, userQuery.data?.data?.gender, true)}
          </div>
          <div className="mt-4 max-w-[548px] text-center text-[20px] font-title text-[#C39770] leading-[23px]">
            {t('Welcome to the digital trust exclusively established for you, opening the door to digital wealth. You will be able to see all trust assets and view all records.')}
          </div>
          {/* <div className="mt-10"> */}
          {/*  <Button onClick={() => navigate(`/first/${trustId}/KycVerify`)}>Open</Button> */}
          {/* </div> */}
        </div>
      </div>
      <FooterNote />
    </div>
  );
}
