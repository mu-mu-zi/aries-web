import React from 'react';
import Hr from '../../components/Hr';
import arrowR from '../../assets/icon/arrow_r.svg';
import LargeAvatar from '../../components/LargeAvatar';
import editIcon from '../../assets/icon/edit.svg';
import starNorIcon from '../../assets/icon/star_nor.svg';
import starSelIcon from '../../assets/icon/star_sel.svg';
import statusOkIcon from '../../assets/icon/status_ok.svg';
import statusWarningIcon from '../../assets/icon/statusWarning.svg';
import Modal from '../../components/Modal';
import EditPersonal from './EditPersonal';
import Container from '../../views/Container';

export default function Security() {
  const [editVisible, setEditVisible] = React.useState(false);

  return (
    <>
      <Container>
        <div className="flex flex-col gap-6 max-w-[1200px] w-full">
          {/* header */}
          <div className="gradient-bg2 flex flex-col gap-4 rounded-xl p-8 pb-4">
            <div className="flex flex-col items-center gap-8">
              <LargeAvatar isMale={false} />
              <div className="flex flex-row items-center gap-4">
                <div className="gradient-text1 font-bold font-title text-[40px]">Dear Mr.Lin</div>
                <div className="cursor-pointer" onClick={() => setEditVisible(true)}>
                  <img src={editIcon} width="32px" alt="Edit" />
                </div>
              </div>
              <div className="text-[#99AC9B] text-[16px]">User ID: 123123132</div>
            </div>
            <Hr />
            <div className="flex flex-row justify-between gap-8 cursor-pointer">
              <div className="flex flex-col gap-2 text-[#99AC9B] text-[16px]">
                <div className="font-bold text-[20px]">Login Log</div>
                <div className="text-[16px]">Last Login: 2023-12-12 12:12:12</div>
              </div>
              <img width="32px" src={arrowR} alt="" />
            </div>
          </div>
          {/* V */}
          <div className="flex flex-col rounded-xl gradient-bg2">
            {/* star */}
            <div className="flex flex-row justify-between items-center gradient-border1 p-8 rounded-t-xl">
              <div className="flex flex-col gap-2">
                <div className="font-title font-bold text-[20px]">Dual Verification(2FA)</div>
                <div className="text-[16px] text-[#695D52]">Current account security level: Low</div>
              </div>
              <div className="flex flex-row items-center gap-2">
                <div><img src={starNorIcon} width="20px" /></div>
                <div><img src={starNorIcon} width="20px" /></div>
                <div><img src={starNorIcon} width="20px" /></div>
              </div>
            </div>
            <div className="p-8 flex flex-col gap-4">
              {/* Email */}
              <div className="flex flex-row justify-between">
                <div className="flex flex-col gap-2">
                  <div className="text-[#99AC9B] text-[20px] font-bold">Email verification</div>
                  <div className="flex flex-row gap-2 items-center">
                    <img src={statusOkIcon} alt="" />
                    <div className="text-[#99AC9B] text-[16px]">hello@123.com</div>
                  </div>
                </div>
                <div className="flex flex-row items-center gap-4 font-title text-[14px]">
                  <div className="gradient-text2 cursor-pointer">Change</div>
                  <div className="gradient-text2 cursor-pointer">Unbinding</div>
                </div>
              </div>
              <Hr />
              {/* Mobile */}
              <div className="flex flex-row justify-between">
                <div className="flex flex-col gap-2">
                  <div className="text-[#99AC9B] text-[20px] font-bold">Mobile Phone verification</div>
                  <div className="flex flex-row gap-2 items-center">
                    <img src={statusWarningIcon} alt="" />
                    <div className="text-[#99AC9B] text-[16px]">hello@123.com</div>
                  </div>
                </div>
                <div className="flex flex-row items-center gap-4 font-title text-[14px]">
                  <div className="gradient-text2 cursor-pointer">Change</div>
                  <div className="gradient-text2 cursor-pointer">Unbinding</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Modal visible={editVisible} onClose={() => setEditVisible(false)}>
        <EditPersonal />

      </Modal>
    </>
  );
}
