import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/productSlice';
import orderedItemReducer from './slices/orderedItemSlice';

const rootReducer = {
  product: productReducer,
  orderedItem: orderedItemReducer,
};

export const store = configureStore({
  reducer: rootReducer,
});
