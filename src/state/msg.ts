import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IStationMessage } from '../interfaces/message';

interface IState {
  msgList: IStationMessage[]
}

const initialState: IState = {
  msgList: [],
};

const msgSlice = createSlice({
  name: 'msg',
  initialState,
  reducers: {
    appendMessage(state, action: PayloadAction<IStationMessage>) {
      state.msgList.push(action.payload);
    },
  },
});

export default msgSlice;
export const { appendMessage } = msgSlice.actions;
