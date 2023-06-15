import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import userSlice from './user';
import appSlice from './app';
import msgSlice from './msg';
import trustSlice from './trust';

export const store = configureStore({
  reducer: combineReducers({
    user: userSlice.reducer,
    app: appSlice.reducer,
    msg: msgSlice.reducer,
    trust: trustSlice.reducer,
  }),
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

/* ts */
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
