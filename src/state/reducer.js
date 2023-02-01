import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  modalValue: false,
  drawer: false,
  pageLoader: "none",
};

export const customReducer = createReducer(initialState, {
  setUser: (state, action) => {
    state.users = action.payload;
  },
  setModalValue: (state, action) => {
    state.modalValue = action.payload;
  },
  setDrawer: (state, action) => {
    state.drawer = action.payload;
  },
  setPageLoader: (state, action) => {
    state.pageLoader = action.payload;
  },
});
