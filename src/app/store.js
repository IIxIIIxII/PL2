import { configureStore } from '@reduxjs/toolkit';
import uiReducer from '../features/ui/uiSlice';
import poniesReducer from '../features/ponies/poniesSlice';

export const store = configureStore({
    reducer: {
        ui: uiReducer,
        ponies: poniesReducer
    }
});
