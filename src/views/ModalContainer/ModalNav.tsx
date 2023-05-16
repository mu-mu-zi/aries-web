import React from 'react';
import ModalTitle from './ModalTitle';
import closeIcon from '../../assets/icon/model_close.svg';

export default function ModalNav({
  title,
  onClose,
}: {
    title: string,
    onClose?(): void
}) {
  return (
    <div className="flex flex-col gap-4 mb-4">
      <div className="flex flex-row gap-8 items-center justify-between">
        <ModalTitle>{title}</ModalTitle>
        <div
          className="cursor-pointer"
          onClick={onClose}
        >
          <img src={closeIcon} width="48px" alt="" />
        </div>
      </div>
      <div className="h-[1px] bg-[#3B5649]" />
    </div>
  );
}
