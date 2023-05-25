import React, { useEffect, useState } from 'react';
import { useInterval } from 'react-use';
import { useTranslation } from 'react-i18next';

export default function SendButton({
  onClick,
}: {
  onClick?(): Promise<boolean> | boolean
}) {
  const [duration, setDuration] = useState(0);
  const [sendCount, setSendCount] = useState(0);
  const { t } = useTranslation();

  useInterval(() => {
    setDuration((d) => d - 1);
  }, 1000);

  useEffect(() => {
    if (duration === 0) {
      setSendCount((x) => x + 1);
    }
  }, [duration]);

  return (
    <div
      className="cursor-pointer font-bold gradient-text1 text-[20px] px-2"
      onClick={async () => {
        if (duration > 0) {
          return;
        }
        try {
          const flag = await onClick?.();
          if (flag) {
            setDuration(60);
          }
        } catch (e) {
          console.log(e);
        }
      }}
    >
      {/* {sendCount} */}
      {/* eslint-disable-next-line no-nested-ternary */}
      {duration <= 0 ? (sendCount > 1 ? t('Resend') : t('Send')) : `${duration}S`}
    </div>
  );
}
