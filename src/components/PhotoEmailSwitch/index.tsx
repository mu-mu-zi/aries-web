import React from 'react';
import classNames from 'classnames';
import mobileIcon from '../../assets/icon/mobile_nor.svg';
import mobileSelIcon from '../../assets/icon/mobile_sel.svg';
import emailIcon from '../../assets/icon/email_nor.svg';
import emailSelIcon from '../../assets/icon/email_sel.svg';

export default function PhotoEmailSwitch({ onSelected }: { onSelected?(isPhoto: boolean): void }) {
  const [isPhone, setIsPhone] = React.useState(true);

  return (
    <div className="flex flex-row gap-4">
      <SwitchButton
        icon={mobileIcon}
        selectedIcon={mobileSelIcon}
        text="Phone"
        isSelected={isPhone}
        onTap={() => {
          setIsPhone(true);
          onSelected?.(true);
        }}
      />
      <SwitchButton
        icon={emailIcon}
        selectedIcon={emailSelIcon}
        text="Email"
        isSelected={!isPhone}
        onTap={() => {
          setIsPhone(false);
          onSelected?.(false);
        }}
      />
    </div>
  );
}

function SwitchButton({
  icon,
  selectedIcon,
  text,
  isSelected,
  onTap,
}: {
  icon: string;
  selectedIcon: string;
  text: string;
  isSelected: boolean;
  onTap?(): void;
}) {
  return (
    <div
      className={classNames(
        'flex h-[48px] flex-1 cursor-pointer flex-row items-center justify-center gap-2 overflow-clip rounded-xl transition',
        isSelected && 'font-bold',
        {
          'gradient-border1': isSelected,
          'bg-divider': !isSelected,
        },
      )}
      onClick={onTap}
    >
      <img src={isSelected ? selectedIcon : icon} alt={text} />
      <div
        className={classNames({
          'gradient-text1': !isSelected,
          'text-[#3D3228]': isSelected,
        })}
      >
        {text}
      </div>
    </div>
  );
}
