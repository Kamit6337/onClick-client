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
    addNewRoom: (state, { payload }) => {
      const { room, chat } = payload;

      state.rooms = [room, ...state.rooms];
      state.chats = [...chat, ...state.chats];
      return state;
    },
    addNewChat: (state, { payload }) => {
      state.chats = [...state.chats, payload];

      return state;
    },
    deleteRoomWithItsChats: (state, { payload }) => {
      const roomId = payload;

      state.rooms = state.rooms.filter((room) => room._id !== roomId);
      state.chats = state.chats.filter((chat) => chat.room !== roomId);
      return state;
    },
  },
});

export const {
  initialRoomsAndChats,
  addNewRoom,
  addNewChat,
  deleteRoomWithItsChats,
} = InitialDataSlice.actions;

export const InitialDataReducer = InitialDataSlice.reducer;

export const InitialDataState = (state) => state.initialData;
