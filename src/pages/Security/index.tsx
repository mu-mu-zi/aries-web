import React, { useMemo } from 'react';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import Hr from '../../components/Hr';
import arrowR from '../../assets/icon/arrow_r.svg';
import LargeAvatar from '../../components/LargeAvatar';
import editIcon from '../../assets/icon/edit.svg';
import starNorIcon from '../../assets/icon/star_nor.svg';
import starSelIcon from '../../assets/icon/star_sel.svg';
import statusOkIcon from '../../assets/icon/status_ok.svg';
import statusWarningIcon from '../../assets/icon/statusWarning.svg';
import Modal from '../../components/Modal';
import EditPersonal from './EditPersonal';
import Container from '../../views/Container';
import { useLoginLogQuery, useUserInfoQuery } from '../../api/user/user';
import { CallFormat } from '../../utils/CallFormat';
import { unixFormatTime } from '../../utils/DateFormat';
import footerImg from '../../assets/icon/footer_graat.svg';

export default function Security() {
  const { t } = useTranslation();
  const [editVisible, setEditVisible] = React.useState(false);
  const user = useUserInfoQuery();
  const securityLevel = useMemo(() => {
    let summary = 0;
    if (user.data?.data?.emailAuth) { summary += 1; }
    if (user.data?.data?.mobileAuth) { summary += 1; }
    if (user.data?.data?.googleSecretAuth) { summary += 1; }
    return summary;
  }, [user.data?.data]);
  const navigate = useNavigate();
  const loginLogQuery = useLoginLogQuery({
    pageIndex: 1,
    pageSize: 1,
  });
  const securityLevelText = useMemo(() => {
    switch (securityLevel) {
      case 1: return t('Low');
      case 2: return t('Medium');
      case 3: return t('High');
      default: return undefined;
    }
  }, [securityLevel]);

  return (
    <>
      <Container>
        <div className="flex flex-col gap-6 max-w-[1200px] w-full">
          {/* header */}
          <div className="gradient-bg2 flex flex-col gap-4 rounded-xl p-8 pb-4">
            <div className="flex flex-col items-center gap-8">
              <LargeAvatar isMale={!user.data?.data?.gender} />
              <div className="flex flex-row items-center gap-4">
                <div className="gradient-text1 font-bold font-title text-[40px]">
                  {CallFormat(user.data?.data?.userName, user.data?.data?.gender)}
                </div>
                <div
                  className="cursor-pointer"
                  onClick={() => setEditVisible(true)}
                >
                  <img src={editIcon} width="32px" alt="Edit" />
                </div>
              </div>
              <div className="text-[#99AC9B] text-[16px]">
                {`User ID: ${user.data?.data?.id}`}
              </div>
            </div>
            <Hr />
            <div className="flex flex-row justify-between gap-8 cursor-pointer" onClick={() => navigate('/loginLog')}>
              <div className="flex flex-col gap-2 text-[#99AC9B] text-[16px]">
                <div className="font-bold text-[20px]">{t('Login Log')}</div>
                <div className="text-[16px]">
                  {/* eslint-disable-next-line no-unsafe-optional-chaining */}
                  {loginLogQuery.data?.data?.records[0] && `Last Login: ${unixFormatTime(loginLogQuery.data?.data?.records[0]?.createTimeStamp)}`}
                </div>
              </div>
              <img width="32px" src={arrowR} alt="" />
            </div>
          </div>
          {/* V */}
          <div className="flex flex-col rounded-xl gradient-bg2">
            {/* star */}
            <div className="flex flex-row justify-between items-center gradient-border1 p-8 rounded-t-xl">
              <div className="flex flex-col gap-2">
                <div className="font-title font-bold text-[20px]">{t('Dual Verification(2FA)')}</div>
                <div className="text-[16px] text-[#695D52]">
                  {`Current account security level: ${securityLevelText}`}
                </div>
              </div>
              <div className="flex flex-row items-center gap-2">
                {new Array(securityLevel).fill(null).map(() => <img src={starSelIcon} width="20px" alt="" />)}
                {new Array(3 - securityLevel).fill(null).map(() => <img src={starNorIcon} width="20px" alt="" />)}
              </div>
            </div>
            <div className="p-8 flex flex-col gap-4">
              {/* Email */}
              <div className="flex flex-row justify-between">
                <div className="flex flex-col gap-2 text-[#99AC9B]">
                  <div className="text-[20px] font-bold">{t('Email verification')}</div>
                  <div className="flex flex-row gap-2 items-center">
                    <img src={user.data?.data?.emailAuth ? statusOkIcon : statusWarningIcon} alt="" />
                    <div className={classNames('text-[16px]', !user.data?.data?.emailAuth && 'text-[#708077]')}>{user.data?.data?.userEmail ?? t('Unbound')}</div>
                  </div>
                </div>
                <div className="flex flex-row items-center gap-4 font-title text-[14px]">
                  <div className="gradient-text2 cursor-pointer" onClick={() => navigate('/personal/changeEmail')}>{user.data?.data?.emailAuth ? t('Change') : t('Bind')}</div>
                </div>
              </div>
              <Hr />
              {/* Mobile */}
              <div className="flex flex-row justify-between">
                <div className="flex flex-col gap-2 text-[#99AC9B]">
                  <div className="text-[20px] font-bold">{t('Mobile Phone verification')}</div>
                  <div className="flex flex-row gap-2 items-center">
                    <img src={user.data?.data?.mobileAuth ? statusOkIcon : statusWarningIcon} alt="" />
                    <div className={classNames('text-[16px]', !user.data?.data?.mobileAuth && 'text-[#708077]')}>{user.data?.data?.userMobile ?? t('Unbound')}</div>
                  </div>
                </div>
                <div className="flex flex-row items-center gap-4 font-title text-[14px]">
                  <div className="gradient-text2 cursor-pointer" onClick={() => navigate('/personal/changeMobile')}>{user.data?.data?.mobileAuth ? t('Change') : t('Bind')}</div>
                </div>
              </div>
              <Hr />
              {/* Google */}
              <div className="flex flex-row justify-between">
                <div className="flex flex-col gap-2 text-[#99AC9B]">
                  <div className="text-[20px] font-bold">{t('Google verification')}</div>
                </div>
                <div className="flex flex-row items-center gap-4 font-title text-[14px]">
                  <div className="gradient-text2 cursor-pointer">{t('Change')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Modal
        visible={editVisible}
        onClose={() => setEditVisible(false)}
      >
        <EditPersonal
          onClose={() => setEditVisible(false)}
        />
      </Modal>
      <img src={footerImg} className="max-w-[1024px] mx-auto my-10" alt="" />
    </>
  );
}
