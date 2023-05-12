import React from 'react';
import Axios from './Axios';
import User from './User';
import { useUserInfoQuery } from '../api/user/user';

export default function Updater() {
  return (
    <>
      <Axios />
      <User />
    </>
  );
}
