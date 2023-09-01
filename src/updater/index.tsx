import React from 'react';
import Axios from './Axios';
import User from './User';
import StationMessage from './StationMessage';
// import useGetDate from '../hooks/useGetDate';

export default function Updater() {
  // const a = useGetDate();
  // console.log(a);
  return (
    <>
      <Axios />
      <User />
      <StationMessage />
    </>
  );
}
