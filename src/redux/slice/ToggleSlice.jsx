/* eslint-disable react-refresh/only-export-components */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  singleChatForm: {
    bool: false,
  },
  groupChatForm: {
    bool: false,
  },
  sideNavbar: false,
  updateGroupChat: false,
  showChatOptions: {
    bool: false,
    data: null,
  },
};

const ToggleSlice = createSlice({
  name: "ToggleSlice",
  initialState,
  reducers: {
    toggleSingleChatForm: (state, { payload }) => {
      const { bool } = payload;
      state.singleChatForm.bool = bool;
      return state;
    },
    toggleGroupChatForm: (state, { payload }) => {
      const { bool } = payload;
      state.groupChatForm.bool = bool;
      return state;
    },
    toggleUpdateGroupChatForm: (state, { payload }) => {
      return { ...state, updateGroupChat: payload };
    },
    toggleChatOptionOnRightClick: (state, { payload }) => {
      const { bool, data } = payload;

      return { ...state, showChatOptions: { data, bool } };
    },
    toggleSideNavbar: (state, { payload }) => {
      state.sideNavbar = payload;
      return state;
    },
  },
});

export const {
  toggleSingleChatForm,
  toggleGroupChatForm,
  toggleUpdateGroupChatForm,
  toggleChatOptionOnRightClick,
  toggleSideNavbar,
} = ToggleSlice.actions;

export const ToggleReducer = ToggleSlice.reducer;

export const toggleInitialState = (state) => state.toggle;
