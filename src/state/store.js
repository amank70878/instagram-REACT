import { configureStore } from "@reduxjs/toolkit";
import { customReducer } from "./reducer";

const store = configureStore({
  reducer: {
    linkedinReducer: customReducer,
  },
});

export default store;
