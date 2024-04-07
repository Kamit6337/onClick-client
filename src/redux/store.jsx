import { configureStore } from "@reduxjs/toolkit";
import { ToggleReducer } from "./slice/toggleSlice";
import { InitialDataReducer } from "./slice/InitialDataSlice";
import { AllUserReducer } from "./slice/AllUserSlice";
import { UserRoomReducer } from "./slice/UserRoomSlice";

export const store = configureStore({
  reducer: {
    initialData: InitialDataReducer,
    allUsers: AllUserReducer,
    userRooms: UserRoomReducer,
    toggle: ToggleReducer,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: false, // Disable strict mode
  //   }),
});
