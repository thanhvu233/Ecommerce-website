import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/productSlice';

const rootReducer = {
    product: productReducer,
};

export const store = configureStore({
    reducer: rootReducer,
});
