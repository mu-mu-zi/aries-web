import React, { useEffect } from 'react';
import {
  Outlet, redirect, useLocation, useNavigate, useParams,
} from 'react-router-dom';
import Sidebar from './Sidebar';
import CopyIcon from '../../views/CopyIcon';
import SendButton from '../../views/SendButton';
import { useTrustDetailQuery } from '../../api/trust/trust';

export default function Trust() {
  const location = useLocation();
  const navigate = useNavigate();
  const { trustId } = useParams();
  const trustQuery = useTrustDetailQuery({
    trustId: Number(trustId),
  });

  useEffect(() => {
    if (location.pathname === `/trust/${trustId}`) {
      navigate(`/trust/${trustId}/dashboard`);
    }
  }, [trustId, location.pathname]);

  useEffect(() => {
    if (trustQuery.error?.code === 4011) {
      navigate('/my');
    }
  }, [trustQuery.error]);

  return (
    <div className="flex flex-row h-full py-6 pl-6 gap-6 h-screen">
      {/* <SendButton /> */}
      <div className="w-[318px] flex-shrink-0"><Sidebar /></div>
      <div className="flex-auto overflow-y-auto pr-6"><Outlet /></div>
    </div>
  );
}
