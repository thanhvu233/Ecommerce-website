import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import productApi from '../../API/productApi';

export const fetchProductList = createAsyncThunk('product/getAll', async (filter) => {
    try {
        const res = await productApi.getAll(filter);

        return res;
    } catch (error) {
        console.log(error);
    }
});

const initialState = {
    loading: false,
    list: [],
    filter: {
        _page: 1,
        _limit: 56,
        category: undefined,
        type_like: undefined,
        type: undefined,
    },
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setFilter(state, action) {
            state.filter = action.payload;
        },
    },
    extraReducers: {
        [fetchProductList.pending]: (state, action) => {
            state.loading = true;
        },
        [fetchProductList.fulfilled]: (state, action) => {
            state.loading = false;
            state.list = action.payload;
        },
        [fetchProductList.rejected]: (state, action) => {
            state.loading = false;
        },
    },
});

export const { setFilter } = productSlice.actions;

export const selectProductList = (state) => state.product.list;
export const selectProductLoading = (state) => state.product.loading;
export const selectProductFilter = (state) => state.product.filter;

export default productSlice.reducer;
