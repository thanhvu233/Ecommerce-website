import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/productSlice';
import authReducer from './slices/authSlice';
import orderedItemReducer from './slices/orderedItemSlice';

const rootReducer = {
  product: productReducer,
  auth: authReducer,
  orderedItem: orderedItemReducer,
};

export const store = configureStore({
  reducer: rootReducer,
});
