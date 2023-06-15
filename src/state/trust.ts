import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Language } from '../interfaces/language';

interface IState {
  assetTransfer: {
    selectedCoinId?: number;
    selectedFiatId?: number;
  }
}

const initialState: IState = {
  assetTransfer: {},
};

const trustSlice = createSlice({
  name: 'trust',
  initialState,
  reducers: {
    setAssetTransferSelectedCoinId(state, action: PayloadAction<number | undefined>) {
      state.assetTransfer.selectedCoinId = action.payload;
    },
    setAssetTransferSelectedFiatId(state, action: PayloadAction<number | undefined>) {
      state.assetTransfer.selectedFiatId = action.payload;
    },
  },
});

export default trustSlice;
export const {
  setAssetTransferSelectedCoinId,
  setAssetTransferSelectedFiatId,
} = trustSlice.actions;
