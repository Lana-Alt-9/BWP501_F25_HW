import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: false,
    isSessionLoading: true,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isSessionLoading = false;
    },
    setSession: (state, action) => {
      if (!state.isSessionLoading) {
        return;
      }
      state.user = action.payload;
      state.isAuthenticated = Boolean(action.payload);
      state.isSessionLoading = false;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isSessionLoading = false;
    },
  },
});
export const { login, setSession, logout } = authSlice.actions;
export default authSlice.reducer;
