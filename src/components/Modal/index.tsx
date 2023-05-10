import React, { ReactNode, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';

export default function Modal({
  children,
  visible,
  onClose,
}: {
    children: ReactNode,
    visible: boolean,
    onClose?(): void
}) {
  return (
  /* @ts-ignore */
    <Transition
      show={visible}
      appear
      as={React.Fragment}
    >
      <div>
        {/* @ts-ignore */}
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-[#0A0E0D] bg-opacity-70" />
        </Transition.Child>

        {/* 内容 */}
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div
            className="fixed inset-0 grid place-items-center"
            onClick={onClose}
          >
            {children}
          </div>
        </Transition.Child>
      </div>
    </Transition>
  );
}
