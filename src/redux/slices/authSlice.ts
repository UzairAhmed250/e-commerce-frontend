import {createSlice} from '@reduxjs/toolkit';

const persistedAuth = JSON.parse(localStorage.getItem('auth') || 'null');

const initialState = {
  isAuthenticated: !!persistedAuth?.token,
  user: persistedAuth?.user || null,
  token: persistedAuth?.token || null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.token = null;
        }
    }
})

export const { loginSuccess, logout} = authSlice.actions;

export default authSlice.reducer;