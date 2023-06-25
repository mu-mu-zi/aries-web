import React, {
  ReactNode, Ref, useRef, useState,
} from 'react';
import classNames from 'classnames';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { Popover, Transition } from '@headlessui/react';
import { useQueryClient } from '@tanstack/react-query';
import Divide from '../../components/Divide';
import notifyIcon from '../../assets/icon/db_icon_notify.svg';
import personIcon from '../../assets/icon/db_icon_person.svg';
import messageIcon from '../../assets/icon/db_icon_message.svg';
import exitIcon from '../../assets/icon/db_icon_exit.svg';
import languageIcon from '../../assets/icon/db_icon_language.svg';
import LogoDark from '../../assets/icon/ADG-logo.svg';
import dashboardIcon from '../../assets/icon/dashboard/icons-app_center-1.svg';
import dashboardSelIcon from '../../assets/icon/dashboard/icons-app_center.svg';
import assetIcon from '../../assets/icon/dashboard/icons-credit_card.svg';
import assetSelIcon from '../../assets/icon/dashboard/icons-credit_card-1.svg';
import keyIcon from '../../assets/icon/dashboard/icons-key.svg';
import keySelIcon from '../../assets/icon/dashboard/icons-key-1.svg';
import distIcon from '../../assets/icon/dashboard/icons-color_palette.svg';
import distSelIcon from '../../assets/icon/dashboard/icons-color_palette-1.svg';
import eleIcon from '../../assets/icon/dashboard/icons-id_card.svg';
import eleSelIcon from '../../assets/icon/dashboard/icons-id_card-1.svg';
import billIcon from '../../assets/icon/dashboard/icons-file.svg';
import billSelIcon from '../../assets/icon/dashboard/icons-file-1.svg';
import Logo from '../../components/Logo';
import TrustContainer from './TrustContainer';
import LanguageIcon from '../../views/Icons/LanguageIcon';
import { setLanguage } from '../../state/app';
import { Language } from '../../interfaces/language';
import { useAppDispatch } from '../../state';
import Tooltip from '../../components/Tooltip';

export default function Sidebar() {
  // const { t } = useTranslation();
  const intl = useIntl();
  const navigate = useNavigate();
  const { trustId } = useParams();
  const action = useAppDispatch();
  const queryClient = useQueryClient();
  const [languageTooltipVisible, setLanguageTooltipVisible] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const timeOutRef = useRef<any>(null);

  return (
    <div className="gradient-border-container h-full w-full shadow-block">
      <div className="flex flex-col bg-gradient-to-r from-[#27302D] to-[#42534B] h-full rounded-[12px] overflow-clip">
        {/* 顶部 Logo */}
        <div className="bg-gradient-to-r from-[#BE9D66] to-[#E8D2A3] h-[133px] grid place-items-center">
          <img src={LogoDark} width="184px" alt="Aries" />
        </div>
        {/* <Logo /> */}
        {/* 侧边栏 */}
        <div className="flex-auto flex flex-col p-6 gap-5">
          {[
            [intl.formatMessage({ defaultMessage: 'Dashboard' }), dashboardIcon, dashboardSelIcon, `/trust/${trustId}/dashboard`],
            [intl.formatMessage({ defaultMessage: 'Asset Transfer' }), assetIcon, assetSelIcon, `/trust/${trustId}/assets`],
            [intl.formatMessage({ defaultMessage: 'Investment Order' }), keyIcon, keySelIcon, `/trust/${trustId}/orders`],
            [intl.formatMessage({ defaultMessage: 'Distribution' }), distIcon, distSelIcon, `/trust/${trustId}/distribution`],
            [intl.formatMessage({ defaultMessage: 'Trust Elements' }), eleIcon, eleSelIcon, `/trust/${trustId}/elements`],
            [intl.formatMessage({ defaultMessage: 'Bill and Resources' }), billIcon, billSelIcon, `/trust/${trustId}/billAndResources/ledger`],
          ].map(([title, icon, selectIcon, to], idx) => (
            <SidebarCell
              key={title}
              icon={icon}
              selectedIcon={selectIcon}
              isSelected={window.location.pathname.startsWith(to)}
              onSelected={() => {
                navigate(to);
              }}
            >
              {title}
            </SidebarCell>
          ))}
        </div>
        {/* 分割线 */}
        <Divide />
        {/* 底部工具 */}
        <div className="flex flex-row items-center justify-evenly py-10">
          <Tooltip position="top" title={intl.formatMessage({ defaultMessage: 'Account Security' })}>
            <NavLink to="/personal"><img src={personIcon} className="cursor-pointer w-[22px] h-auto" alt="" /></NavLink>
          </Tooltip>
          <Tooltip position="top" title={intl.formatMessage({ defaultMessage: 'Contact Us' })}>
            <NavLink to={`/contactCustomer/${trustId}`}>
              <img
                src={messageIcon}
                className="cursor-pointer w-[22px] h-auto"
                alt=""
              />
            </NavLink>
          </Tooltip>
          {/* 语言切换 */}
          {/* <Tooltip position="top" title={intl.formatMessage({ defaultMessage: 'Contact Us' })}> */}
          <Popover className="relative z-[500]">
            {({ open }) => (
              <div
                onMouseEnter={() => {
                  clearTimeout(timeOutRef.current);
                  !open && triggerRef.current?.click();
                }}
                onMouseLeave={() => {
                  timeOutRef.current = setTimeout(() => {
                    open && triggerRef.current?.click();
                  }, 120);
                }}
              >
                <Popover.Button
                  className="active:outline:none"
                  ref={triggerRef}
                >
                  {/* <Tooltip title="Language"> */}
                  <img
                    src={languageIcon}
                    className="cursor-pointer w-[22px]"
                  />
                  {/* </Tooltip> */}
                </Popover.Button>
                {/* @ts-ignore */}
                <Transition
                  // show={languageTooltipVisible}
                  enter="transition duration-100 ease-out"
                  enterFrom="transform scale-95 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  leave="transition duration-75 ease-out"
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-95 opacity-0"
                >
                  <Popover.Panel className="absolute z-[500] left-[50%] translate-x-[-50%] bottom-[44px] min-w-[170px]">
                    {({ close }) => (
                      <div className="gradient-block2 rounded-xl shadow-block ">
                        <div className="flex flex-col divide-y divide-[#3B5649]">
                          <div
                            className="px-1 h-[48px] leading-[48px] text-center gradient-text1 text-[20px] cursor-pointer"
                            onClick={async (e) => {
                              e.preventDefault();
                              close();
                              setLanguageTooltipVisible(false);
                              action(setLanguage(Language.EN));
                              queryClient.invalidateQueries();
                            }}
                          >
                            English
                          </div>
                          <div
                            className="px-1 h-[48px] leading-[48px] text-center gradient-text1 text-[20px] cursor-pointer"
                            onClick={async (e) => {
                              e.preventDefault();
                              close();
                              setLanguageTooltipVisible(false);
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
              </div>
            )}
          </Popover>
          {/* </Tooltip> */}
          <Tooltip position="top" title={intl.formatMessage({ defaultMessage: 'Notifications' })}>
            <NavLink to={`/trust/${trustId}/notification`}>
              <img
                src={notifyIcon}
                className="cursor-pointer w-[22px] h-auto"
                alt=""
              />
            </NavLink>
          </Tooltip>
          <Tooltip position="top" title={intl.formatMessage({ defaultMessage: 'Exit Trust' })}>
            <NavLink to="/my"><img src={exitIcon} className="cursor-pointer w-[22px] h-auto" alt="" /></NavLink>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}

function SidebarCell({
  children,
  isSelected,
  icon,
  selectedIcon,
  onSelected,
}: {
  children: string | ReactNode;
  isSelected?: boolean;
  icon: string,
  selectedIcon: string
  onSelected?(): void;
}) {
  return (
    <div
      onClick={onSelected}
      className={classNames(
        'flex flex-row gap-2 items-center cursor-pointer text-[20px] h-[48px] w-full px-8 py-3 rounded-[12px] line-clamp-1 text-ellipsis overflow-hidden transition',
        isSelected && 'font-bold',
        !isSelected && 'font-normal',
        {
          'bg-gradient-to-r from-[#BE9D66] to-[#E8D2A3]': isSelected,
          'shadow-[-4px_4px_4px_0_#1A201C66]': isSelected,
        },
      )}
    >
      <img src={isSelected ? selectedIcon : icon} alt="" />
      <div
        className={classNames({
          'text-[#3D3228] font-bold': isSelected,
          'text-transparent bg-clip-text bg-gradient-to-r from-[#BE9D66] to-[#E8D2A3]': !isSelected,
        })}
      >
        {children}
      </div>
    </div>
  );
}
