import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import orderApi from './../../API/orderApi';

export const fetchOrderList = createAsyncThunk(
  'order/getAllOrders',
  async (filter) => {
    try {
      const res = await orderApi.getAll(filter);

      return res;
    } catch (error) {
      console.log('Cant get orders');
    }
  }
);

const initialState = {
  isProgressed: false,
  list: [],
  filter: {
    _page: 1,
    _limit: 5,
  },
  totalRow: 0,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setFilter(state, action) {
      state.filter = action.payload;
    },
  },
  extraReducers: {
    [fetchOrderList.pending]: (state) => {
      state.isProgressed = true;
    },

    [fetchOrderList.fulfilled]: (state, action) => {
      state.list = action.payload.data;
      state.totalRow = action.payload.totalRow;
      state.isProgressed = false;
    },

    [fetchOrderList.rejected]: (state) => {
      state.isProgressed = false;
    },
  },
});

export const { setFilter } = orderSlice.actions;

export const selectOrderProgressed = (state) => state.order.isProgressed;
export const selectOrderList = (state) => state.order.list;
export const selectOrderFilter = (state) => state.order.filter;
export const selectOrderTotalRow = (state) => state.order.totalRow;
export const selectOrderCart = createSelector(selectOrderList, async (list) => {
  let productList = list[0].products;

  productList = productList.map((product, idx) => {
    return {
      key: idx + 1,
      id: product.productId,
      size: product.size,
      quantity: product.amount,
    };
  });
});

export default orderSlice.reducer;
