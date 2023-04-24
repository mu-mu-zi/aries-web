import React from 'react';
import { Menu, Transition } from '@headlessui/react';
import classNames from 'classnames';
import icon from '../../assets/icon/arrow_down.svg';

export default function Dropdown({ title }: {
    title: string
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
          className="absolute right-0 z-10 mt-2 w-full origin-top-right"
        >
          <div className="py-1 rounded-xl shadow-block gradient-border1">
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-6 h-[48px] leading-[48px]',
                  )}
                >
                  Account settings
                </a>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
