import React, { useEffect, useState } from 'react';
import { useInterval } from 'react-use';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';

export default function SendButton({
  onClick,
}: {
  onClick?(): Promise<boolean> | boolean
}) {
  const [duration, setDuration] = useState(0);
  const [sendCount, setSendCount] = useState(0);
  // const { t } = useTranslation();

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
      className={classNames(
        'font-bold gradient-text1 text-[20px] px-2 break-keep select-none',
        duration > 0 ? 'cursor-not-allowed' : 'cursor-pointer',
      )}
      onClick={async () => {
        if (duration > 0) {
          return;
        }
        try {
          if (await onClick?.()) {
            setDuration(60);
          }
        } catch (e) {
          console.log(e);
        }
      }}
    >
      {/* {sendCount} */}
      {/* eslint-disable-next-line no-nested-ternary */}
      {duration <= 0 ? (sendCount > 1 ? <FormattedMessage defaultMessage="Resend" /> : <FormattedMessage defaultMessage="Send" />) : `${duration}S`}
    </div>
  );
}
