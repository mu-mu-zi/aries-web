import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IStationMessage } from '../interfaces/message';
import msgSlice from './msg';

interface IState {
  token?: string | null;
}

const initialState: IState = {
  token: localStorage.getItem('TOKEN'),
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      localStorage.setItem('TOKEN', action.payload);
      state.token = action.payload;
    },
    deleteToken: (state) => {
      localStorage.removeItem('TOKEN');
      state.token = undefined;
    },
  },
});

export default userSlice;
export const { setToken, deleteToken } = userSlice.actions;
