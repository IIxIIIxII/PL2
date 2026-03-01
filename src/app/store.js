import { configureStore } from '@reduxjs/toolkit';
import uiReducer from '../features/ui/uiSlice';
import poniesReducer from '../features/ponies/poniesSlice';
import counterReducer from "../features/counter/counterSlice";

export const store = configureStore({
    reducer: {
        ui: uiReducer,
        ponies: poniesReducer,
        counter: counterReducer
    }
});
