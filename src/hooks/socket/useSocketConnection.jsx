import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import environment from "../../utils/environment";
import { useDispatch, useSelector } from "react-redux";
import {
  InitialDataState,
  addNewChat,
  addNewRoom,
} from "../../redux/slice/InitialDataSlice";

const useSocketConnection = () => {
  const dispatch = useDispatch();
  const [socket, setSocket] = useState(null);
  const { rooms } = useSelector(InitialDataState);

  useEffect(() => {
    const newSocket = io(environment.SERVER_URL, {
      withCredentials: true,
    });

    setSocket(newSocket);
  }, []);

  useEffect(() => {
    if (!rooms || rooms.length === 0 || !socket) return;

    const roomsId = rooms.map((room) => room._id);

    socket.emit("rooms", { rooms: roomsId }, (res) => {
      console.log("res", res);
    });
  }, [socket, rooms]);

  useEffect(() => {
    if (!socket) return;

    const handleChatMessage = (data) => {
      console.log("data received from server", data);
      dispatch(addNewChat(data));
    };

    const handleSingleRoom = (data) => {
      const { room, chat } = data;
      console.log("single room", data);
      dispatch(addNewRoom({ room, chat }));
    };

    socket.on("chatMessage", handleChatMessage);
    socket.on("singleRoom", handleSingleRoom);

    () => {
      socket?.off("chatMessage", handleChatMessage);
      socket?.off("singleRoom", handleSingleRoom);
    };
  }, [socket, dispatch]);

  return {
    socket,
    emit: (event, data, callback) => {
      // Wrapper function to emit events
      if (socket) {
        socket.emit(event, data, callback);
      }
    },
    on: (event, callback) => {
      // Wrapper function to listen for events
      if (socket) {
        socket.on(event, callback);
      }
    },
    off: (event, callback) => {
      // Wrapper function to remove event listeners
      if (socket) {
        socket.off(event, callback);
      }
    },
  };
};

export default useSocketConnection;
