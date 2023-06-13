import React, { useEffect } from 'react';
import {
  Outlet, redirect, useLocation, useNavigate, useParams,
} from 'react-router-dom';
import Sidebar from './Sidebar';
import CopyIcon from '../../views/CopyIcon';
import SendButton from '../../views/SendButton';
import { useTrustDetailQuery } from '../../api/trust/trust';
import { useExpenseRatioQuery } from '../../api/trust/fee';

export default function Trust() {
  useExpenseRatioQuery();
  const location = useLocation();
  const navigate = useNavigate();
  const { trustId } = useParams();
  const trustQuery = useTrustDetailQuery({
    trustId: Number(trustId),
  });

  useEffect(() => {
    if (location.pathname === `/trust/${trustId}` && trustId) {
      navigate(`/trust/${trustId}/dashboard`, {
        replace: true,
      });
    }
  }, [trustId, location.pathname]);

  useEffect(() => {
    if (trustQuery.error?.code === 4011) {
      navigate('/my');
    }
  }, [trustQuery.error]);

  return (
    <div className="flex flex-row pl-6 h-screen">
      {/* <SendButton /> */}
      <div className="w-[318px] flex-shrink-0 py-6"><Sidebar /></div>
      <div className="flex-auto overflow-y-auto px-6 py-6"><Outlet /></div>
    </div>
  );
}
