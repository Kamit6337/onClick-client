/* eslint-disable react-refresh/only-export-components */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rooms: [],
  chats: [],
  activeRoom: null,
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
      state.activeRoom = null;
      return state;
    },

    updateRooms: (state, { payload }) => {
      const { room } = payload;

      state.rooms = state.rooms.map((obj) => {
        if (obj._id === room) {
          obj.chats.push(payload);
        }
        return obj;
      });
      return state; // Return the updated state
    },
    deleteChat: (state, { payload }) => {
      const chatId = payload;

      state.rooms = state.rooms.map((room) => {
        if (room._id === state.activeRoom) {
          room.chats = room.chats.filter((chat) => chat._id !== chatId);
        }

        return room;
      });

      return state;
    },
    resetActiveRoom: (state) => {
      state.activeRoom = null;
      return state;
    },
    setActiveRoom: (state, { payload }) => {
      state.activeRoom = payload;

      return state;
    },
  },
});

export const {
  initialRoomsAndChats,
  addNewRoom,
  addNewChat,
  deleteRoomWithItsChats,
  updateRooms,
  deleteChat,
  resetActiveRoom,
  setActiveRoom,
} = InitialDataSlice.actions;

export const InitialDataReducer = InitialDataSlice.reducer;

export const InitialDataState = (state) => state.initialData;
