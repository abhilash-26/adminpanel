import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/login";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;
