import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/productSlice';
import authReducer from './slices/authSlice';
import orderReducer from './slices/orderSlice';
import orderedItemReducer from './slices/orderedItemSlice';

const rootReducer = {
    product: productReducer,
    auth: authReducer,
    order: orderReducer,
    orderedItem: orderedItemReducer,
};

export const store = configureStore({
    reducer: rootReducer,
});
