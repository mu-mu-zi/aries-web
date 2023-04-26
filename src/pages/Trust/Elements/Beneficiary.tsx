import React, { useState } from 'react';
import Button from '../../../components/Button';
import Hr from '../../../components/Hr';
import BlockRow from './BlockRow';
import Modal from '../../../components/Modal';
import AddBeneficiary from './AddBeneficiary';

export default function Beneficiary() {
  const [addBeneficiaryVisible, setAddBeneficiaryVisible] = useState(false);

  return (
    <div className="flex flex-col gap-4 rounded-xl shadow-block p-8 gradient-bg2">
      <div className="flex flex-row items-center justify-between">
        <div className="gradient-text1 font-title text-[20px]">Beneficiary</div>
        <Button onClick={() => setAddBeneficiaryVisible(true)}>Add</Button>
      </div>
      <Hr />
      <div className="flex flex-col gap-4 gradient-block1 shadow-block rounded-xl p-8">
        <BlockRow title="Real name:" value="Lee ***" />
        <BlockRow title="Account:" value="314****342" />
        <BlockRow title="Identity category:" value="The principal himself/herself" />
        <BlockRow title="Permissions:" value=" No Permissions" />
        <BlockRow title="KYC certification:" value="Not verified" />
        <BlockRow title="Description:" value="My unborn..." />
        <BlockRow title="Audit status:" value="Approved" />
        <BlockRow title="Add time:" value="03/30/2023" />
        <div className="self-center mt-8">
          <Button>Remove</Button>
        </div>
      </div>
      <Modal visible={addBeneficiaryVisible}>
        <AddBeneficiary />
      </Modal>
    </div>
  );
}
