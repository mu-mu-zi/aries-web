import React, { useState } from 'react';
import moment from 'moment/moment';
import CancelNav from '../../../views/CancelNav';
import { useTrustMessageListQuery } from '../../../api/trust/trust';
import NotificationCell from './NotificationCell';

export default function Notification() {
  const [page, setPage] = useState(1);
  /* todo: 固定 ID */
  const listQuery = useTrustMessageListQuery({
    trustId: 15,
    pageIndex: page,
    pageSize: 20,
  });

  return (
    <div className="flex flex-col">
      <CancelNav />
      <div className="flex flex-col gap-6">
        {listQuery.data?.data?.records.map((it) => (
          <NotificationCell
            title={it.title}
            content={it.content}
            datetime={moment.unix(it.createTime / 1000).format('YYYY-MM-DD HH:mm:ss')}
          />
        ))}
      </div>
    </div>
  );
}
