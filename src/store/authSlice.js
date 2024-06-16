import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem('token') || '',
  isLoggedIn: !!localStorage.getItem('token'),
  userEmail: localStorage.getItem('userEmail') || '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.token = action.payload.token;
      state.isLoggedIn = true;
      state.userEmail = action.payload.email;
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('userEmail', action.payload.email);
    },
    logout(state) {
      state.token = '';
      state.isLoggedIn = false;
      state.userEmail = '';
      localStorage.removeItem('token');
      localStorage.removeItem('userEmail');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
