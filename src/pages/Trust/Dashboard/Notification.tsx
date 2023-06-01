import React, { useState } from 'react';
import moment from 'moment/moment';
import { useParams } from 'react-router-dom';
import CancelNav from '../../../views/CancelNav';
import { useTrustMessageListQuery } from '../../../api/trust/trust';
import NotificationCell from './NotificationCell';
import Paginate from '../../../components/Paginate';
import Hr from '../../../components/Hr';
import { unixFormatTime } from '../../../utils/DateFormat';

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
      <div className="mt-10 gradient-bg2 rounded-xl shadow-block p-8 block-gradient-border">
        <div className="gradient-text1 font-title font-bold text-[20px] mb-6">Notification</div>
        <Hr />
        <div className="py-6 flex flex-col">
          <div className="flex flex-col gap-6 h-full overflow-y-auto">
            {listQuery.data?.data?.records.map((it) => (
              <NotificationCell
                title={it.title}
                content={it.content}
                datetime={unixFormatTime(it.createTime)}
              />
            ))}
          </div>
          <div className="mt-8 mx-auto">
            <Paginate
              page={page}
              total={listQuery.data?.data?.total ?? 0}
              pageSize={5}
              onPageChanged={(page) => setPage(page)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
