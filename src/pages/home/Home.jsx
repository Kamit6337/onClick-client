import SidebarMenu from "./components/SidebarMenu/SidebarMenu";
import ChatRoom from "./components/ChatRoom/ChatRoom";
import { useSelector } from "react-redux";
import { toggleInitialState } from "../../redux/slice/toggleSlice";
import GroupChatForm from "./components/SidebarMenu/components/GroupChatForm";
import SearchUsers from "../../components/SearchUsers";
import UpdateGroupChatForm from "./components/ChatRoom/components/UpdateGroupChatForm";
import RightClickMenu from "./components/ChatRoom/components/RightClickMenu";
import DeleteChat from "../../hooks/mutation/DeleteChat";
import { InitialDataState } from "../../redux/slice/InitialDataSlice";
import { useEffect, useMemo, useState } from "react";
import Toastify from "../../lib/Toastify";
import { useLocation } from "react-router-dom";

const Home = () => {
  const { rooms } = useSelector(InitialDataState);
  const [filterRooms, setFilterRooms] = useState([]);
  const [activeRoom, setActiveRoom] = useState(null);

  const { groupChatForm, updateGroupChat, showChatOptions } =
    useSelector(toggleInitialState);

  const searchValue = (value) => {
    if (!value) {
      setFilterRooms([]);
      return;
    }
    const findGroupChat = rooms.filter((room) =>
      room.name?.toLowerCase().includes(value.toLowerCase())
    );

    const findChats = rooms.filter(
      (room) =>
        !room.isGroupChat &&
        room.members.find((member) =>
          member.name.toLowerCase().includes(value.toLowerCase())
        )
    );
    const combine = [...findGroupChat, ...findChats];
    setFilterRooms(combine);
  };

  const activeRoomSelected = (room) => {
    setActiveRoom(room);
  };

  return (
    <>
      <article className="w-full h-full flex">
        <section className="w-72 h-full border-r border-color_2 flex flex-col ">
          <header className="w-full h-14 border-b border-color_2">
            <SearchUsers searchValue={searchValue} />
          </header>
          {/* MARK: SIDEBAR MENU */}
          <div className="w-full flex-1">
            <SidebarMenu
              rooms={filterRooms.length > 0 ? filterRooms : rooms}
              activeRoomSelected={activeRoomSelected}
              activeRoom={activeRoom}
            />
          </div>
        </section>

        {/* MARK: CHAT MESSAGES */}
        <main className="flex-1 h-full">
          <ChatRoom activeRoom={activeRoom} />
        </main>
      </article>
      {groupChatForm && <GroupChatForm />}
      {updateGroupChat && <UpdateGroupChatForm update={true} />}
      {showChatOptions.bool && <RightClickMenu data={showChatOptions.data} />}
      {/* <HandleSocket /> */}
      <DeleteChat />
    </>
  );
};

export default Home;
