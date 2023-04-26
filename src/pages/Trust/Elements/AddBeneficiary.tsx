import React from 'react';
import closeIcon from '../../../assets/icon/model_close.svg';
import TextInput from '../../../components/TextInput';
import Dropdown from '../../../components/Dropdown';
import Button from '../../../components/Button';
import Divide from '../../../components/Divide';
import ContactUs from '../../SignIn/ContactUs';

export default function AddBeneficiary() {
  return (
    <div className="flex flex-col w-[720px] bg-[#1A342F] rounded-xl p-8">
      <div className="flex flex-row items-center justify-between">
        <div className="gradient-text1 font-blod text-[32px]">Add Beneficiary</div>
        <div className="cursor-pointer"><img src={closeIcon} /></div>
      </div>
      <div className="flex flex-col gap-4 mt-10">
        <div className="flex flex-col gap-4">
          <label className="text-[#C2D7C7F6] font-bold text-[16px]">Beneficiary</label>
          <Dropdown title="Define beneficiary" />
        </div>
        <div className="flex flex-col gap-4">
          <label className="text-[#C2D7C7F6] font-bold text-[16px]">Translation</label>
          <TextInput placeholder="Please provide additional instructions" />
        </div>
        <div className="flex flex-col gap-4">
          <label className="text-[#C2D7C7F6] font-bold text-[16px]">Real Name</label>
          <TextInput placeholder="Please provide additional instructions" />
        </div>
        <div className="flex flex-col gap-4">
          <label className="text-[#C2D7C7F6] font-bold text-[16px]">Gender</label>
          <Dropdown title="Define beneficiary" />
        </div>
        <div className="flex flex-col gap-4">
          <label className="text-[#C2D7C7F6] font-bold text-[16px]">Account Type</label>
          <Dropdown title="Define beneficiary" />
        </div>
        <div className="flex flex-col gap-4">
          <label className="text-[#C2D7C7F6] font-bold text-[16px]">Email</label>
          <TextInput placeholder="Please provide additional instructions" />
        </div>
        <div className="flex flex-col gap-4">
          <label className="text-[#C2D7C7F6] font-bold text-[16px]">Permissions</label>
          <Dropdown title="Define beneficiary" />
        </div>
        <div className="mt-4 self-center max-w-[420px] w-full">
          <Button block>Confirm</Button>
        </div>
        <div className="flex flex-col gap-5 mt-6">
          <Divide />
          <ContactUs />
        </div>
      </div>
    </div>
  );
}
