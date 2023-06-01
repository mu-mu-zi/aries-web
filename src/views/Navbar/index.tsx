import React from 'react';
import classNames from 'classnames';
import { NavLink, redirect, useNavigate } from 'react-router-dom';
import { Popover, Transition } from '@headlessui/react';
import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import Button from '../../components/Button';
import navLogoIcon from '../../assets/icon/nav_logo.svg';
import LanguageIcon from '../Icons/LanguageIcon';
import NotifyIcon from '../Icons/NotifyIcon';
import { useUserInfoQuery } from '../../api/user/user';
import personalLogo from '../../assets/icon/personal.svg';
import useAuthToken from '../../hooks/useUserId';
import { useAppDispatch } from '../../state';
import { deleteToken } from '../../state/user';

export default function Navbar() {
  const navigate = useNavigate();
  const userQuery = useUserInfoQuery();
  const queryClient = useQueryClient();
  const token = useAuthToken();
  const action = useAppDispatch();
  const { t, i18n } = useTranslation();

  return (
    <div className={classNames('flex flex-row items-center', 'h-[76px]', 'bg-transparent', 'px-12')}>
      <a className="cursor-pointer" href="https://aries-trust.com">
        <img src={navLogoIcon} height="52px" alt="Trust" />
      </a>
      {!window.location.pathname.startsWith('/first') && token && (
        <div className="flex pl-8">
          <NavLink
            to="/my"
            className={({ isActive }) => classNames('text-[20px] text-[#695D52]')}
          >
            Trust
          </NavLink>
        </div>
      )}
      <div className={classNames('flex-1')} />
      <div className={classNames('flex flex-row items-center gap-6')}>
        {!token && <Button onClick={() => navigate('/welcome')}>Sign in</Button>}
        {/* 个人中心 */}
        {token && (
        <Popover className="relative z-[500]">
          <Popover.Button className="active:outline:none">
            <div className={classNames('cursor-pointer')}><img src={personalLogo} /></div>
          </Popover.Button>
          {/* @ts-ignore */}
          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Popover.Panel className="absolute mt-4 left-[50%] translate-x-[-50%] min-w-[170px]">
              {({ close }) => (
                <div className="gradient-block2 rounded-xl shadow-block">
                  <div className="flex flex-col divide-y divide-[#3B5649]">
                    <div
                      className="px-1 py-3 text-center gradient-text1 text-[20px] cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault();
                        close();
                        navigate('/personal');
                      }}
                    >
                      Account Security
                    </div>
                    <div
                      className="px-1 py-3 text-center gradient-text1 text-[20px] cursor-pointer"
                      onClick={async (e) => {
                        e.preventDefault();
                        try {
                          // await axios.delete('/auth/ariesToken/logout');
                          navigate('/welcome');
                          queryClient.removeQueries();
                          close();
                          action(deleteToken());
                        } catch (e) {
                          console.log(e);
                        }
                      }}
                    >
                      Sign out
                    </div>
                  </div>
                </div>
              )}
            </Popover.Panel>
          </Transition>
        </Popover>
        )}
        {/* 语言 */}
        <Popover className="relative z-[500]">
          <Popover.Button className="active:outline:none">
            <div className={classNames('cursor-pointer')}><LanguageIcon /></div>
          </Popover.Button>
          {/* @ts-ignore */}
          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Popover.Panel className="absolute z-[500] pt-4 left-[50%] translate-x-[-80%] min-w-[170px]">
              {({ close }) => (
                <div className="gradient-block2 rounded-xl shadow-block ">
                  <div className="flex flex-col divide-y divide-[#3B5649]">
                    <div
                      className="px-1 py-3 text-center gradient-text1 text-[20px] cursor-pointer"
                      onClick={async (e) => {
                        e.preventDefault();
                        close();
                        await i18n.changeLanguage('en');
                        localStorage.setItem('LANGUAGE', 'en');
                      }}
                    >
                      English
                    </div>
                    <div
                      className="px-1 py-3 text-center gradient-text1 text-[20px] cursor-pointer"
                      onClick={async (e) => {
                        e.preventDefault();
                        close();
                        await i18n.changeLanguage('zhHK');
                        localStorage.setItem('LANGUAGE', 'zhHK');
                      }}
                    >
                      繁体中文
                    </div>
                  </div>
                </div>
              )}
            </Popover.Panel>
          </Transition>
        </Popover>

        {/* <div className={classNames('cursor-pointer')}><NotifyIcon /></div> */}
      </div>
    </div>
  );
}
