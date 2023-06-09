import React, { useMemo } from 'react';
import classNames from 'classnames';
import { NavLink, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { FormattedMessage, useIntl } from 'react-intl';
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
import TextButton from '../../components/TextButton';
import { addNotification, addSuccessNotification } from '../../utils/Notification';

export default function Security() {
  // const { t } = useTranslation();
  const intl = useIntl();
  const [editVisible, setEditVisible] = React.useState(false);
  const user = useUserInfoQuery();
  const securityLevel = useMemo(() => {
    let summary = 0;
    if (user.data?.data?.emailAuth) {
      summary += 1;
    }
    if (user.data?.data?.mobileAuth) {
      summary += 1;
    }
    if (user.data?.data?.googleSecretAuth) {
      summary += 1;
    }
    return summary;
  }, [user.data?.data]);
  const navigate = useNavigate();
  const loginLogQuery = useLoginLogQuery({
    pageIndex: 1,
    pageSize: 1,
  });
  const securityLevelText = useMemo(() => {
    switch (securityLevel) {
      case 1:
        return intl.formatMessage({ defaultMessage: 'Low' });
      case 2:
        return intl.formatMessage({ defaultMessage: 'Medium' });
      case 3:
        return intl.formatMessage({ defaultMessage: 'High' });
      default:
        return '--';
    }
  }, [securityLevel]);

  const checkEmailMobileBindState = (isEmail: boolean): boolean => {
    if (isEmail && user.data?.data?.mobileAuth) {
      return true;
    }
    if (!isEmail && user.data?.data?.emailAuth) {
      return true;
    }
    addSuccessNotification({
      title: intl.formatMessage({ defaultMessage: 'Either phone number or email must be kept' }),
    });
    return false;
  };

  return (
    <>
      <Container>
        <div className="flex flex-col gap-6 max-w-[1200px] w-full">
          {/* header */}
          <div className="gradient-bg2 flex flex-col gap-4 rounded-xl p-8 pb-4 shadow-block">
            <div className="flex flex-col items-center gap-8">
              <LargeAvatar isMale={!user.data?.data?.gender} />
              <div className="flex flex-row items-center gap-4">
                <div className="gradient-text1 font-bold font-title text-[40px] text-shadow-block">
                  {CallFormat(user.data?.data?.surname, user.data?.data?.gender, true)}
                </div>
                <div
                  className="cursor-pointer"
                  onClick={() => setEditVisible(true)}
                >
                  <img src={editIcon} width="32px" alt="" />
                </div>
              </div>
              <div className="text-[#99AC9B] text-[16px]">
                {`User ID: ${user.data?.data?.id}`}
              </div>
            </div>
            <Hr />
            <NavLink to="/loginLog" className="flex flex-row justify-between gap-8 cursor-pointer">
              <div className="flex flex-col gap-2 text-[#99AC9B] text-[16px]">
                <div className="font-bold text-[20px]"><FormattedMessage defaultMessage="Login Log" /></div>
                <div className="text-[16px]">
                  {/* eslint-disable-next-line no-unsafe-optional-chaining */}
                  {loginLogQuery.data?.data?.records[0] && `Last Login: ${unixFormatTime(loginLogQuery.data.data.records[0].createTimeStamp)}`}
                </div>
              </div>
              <img width="32px" src={arrowR} alt="" />
            </NavLink>
          </div>
          {/* V */}
          <div className="flex flex-col rounded-xl gradient-bg2 shadow-block">
            {/* star */}
            <div className="flex flex-row justify-between items-center gradient-border1 p-8 rounded-t-xl">
              <div className="flex flex-col gap-2">
                <div className="font-title font-bold text-[20px] text-[#3D3228]">
                  <FormattedMessage defaultMessage="Dual Verification(2FA)" />
                </div>
                <div className="text-[16px] text-[#695D52]">
                  <FormattedMessage defaultMessage="Current account security level: {level}" values={{ level: securityLevelText }} />
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
                  <div className="text-[20px] font-bold"><FormattedMessage defaultMessage="Email verification" /></div>
                  <div className="flex flex-row gap-2 items-center">
                    <img src={user.data?.data?.emailAuth ? statusOkIcon : statusWarningIcon} alt="" />
                    <div
                      className={classNames('text-[16px]', !user.data?.data?.emailAuth && 'text-[#708077]')}
                    >
                      {user.data?.data?.userEmail ?? <FormattedMessage defaultMessage="Unbound" /> }
                    </div>
                  </div>
                </div>
                <div className="flex flex-row items-center gap-4 font-title text-[14px]">
                  <NavLink to="/personal/changeEmail">
                    <TextButton>{user.data?.data?.emailAuth ? <FormattedMessage defaultMessage="Change" /> : <FormattedMessage defaultMessage="Bind" /> }</TextButton>
                  </NavLink>
                  {user.data?.data?.emailAuth && (
                    <TextButton onClick={() => {
                      if (checkEmailMobileBindState(true)) {
                        navigate('/personal/unbindEmailOrMobile', {
                          state: { isPhone: false },
                        });
                      }
                    }}
                    >
                      <FormattedMessage defaultMessage="Unbind" />
                    </TextButton>
                  )}
                </div>
              </div>
              <Hr />
              {/* Mobile */}
              <div className="flex flex-row justify-between">
                <div className="flex flex-col gap-2 text-[#99AC9B]">
                  <div className="text-[20px] font-bold"><FormattedMessage defaultMessage="Mobile Phone verification" /></div>
                  <div className="flex flex-row gap-2 items-center">
                    <img src={user.data?.data?.mobileAuth ? statusOkIcon : statusWarningIcon} alt="" />
                    <div
                      className={classNames('text-[16px]', !user.data?.data?.mobileAuth && 'text-[#708077]')}
                    >
                      {user.data?.data?.userMobile ?? <FormattedMessage defaultMessage="Unbound" /> }
                    </div>
                  </div>
                </div>
                <div className="flex flex-row items-center gap-4 font-title text-[14px]">
                  <NavLink to="/personal/changeMobile">
                    <TextButton>{user.data?.data?.mobileAuth ? <FormattedMessage defaultMessage="Change" /> : <FormattedMessage defaultMessage="Bind" />}</TextButton>
                  </NavLink>
                  {user.data?.data?.mobileAuth && (
                    <TextButton onClick={() => {
                      if (checkEmailMobileBindState(false)) {
                        navigate('/personal/unbindEmailOrMobile', {
                          state: { isPhone: true },
                        });
                      }
                    }}
                    >
                      <FormattedMessage defaultMessage="Unbind" />
                    </TextButton>
                  )}
                </div>
              </div>
              <Hr />
              {/* Google */}
              <div className="flex flex-row justify-between">
                <div className="flex flex-col gap-2 text-[#99AC9B]">
                  <div className="text-[20px] font-bold"><FormattedMessage defaultMessage="Google verification" /></div>
                </div>
                <div className="flex flex-row items-center gap-4 font-title text-[14px]">
                  <NavLink
                    to={user.data?.data?.googleSecretAuth ? '/personal/gaUnbind' : '/personal/gaChangeScan'}
                  >
                    <TextButton>{user.data?.data?.googleSecretAuth ? <FormattedMessage defaultMessage="Change" /> : <FormattedMessage defaultMessage="Bind" /> }</TextButton>
                  </NavLink>
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
