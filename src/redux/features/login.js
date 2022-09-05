import { createSlice } from "@reduxjs/toolkit";
const initialState = localStorage.getItem("isLoggedIn");

const userSlice = createSlice({
  name: "user",
  initialState: {
    value: {
      isLoggedIn: initialState,
    },
  },
  reducers: {
    login: (state, action) => {
      state.value.isLoggedIn = 1;
    },
    logout: (state, action) => {
      state.value.isLoggedIn = 0;
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;