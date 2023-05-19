import React from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

export default function VerifyStatusRow({
  icon,
  title,
  isOpening,
}: {
  icon: string;
  title: string;
  isOpening: boolean;
}) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-row items-center gap-1 bg-[#3B5649] px-8 py-4 shadow-block rounded-xl">
      <img src={icon} width="32px" alt={title} />
      <div className="gradient-text1 font-blod flex-auto text-[14px]">{title}</div>
      <div className={classNames('font-bold text-[14px] transition', {
        'text-[#C2D7C7F6]': !isOpening,
        'text-[#708077]': isOpening,
      })}
      >
        {isOpening ? t('Opening in progress') : t('Successfully opened')}
      </div>
    </div>
  );
}
