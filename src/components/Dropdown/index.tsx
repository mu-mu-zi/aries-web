import React from 'react';
import { Menu, Transition } from '@headlessui/react';
import classNames from 'classnames';
import icon from '../../assets/icon/arrow_down.svg';

export default function Dropdown({ title, items, onSelected }: {
  title?: string,
  items?: string[],
  onSelected?(index: number): void
}) {
  return (
    <Menu as="div" className="relative block w-full">
      <div className="bg-[#3B5649] rounded-xl shadow-input shadow-inner">
        <Menu.Button
          className="inline-flex w-full items-center justify-between rounded-xl px-6 h-[48px]"
        >
          <div className="gradient-text1 text-[20px] font-bold">{title}</div>
          <img src={icon} width="32px" />
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
          className="absolute right-0 z-10 mt-1 w-full origin-top-right"
        >
          <div className="rounded-xl shadow-block overflow-clip bg-gradient-to-r from-[#1a4132] to-[#234838] text-[20px]">
            {items?.map((it, idx) => (
              <Menu.Item>
                {({ active }) => (
                  <div
                    onClick={() => onSelected?.(idx)}
                    className={classNames('block  cursor-pointer', active ? 'bg-[#3B5649]' : 'bg-transparent')}
                  >
                    <div className={classNames('px-6 h-[48px] leading-[48px] gradient-text1')}>
                      {it}
                    </div>
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
