import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Language } from '../interfaces/language';

interface IState {
  assetTransfer: {
    selectedCoinId?: number;
    selectedFiatId?: number;
    selectedFiatBankId?: number;
  }
}

const initialState: IState = {
  assetTransfer: {
    selectedFiatBankId: 0,
  },
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
    setAssetTransferselectedFiatBankId(state, action: PayloadAction<number | undefined>) {
      state.assetTransfer.selectedFiatBankId = action.payload;
    },
  },
});

export default trustSlice;
export const {
  setAssetTransferSelectedCoinId,
  setAssetTransferSelectedFiatId,
  setAssetTransferselectedFiatBankId,
} = trustSlice.actions;
