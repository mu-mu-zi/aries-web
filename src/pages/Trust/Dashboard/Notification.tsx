import React, { useState } from 'react';
import moment from 'moment/moment';
import { useParams } from 'react-router-dom';
import CancelNav from '../../../views/CancelNav';
import { useTrustMessageListQuery } from '../../../api/trust/trust';
import NotificationCell from './NotificationCell';
import Paginate from '../../../components/Paginate';

export default function Notification() {
  const { trustId } = useParams();
  const [page, setPage] = useState(1);
  const listQuery = useTrustMessageListQuery({
    trustId: Number(trustId),
    pageIndex: page,
    pageSize: 5,
  });

  return (
    <div className="flex flex-col">
      <CancelNav />
      <div className="flex flex-col gap-6 h-full overflow-y-auto">
        {listQuery.data?.data?.records.map((it) => (
          <NotificationCell
            title={it.title}
            content={it.content}
            datetime={moment.unix(it.createTime / 1000).format('YYYY-MM-DD HH:mm:ss')}
          />
        ))}
      </div>
      <div className="mt-4 mx-auto">
        <Paginate
          page={page}
          total={listQuery.data?.data?.total ?? 0}
          pageSize={5}
          onPageChanged={(page) => setPage(page)}
        />
      </div>
    </div>
  );
}
