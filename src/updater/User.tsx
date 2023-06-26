import { useEffect, useState } from 'react';
import { useIdle, useInterval } from 'react-use';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { useUserInfoQuery } from '../api/user/user';
import { useMyTrustQuery } from '../api/trust/trust';
import { useAppDispatch } from '../state';
import { deleteToken } from '../state/user';
import { addSuccessNotification } from '../utils/Notification';
import useAuthToken from '../hooks/useUserId';
import Modal from '../components/Modal';
import TimeoutLogoutWarning from '../views/TimeoutLogoutWarning';

export default function User() {
  /* 30 分钟不操作自动退出登录 */
  const idle = useIdle(30 * 60 * 1000);
  const logoutMutation = useMutation({
    mutationFn: () => axios.delete('/auth/ariesToken/logout'),
  });
  const navigate = useNavigate();
  const action = useAppDispatch();
  const queryClient = useQueryClient();
  const token = useAuthToken();
  const [warningVisible, setWarningVisible] = useState(false);

  useEffect(() => {
    if (idle && token) {
      logoutMutation.mutate();
      action(deleteToken());
      navigate('/welcome', {
        replace: true,
      });
      queryClient.removeQueries();
      setWarningVisible(true);
    }
  }, [idle, token]);

  return (
    <Modal visible={warningVisible} onClose={() => setWarningVisible(false)}>
      <TimeoutLogoutWarning onOk={() => setWarningVisible(false)} />
    </Modal>
  );
}
