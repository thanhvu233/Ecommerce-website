import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    list: [],
    totalRow: 0,
};

const orderedItemSlice = createSlice({
    name: 'orderedItem',
    initialState,
    reducers: {
        setTotalUnpaidItems(state, action) {
            state.totalRow = action.payload;
        },
        setUnpaidItems(state, action) {
            state.list = action.payload;
        }
    },
});

export const { setTotalUnpaidItems, setUnpaidItems } = orderedItemSlice.actions;

export const selectUnpaidItemList = (state) => state.orderedItem.list;
export const selectTotalUnpaidItem = (state) => state.orderedItem.totalRow;

export default orderedItemSlice.reducer;
