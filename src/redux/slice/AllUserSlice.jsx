/* eslint-disable react-refresh/only-export-components */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allUsers: [],
};

const AllUserSlice = createSlice({
  name: "AllUserSlice",
  initialState,
  reducers: {
    fillAllUsers: (state, { payload }) => {
      const { data } = payload;

      state.allUsers = data;
      return state;
    },
  },
});

export const { fillAllUsers } = AllUserSlice.actions;

export const AllUserReducer = AllUserSlice.reducer;

export const AllUserState = (state) => state.allUsers;
