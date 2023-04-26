import React from 'react';
import ModalContainer from '../../views/ModalContainer';
import ModalNav from '../../views/ModalContainer/ModalNav';
import TextInput from '../../components/TextInput';

export default function EditPersonal() {
  return (
    <ModalContainer>
      <ModalNav title="Edit personal information" />
      <div className="flex flex-col ">
        <label className="">Gender</label>
      </div>
    </ModalContainer>
  );
}
