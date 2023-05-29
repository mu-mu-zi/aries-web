import React from 'react';
import { Menu, Transition } from '@headlessui/react';
import classNames from 'classnames';
import { css } from '@emotion/react';
import icon from '../../assets/icon/arrow_down.svg';

export default function Dropdown({
  title, items, onSelected, block,
}: {
  title?: string | null,
  items?: string[],
  onSelected?(index: number): void,
  block?: boolean
}) {
  return (
    <Menu
      as="div"
      className={classNames('relative block', {
        // 'w-fit': !block,
        // 'w-full': block,
      })}
    >
      <div className="bg-[#3B5649] rounded-xl input-inner-shadow">
        <Menu.Button className="box-content pl-4 w-full flex flex-row gap-2 items-center justify-between w-full h-[48px]">
          {/* <div className="flex flex-row gap-2 items-center justify-between w-full h-[48px]"> */}
          <div className="gradient-text1 text-[20px] font-bold">{title}</div>
          <img src={icon} className="flex-shrink-0 w-[32px] h-[32px] mr-8" alt="" />
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
          className="absolute z-[200] right-0 mt-1 min-w-[136px] w-full max-h-[260px] overflow-y-auto origin-top-left rounded-xl"
          css={css`
            &::-webkit-scrollbar {
              display: none;
            }
          `}
        >
          <div className="shadow-block overflow-clip bg-gradient-to-r from-[#1a4132] to-[#234838] text-[20px]">
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
                    <div className={classNames('px-6 h-[48px] leading-[48px] gradient-text1')}>{it}</div>
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
