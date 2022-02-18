import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi from './../../API/userApi';

export const fetchUserByAcc = createAsyncThunk('auth/getByAcc', async (account) => {
    try {
        const data = userApi.getByAccount(account);

        return data;
    } catch (error) {
        console.log(error);
    }
});

const initialState = {
    isLogined: false,
    isLogging: false,
    currentUser: undefined,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser(state, action) {
            state.currentUser = action.payload;
        },
        logout(state) {
            state.isLogined = false;
            state.isLogging = false;
            state.currentUser = undefined;
        },
    },
    extraReducers: {
        [fetchUserByAcc.pending]: (state) => {
            state.isLogined = false;
            state.isLogging = true;
        },
        [fetchUserByAcc.fulfilled]: (state, action) => {
            state.isLogined = true;
            state.isLogging = false;
            state.currentUser = action.payload;
        },
        [fetchUserByAcc.rejected]: (state) => {
            state.isLogined = false;
            state.isLogging = false;
        },
    },
});

export const { setUser, logout } = authSlice.actions;

export const selectIsLogined = (state) => state.auth.isLogined;
export const selectIsLogging = (state) => state.auth.isLogging;
export const selectCurrentUser = (state) => state.auth.currentUser;

export default authSlice.reducer;