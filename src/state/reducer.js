import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  users: null,
  modalValue: false,
  pageLoader: "none",
  userModal: false,
  swipeableDrawer: false,
  commentDrawerId: null,
  reloadRedux: true,
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
  setSwipeableDrawer: (state, action) => {
    state.swipeableDrawer = action.payload;
  },
  setCommentDrawerId: (state, action) => {
    state.commentDrawerId = action.payload;
  },
  setReloadRedux: (state, action) => {
    state.reloadRedux = action.payload;
  },
});
