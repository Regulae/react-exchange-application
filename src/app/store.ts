import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';

import exchangeRateReducer from '../features/exchangeRates/exchangeRateSlice';

export const store = configureStore({
    reducer: {
        exchangeRates: exchangeRateReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    RootState,
    unknown,
    Action<string>>;
