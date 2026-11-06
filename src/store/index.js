import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice";
import authReducer from "./authSlice";
import studentsReducer from "./studentsSlice";

const store = configureStore({
  reducer: {
    theme: themeReducer,
    auth: authReducer,
    students: studentsReducer,
  },
});

export default store;
