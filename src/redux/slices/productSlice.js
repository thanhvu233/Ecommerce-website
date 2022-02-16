import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    list: [],
    filter: {
        _page: 1,
        _limit: 16,
    },
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        fetchProductList(state, action) {},
        fetchProductListSuccess(state, action) {},
        fetchProductListFailed(state, action) {},
        setFilter(state, action) {},
    },
});

export const {
    fetchProductList,
    fetchProductListSuccess,
    fetchProductListFailed,
    fetchProductListFailed,
} = productSlice.actions;

export const selectProductList = (state) => state.product.list;
export const selectProductList = (state) => state.product.list;
export const selectProductList = (state) => state.product.list;
export const selectProductList = (state) => state.product.list;

export default productSlice.reducer;
