import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/productSlice';
import authReducer from './slices/authSlice';

const rootReducer = {
    product: productReducer,
    auth: authReducer,
};

export const store = configureStore({
    reducer: rootReducer,
});
