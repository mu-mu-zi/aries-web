import React, { ReactNode, useState } from 'react';
import classNames from 'classnames';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Divide from '../../components/Divide';
import notifyIcon from '../../assets/icon/db_icon_notify.svg';
import personIcon from '../../assets/icon/db_icon_person.svg';
import messageIcon from '../../assets/icon/db_icon_message.svg';
import exitIcon from '../../assets/icon/db_icon_exit.svg';
import languageIcon from '../../assets/icon/db_icon_language.svg';
import LogoDark from '../../assets/icon/LogoDark.svg';
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

export default function Sidebar() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { trustId } = useParams();

  return (
    <div className="bg-gradient-to-b from-[#446052] to-[#2E4037] p-0.5 rounded-[12px] h-full w-full">
      <div className="flex flex-col bg-gradient-to-r from-[#27302D] to-[#42534B] h-full rounded-[12px] overflow-clip">
        {/* 顶部 Logo */}
        <div className="bg-gradient-to-r from-[#BE9D66] to-[#E8D2A3] h-[133px] grid place-items-center">
          <img src={LogoDark} width="184px" alt="Aries" />
        </div>
        {/* 侧边栏 */}
        <div className="flex-auto flex flex-col p-6 gap-5">
          {[
            [t('Dashboard'), dashboardIcon, dashboardSelIcon, `/trust/${trustId}/dashboard`],
            [t('Asset Transfer'), assetIcon, assetSelIcon, `/trust/${trustId}/assets`],
            [t('Investment Order'), keyIcon, keySelIcon, `/trust/${trustId}/orders`],
            [t('Distribution'), distIcon, distSelIcon, `/trust/${trustId}/distribution`],
            [t('Trust Elements'), eleIcon, eleSelIcon, `/trust/${trustId}/elements`],
            [t('Bill and Resources'), billIcon, billSelIcon, `/trust/${trustId}/billAndResources`],
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
          {
            [
              [personIcon, t('Personal'), '/personal'],
              [messageIcon, t('Message'), `/trust/${trustId}/notification`],
              /* todo: 国际化切换 */
              // [languageIcon, t('Language'), `/trust/${trustId}`],
              [notifyIcon, t('Notification'), `/trust/${trustId}/notification`],
              [exitIcon, t('Exit'), '/my'],
            ].map(([icon, alt, to], idx) => (
              <div
                className="cursor-pointer"
                onClick={() => navigate(to)}
              >
                <img src={icon} className="w-[22px] h-auto" alt={alt} />
              </div>
            ))
          }
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
        'flex flex-row gap-2 items-center cursor-pointer text-[20px] h-[48px] w-full px-8 py-3 rounded-[12px] line-clamp-1 transition',
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
