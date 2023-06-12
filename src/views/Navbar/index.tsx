import React from 'react';
import classNames from 'classnames';
import { NavLink, useNavigate } from 'react-router-dom';
import { Popover, Transition } from '@headlessui/react';
import { useQueryClient } from '@tanstack/react-query';
import { defineMessage, FormattedMessage, useIntl } from 'react-intl';
import axios from 'axios';
import Button from '../../components/Button';
import navLogoIcon from '../../assets/icon/nav_logo.svg';
import LanguageIcon from '../Icons/LanguageIcon';
import { useUserInfoQuery } from '../../api/user/user';
import personalLogo from '../../assets/icon/personal.svg';
import useAuthToken from '../../hooks/useUserId';
import { useAppDispatch } from '../../state';
import { deleteToken } from '../../state/user';
import { setLanguage } from '../../state/app';
import { Language } from '../../interfaces/language';

export default function Navbar() {
  const navigate = useNavigate();
  const userQuery = useUserInfoQuery();
  const queryClient = useQueryClient();
  const token = useAuthToken();
  const action = useAppDispatch();
  const intl = useIntl();
  // const { t, i18n } = useTranslation();

  return (
    <div className={classNames('flex flex-row items-center', 'h-[76px]', 'bg-transparent', 'px-12')}>
      <a className="cursor-pointer" href={import.meta.env.VITE_HOME}>
        <img src={navLogoIcon} height="52px" alt="Trust" />
      </a>
      {!window.location.pathname.startsWith('/first') && token && (
        <div className="flex pl-8 items-center gap-4">
          <NavLink
            to="/my"
            className={({ isActive }) => classNames('text-[20px] text-[#695D52]')}
          >
            <FormattedMessage defaultMessage="Trust" />
          </NavLink>
          {/* <Button onClick={() => { */}
          {/*  navigate('/status', { */}
          {/*    state: { */}
          {/*      title: defineMessage({ defaultMessage: 'Congratulations!' }), */}
          {/*      description: defineMessage({ defaultMessage: 'Congratulations! You have successfully bound Google Authenticator.' }), */}
          {/*      navTo: '/', */}
          {/*    }, */}
          {/*    replace: true, */}
          {/*  }); */}
          {/* }} */}
          {/* > */}
          {/*  Test */}
          {/* </Button> */}
        </div>
      )}
      <div className={classNames('flex-1')} />
      <div className={classNames('flex flex-row items-center gap-6')}>
        {!token && !window.location.pathname.startsWith('/welcome') && !window.location.pathname.startsWith('') && (
          <Button onClick={() => navigate('/welcome')}>
            <FormattedMessage defaultMessage="Login" />
          </Button>
        )}
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
                        <FormattedMessage defaultMessage="Account Security" />
                      </div>
                      <div
                        className="px-1 py-3 text-center gradient-text1 text-[20px] cursor-pointer"
                        onClick={async (e) => {
                          e.preventDefault();
                          try {
                            await axios.delete('/auth/ariesToken/logout');
                            navigate('/welcome');
                            action(deleteToken());
                            queryClient.removeQueries();
                            close();
                          } catch (e) {
                            console.log(e);
                          }
                        }}
                      >
                        <FormattedMessage defaultMessage="Sign out" />
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
                        action(setLanguage(Language.EN));
                        queryClient.invalidateQueries();
                      }}
                    >
                      English
                    </div>
                    <div
                      className="px-1 py-3 text-center gradient-text1 text-[20px] cursor-pointer"
                      onClick={async (e) => {
                        e.preventDefault();
                        close();
                        action(setLanguage(Language.HK));
                        queryClient.invalidateQueries();
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
