import React from 'react';
import ModalContainer from '../../views/ModalContainer';
import ModalNav from '../../views/ModalContainer/ModalNav';
import TextInput from '../../components/TextInput';
import Select from '../../components/Select';

export default function EditPersonal() {
  return (
    <ModalContainer>
      <ModalNav title="Edit personal information" />
      <div className="flex flex-col ">
        <label>
          <div>Name</div>
          <TextInput />
        </label>
        <label>
          <div>Gender</div>
          <Select />
        </label>
      </div>
    </ModalContainer>
  );
}
