import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi from './../../API/userApi';

export const login = createAsyncThunk('auth/login', async (account) => {
  try {
    const res = userApi.login(account);

    return res;
  } catch (error) {
    console.log('Can@apos;t get account');
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
    [login.pending]: (state) => {
      state.isLogined = false;
      state.isLogging = true;
    },
    [login.fulfilled]: (state, action) => {
      state.isLogined = true;
      state.isLogging = false;
      state.currentUser = action.payload.data;
    },
    [login.rejected]: (state) => {
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
