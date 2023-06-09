import { Navigate, Route, Routes } from 'react-router-dom';
import React from 'react';
import Home from './pages/Home';
import Welcome from './pages/SignIn/Welcome';
import SignIn from './pages/SignIn/SignIn';
import GAGuide from './pages/SignIn/GAGuide';
import GAScanBind from './pages/SignIn/GAScanBind';
import GABackupKey from './pages/SignIn/GABackupKey';
import GABindVerify from './pages/SignIn/GABindVerify';
import GAVerify from './pages/SignIn/GAVerify';
import MyTrust from './pages/MyTrust';
import Security from './pages/Security';
import ChangeMobile from './pages/Security/ChangeMobile';
import ChangeEmail from './pages/Security/ChangeEmail';
import SCGAVerify from './pages/Security/SCGAVerify';
import GAUnbind from './pages/Security/GAUnbind';
import GAChangeScan from './pages/Security/GAChangeScan';
import GAChangeBankup from './pages/Security/GAChangeBankup';
import GAChangeVerify from './pages/Security/GAChangeVerify';
import UnbindEmailMobile from './pages/Security/UnbindEmailMobile';
import LoginLog from './pages/Security/LoginLog';
import PersonalRealName from './pages/SignIn/PersonalRealName';
import KycVerify from './pages/FirstGuide/KycVerify';
import FirstGuideWelcome from './pages/FirstGuide/FirstGuideWelcome';
import Status from './views/Status';
import ContactCustomer from './views/ContactCustomer';
import useAuthToken from './hooks/useUserId';
import Trust from './pages/Trust';
import Dashboard from './pages/Trust/Dashboard';
import AssetTransfet from './pages/Trust/AssetTransfet';
import InvestmentOrder from './pages/Trust/InvestmentOrder';
import OrderDetail from './pages/Trust/InvestmentOrder/OrderDetail';
import Distribution from './pages/Trust/Distribution';
import Elements from './pages/Trust/Elements';
import BillAndResources from './pages/Trust/BillAndResources';
import Ledger from './pages/Trust/BillAndResources/Ledger';
import Fees from './pages/Trust/BillAndResources/Fees';
import LegalText from './pages/Trust/BillAndResources/LegalText';
import Report from './pages/Trust/BillAndResources/Report';
import ManagerFee from './pages/Trust/BillAndResources/ManagerFee';
import ExcessFee from './pages/Trust/BillAndResources/ExcessFee';
import EstablishmentFee from './pages/Trust/BillAndResources/EstablishmentFee';
import Notification from './pages/Trust/Dashboard/Notification';

export default function AppRoutes() {
  const token = useAuthToken();

  return (
    <Routes>
      {/*  navbar */}
      <Route path="/" element={<Home />}>
        {/* 登录 + Google 绑定 + 绑定用户信息 */}
        <Route index element={<Welcome />} />
        <Route path="welcome" element={<Welcome />} />
        {/* 登录后不需要显示这些页面 */}
        {!token && (
          <>
            <Route path="signIn" element={<SignIn />} />
            <Route path="gaGuide" element={<GAGuide />} />
            <Route path="gaBind" element={<GAScanBind />} />
            <Route path="gaBackup" element={<GABackupKey />} />
            <Route path="gaBindVerify" element={<GABindVerify />} />
            <Route path="gaVerify" element={<GAVerify />} />
          </>
        )}

        {token && (
          <>
            {/* 我的信托列表 */}
            <Route path="/my" element={<MyTrust />} />
            {/* 个人中心 */}
            <Route path="/personal">
              <Route index element={<Security />} />
              <Route path="changeMobile" element={<ChangeMobile />} />
              <Route path="changeEmail" element={<ChangeEmail />} />
              <Route path="verify" element={<SCGAVerify />} />
              <Route path="gaUnbind" element={<GAUnbind />} />
              <Route path="gaChangeScan" element={<GAChangeScan />} />
              <Route path="gaChangeBankup" element={<GAChangeBankup />} />
              <Route path="gaChangeVerify" element={<GAChangeVerify />} />
              <Route path="unbindEmailOrMobile" element={<UnbindEmailMobile />} />
            </Route>
            <Route path="loginLog" element={<LoginLog />} />
            <Route path="personalRealName" element={<PersonalRealName />} />
            {/* First create trust */}
            <Route path="/first/:trustId/KycVerify" element={<KycVerify />} />
            <Route path="/first/:trustId/welcome" element={<FirstGuideWelcome />} />
          </>
        )}

        {/* Universal */}
        <Route path="/status" element={<Status />} />
        <Route path="/contactCustomer" element={<ContactCustomer />} />
        <Route path="/contactCustomer/:trustId" element={<ContactCustomer />} />

        {/* 404 */}
        <Route path="*" element={<Navigate to="/welcome" replace />} />
      </Route>

      {token && (
        <>
          {/* 合约详情 */}
          <Route path="/trust/:trustId" element={<Trust />}>
            {/* 仪表盘 */}
            {/* <Route  element={<Dashboard />} /> */}
            <Route index path="dashboard" element={<Dashboard />} />
            {/* 资产 */}
            <Route path="assets" element={<AssetTransfet />} />
            {/* 订单 */}
            <Route path="orders">
              <Route path="" element={<InvestmentOrder />} />
              <Route path="detail/:investmentId" element={<OrderDetail />} />
            </Route>
            {/* 计划 */}
            <Route path="distribution" element={<Distribution />} />
            <Route path="elements" element={<Elements />} />
            {/* 账单与资源 */}
            <Route path="billAndResources" element={<BillAndResources />}>
              <Route index element={<Ledger />} />
              <Route path="fees" element={<Fees />} />
              <Route path="legalText" element={<LegalText />} />
              <Route path="report" element={<Report />} />
            </Route>
            <Route path="managerFee" element={<ManagerFee />} />
            <Route path="excessFee" element={<ExcessFee />} />
            <Route path="establishmentFee" element={<EstablishmentFee />} />
            {/* 通知 */}
            <Route path="notification" element={<Notification />} />
          </Route>
        </>
      )}
    </Routes>
  );
}
