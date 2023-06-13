import React from 'react';
import { Menu, Transition } from '@headlessui/react';
import classNames from 'classnames';
import { css } from '@emotion/react';
import icon from '../../assets/icon/arrow_down.svg';

export default function Dropdown({
  title,
  items,
  onSelected,
  block,
}: {
  title?: string | null;
  items?: string[];
  onSelected?(index: number): void;
  block?: boolean;
}) {
  return (
    <Menu
      as="div"
      className={classNames('bl relative block', {
        // 'w-fit': !block,
        // 'w-full': block,
      })}
    >
      <div className="input-inner-shadow rounded-xl bg-[#3B5649]">
        <Menu.Button className="box-content flex h-[48px] w-full flex-row items-center justify-between gap-2 pl-4">
          {/* <div className="flex flex-row gap-2 items-center justify-between w-full h-[48px]"> */}
          <div className="gradient-text1 text-[20px] font-bold">{title}</div>
          <img src={icon} className="mr-8 h-[32px] w-[32px] flex-shrink-0" alt="" />
          {/* </div> */}
        </Menu.Button>
      </div>
      {/* @ts-ignore */}
      <Transition
        as={React.Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className="absolute right-0 z-[200] mt-1 max-h-[260px] w-full min-w-[136px] origin-top-left overflow-y-auto rounded-xl"
          css={css`
            &::-webkit-scrollbar {
              display: none;
            }
          `}
        >
          <div className="overflow-clip bg-gradient-to-r from-[#1a4132] to-[#234838] text-[20px] shadow-block">
            {items?.map((it, idx) => (
              <Menu.Item key={it}>
                {({ active, close }) => (
                  <div
                    className={classNames('block cursor-pointer', active ? 'bg-[#3B5649]' : 'bg-transparent')}
                    onClick={(e) => {
                      e.preventDefault();
                      onSelected?.(idx);
                      close();
                    }}
                  >
                    <div className={classNames('gradient-text1 h-[48px] px-6 leading-[48px]')}>{it}</div>
                  </div>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
