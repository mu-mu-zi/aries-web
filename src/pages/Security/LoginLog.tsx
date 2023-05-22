import React, { useState } from 'react';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import Container from '../../views/Container';
import CancelNav from '../../views/CancelNav';
import Hr from '../../components/Hr';
import { useLoginLogQuery } from '../../api/user/user';
import SimpleTable from '../../views/SimpleTable';

export default function LoginLog() {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const listQuery = useLoginLogQuery({
    pageIndex: page,
    pageSize: 10,
  });

  return (
    <Container>
      <div className="flex flex-col gap-6">
        <CancelNav />
        <div className="flex flex-col gap-4 gradient-bg2 rounded-xl p-8">
          <div className="gradient-text1 font-title font-bold text-[20px]">{t('Recent Login Records')}</div>
          <Hr />
          <SimpleTable
            columns={[
              {
                Header: t('Login Time') ?? '',
                accessor: (x) => moment.unix(x.createTimeStamp / 1000).format('MM/DD/YYYY HH:mm:ss'),
              },
              {
                Header: t('Login device') ?? '',
                accessor: (x) => x.deviceName,
              },
              {
                Header: t('Login status') ?? '',
                accessor: (x) => (x.status ? 'Login successfully' : 'Login failure'),
              },
              {
                Header: t('Login address') ?? '',
                accessor: (x) => x.ipAddr,
              },
            ]}
            data={listQuery.data?.data?.records}
            pagination={{
              pageIndex: page,
              pageSize: 10,
              total: listQuery.data?.data?.total ?? 0,
              onPageChanged: (page) => setPage(page),
            }}
          />
        </div>
      </div>
    </Container>
  );
}
