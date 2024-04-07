/* eslint-disable react-refresh/only-export-components */
import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    userRooms : []
}


const UserRoomSlice = createSlice({
    name : "UserRoomSlice",
    initialState,
    reducers : {
fillUserRooms : (state, {payload}) => {

const {data} = payload

state.userRooms = data

return state

}


    }
})

export const {fillUserRooms} = UserRoomSlice.actions

export const UserRoomReducer = UserRoomSlice.reducer

export const UserRoomState = state => state.userRooms

