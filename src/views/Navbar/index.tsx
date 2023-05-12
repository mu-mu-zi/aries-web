import React from 'react';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import navLogoIcon from '../../assets/icon/nav_logo.svg';
import LanguageIcon from '../Icons/LanguageIcon';
import NotifyIcon from '../Icons/NotifyIcon';
import { useUserInfoQuery } from '../../api/user/user';

export default function Navbar() {
  const navigate = useNavigate();
  const userQuery = useUserInfoQuery();

  return (
    <div className={classNames('flex flex-row items-center', 'h-[76px]', 'bg-transparent', 'px-12')}>
      <div>
        <img src={navLogoIcon} height="52px" />
      </div>
      <div className={classNames('flex-1')}>menu</div>
      <div className={classNames('flex flex-row items-center gap-6')}>
        {!userQuery.data?.data && <Button size="medium" onClick={() => navigate('/signIn')}>Sign in</Button>}
        <div className={classNames('cursor-pointer')}><LanguageIcon /></div>
        <div className={classNames('cursor-pointer')}><NotifyIcon /></div>
      </div>
    </div>
  );
}
