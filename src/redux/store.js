import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./todosSlice";

const store = configureStore({
  reducer: {
    posts: postReducer,
  },
});

export default store;
