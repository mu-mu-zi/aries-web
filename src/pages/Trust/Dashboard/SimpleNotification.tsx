import React, { useState } from 'react';
import classNames from 'classnames';
import moment from 'moment';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import cellIcon from '../../../assets/icon/money_small_icon.svg';
import moreIcon from '../../../assets/icon/arrow_r.svg';
import { useTrustMessageListQuery } from '../../../api/trust/trust';
import NotificationCell from './NotificationCell';

export default function SimpleNotification() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { trustId } = useParams();
  const listQuery = useTrustMessageListQuery({
    trustId: Number(trustId),
    pageIndex: 1,
    pageSize: 2,
  });

  return (
    <div className={classNames('flex flex-col', 'p-8', 'rounded-xl', 'gradient-bg2', 'shadow-[-4px_8px_10px_0_#030c08]')}>
      <div className={classNames('item-center flex flex-row justify-between')}>
        <div className="gradient-text1 font-blod text-[20px] font-title">{t('Notification')}</div>
        <div
          className="flex flex-row items-center gap-2 cursor-pointer"
          onClick={() => navigate(`/trust/${trustId}/notification`)}
        >
          <div
            className="gradient-text1 font-blod text-[16px]"
          >
            {t('More')}
          </div>
          <img src={moreIcon} width="24px" alt="" />
        </div>
      </div>
      <div className="my-6 h-[1px] bg-[#3B5649]" />
      <div className="flex flex-col gap-6">
        {listQuery.data?.data?.records.map((it) => (
          <NotificationCell
            simple
            title={it.title}
            content={it.content}
            datetime={moment.unix(it.createTime / 1000).format('YYYY-MM-DD HH:mm:ss')}
          />
        ))}
      </div>
    </div>
  );
}
