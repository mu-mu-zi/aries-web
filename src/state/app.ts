import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Language } from '../interfaces/language';

interface IState {
  language?: Language | null;
}

const initialState: IState = {
  language: localStorage.getItem('LANGUAGE') === 'en' ? Language.EN : Language.HK,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLanguage(state, action: PayloadAction<Language>) {
      state.language = action.payload;
      localStorage.setItem('LANGUAGE', action.payload);
    },
  },
});

export default appSlice;
export const { setLanguage } = appSlice.actions;
