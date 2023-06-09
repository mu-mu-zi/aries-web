import React, { useState } from 'react';
import moment from 'moment';
import { FormattedMessage, useIntl } from 'react-intl';
import Container from '../../views/Container';
import CancelNav from '../../views/CancelNav';
import Hr from '../../components/Hr';
import { useLoginLogQuery } from '../../api/user/user';
import SimpleTable from '../../views/SimpleTable';
import { unixFormatTime } from '../../utils/DateFormat';

export default function LoginLog() {
  // const { t } = useTranslation();
  const intl = useIntl();
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
          <div className="gradient-text1 font-title font-bold text-[20px]">
            <FormattedMessage defaultMessage="Recent Login Records" />
          </div>
          <Hr />
          <SimpleTable
            columns={[
              {
                Header: intl.formatMessage({ defaultMessage: 'Login Time' }),
                accessor: (x) => unixFormatTime(x.createTimeStamp),
              },
              {
                Header: intl.formatMessage({ defaultMessage: 'Login device' }),
                accessor: (x) => x.deviceName,
              },
              {
                Header: intl.formatMessage({ defaultMessage: 'Login status' }),
                accessor: (x) => x.remark ?? '--',
              },
              {
                Header: intl.formatMessage({ defaultMessage: 'Login address' }),
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
