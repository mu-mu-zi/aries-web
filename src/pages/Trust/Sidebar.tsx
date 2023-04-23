import React, { ReactNode, useState } from 'react';
import classNames from 'classnames';
import Divide from '../../components/Divide';
import notifyIcon from '../../assets/icon/db_icon_notify.svg';
import personIcon from '../../assets/icon/db_icon_person.svg';
import messageIcon from '../../assets/icon/db_icon_message.svg';
import exitIcon from '../../assets/icon/db_icon_exit.svg';
import languageIcon from '../../assets/icon/db_icon_language.svg';

export default function Sidebar() {
  const [index, setIndex] = useState(0);

  return (
    <div className="bg-gradient-to-b from-[#446052] to-[#2E4037] p-0.5 rounded-[12px] h-full w-full">
      <div className="flex flex-col bg-gradient-to-r from-[#27302D] to-[#42534B] h-full rounded-[12px] overflow-clip">
        {/* 顶部 Logo */}
        <div className="bg-gradient-to-r from-[#BE9D66] to-[#E8D2A3] h-[133px]" />
        {/* 侧边栏 */}
        <div className="flex-auto flex flex-col p-6 gap-5">
          {[
            'Dashboard',
            'Asset Transfer',
            'Investment Order',
            'Distribution',
            'Trust Elements',
            'Bill and Resources',
          ].map((it, idx) => (
            <SidebarCell key={it} isSelected={index === idx} onSelected={() => setIndex(idx)}>
              {it}
            </SidebarCell>
          ))}
        </div>
        {/* 分割线 */}
        <Divide />
        {/* 底部工具 */}
        <div className="flex flex-row items-center justify-evenly py-10">
          <div className="cursor-pointer">
            <img src={personIcon} className="w-[22px] h-auto" alt="Personal" />
          </div>
          <div className="cursor-pointer">
            <img src={messageIcon} className="w-[22px] h-auto" alt="Message" />
          </div>
          <div className="cursor-pointer">
            <img src={languageIcon} className="w-[22px] h-auto" alt="Language" />
          </div>
          <div className="cursor-pointer">
            <img src={notifyIcon} className="w-[22px] h-auto" alt="Notify" />
          </div>
          <div className="cursor-pointer">
            <img src={exitIcon} className="w-[22px] h-auto" alt="Exit" />
          </div>
        </div>
      </div>
    </div>
  );
}

function SidebarCell({
  children,
  isSelected,
  onSelected,
}: {
  children: string | ReactNode;
  isSelected?: boolean;
  onSelected?(): void;
}) {
  return (
    <div
      onClick={onSelected}
      className={classNames(
        'flex flex-row items-center cursor-pointer font-[400] text-[20px] h-[48px] w-full px-8 py-3 rounded-[12px] line-clamp-1 transition-all',
        {
          'bg-gradient-to-r from-[#BE9D66] to-[#E8D2A3]': isSelected,
          'shadow-[-4px_4px_4px_0_#1A201C66]': isSelected,
        },
      )}
    >
      <div
        className={classNames({
          'text-[#3D3228] font-[600]': isSelected,
          'text-transparent bg-clip-text bg-gradient-to-r from-[#BE9D66] to-[#E8D2A3]': !isSelected,
        })}
      >
        {children}
      </div>
    </div>
  );
}
