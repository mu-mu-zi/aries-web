import React from 'react';
import Axios from './Axios';
import User from './User';
import StationMessage from './StationMessage';

export default function Updater() {
  return (
    <>
      <Axios />
      <User />
      <StationMessage />
    </>
  );
}
