import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  modalValue: false,
  pageLoader: "none",
  userModal: false,
};

export const customReducer = createReducer(initialState, {
  setUser: (state, action) => {
    state.users = action.payload;
  },
  setModalValue: (state, action) => {
    state.modalValue = action.payload;
  },
  setPageLoader: (state, action) => {
    state.pageLoader = action.payload;
  },
  setUserModal: (state, action) => {
    state.userModal = action.payload;
  },
});
