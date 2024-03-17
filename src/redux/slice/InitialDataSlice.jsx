/* eslint-disable react-refresh/only-export-components */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rooms: [],
  chats: [],
};

const InitialDataSlice = createSlice({
  name: "InitialDataSlice",
  initialState,
  reducers: {
    initialRoomsAndChats: (state, { payload }) => {
      const { rooms, chats } = payload;

      state.rooms = rooms;
      state.chats = chats;
      return state;
    },
  },
});

export const { initialRoomsAndChats } = InitialDataSlice.actions;

export const InitialDataReducer = InitialDataSlice.reducer;

export const InitialDataState = (state) => state.initialData;
