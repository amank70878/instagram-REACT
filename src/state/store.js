import { configureStore } from "@reduxjs/toolkit";
import { customReducer } from "./reducer";

const store = configureStore({
  reducer: {
    instaReducer: customReducer,
  },
});

export default store;
